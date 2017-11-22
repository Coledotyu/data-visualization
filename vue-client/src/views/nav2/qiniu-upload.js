import 'qiniu-js'
import config from '../../config/'
import QiniuProgress from './qiniu-progress.vue'
import moment from 'moment'

export default {
  components: { QiniuProgress },
  props: {
    text: String,
    isDisabled: Boolean,
    showProgress: {
      type: Boolean,
      default: true,
    },
    fileIcon: String,
    fileType: {type: String, default: 'image'}, // 文件类型 video/audio/image
    height: {
      type: Number,
      default: 120,
    }
  },
  computed: {
    uuid: () => Math.random() * 1e8,
    uploadeDomain () {
      if (this.fileType == 'image') return 'https://pic-gytx.98.cn/'
      return 'https://video-gytx.98.cn/'
    }
  },
  methods: {
    getQiniuBtn() { return this },
  },
  mounted() {

    const {uptokenUrl,  qiniuDir} = config
        console.log('uptokenUrl:', uptokenUrl, qiniuDir)
    const {uuid, uploadeDomain} = this

    Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: 'pickfiles' + uuid,
      container: 'container' + uuid,
      drop_element: 'container' + uuid,
      max_file_size: '1000mb',
      flash_swf_url: 'http://cdn.staticfile.org/plupload/2.2.1/Moxie.swf',
      dragdrop: true,
      chunk_size: '4mb',
      uptoken_url: uptokenUrl,
      domain: uploadeDomain,
      get_new_uptoken: false,
      auto_start: true,
      log_level: 5,
      unique_names: false,
      save_key: false,
      init: {
        'FilesAdded': (up, files) => {
          this.$emit('FilesAdded', {up, files})
          console.log('*************** FilesAdded', up, files)
          plupload.each(files, function(file) {
              // 文件添加进队列后,处理相关的事情
          });
        },
        'BeforeUpload': (up, file) => {
          this.$emit('BeforeUpload', {up, file})
             // 每个文件上传前,处理相关的事情
          console.log('*************** BeforeUpload',up, file);
        },
        'UploadProgress': (up, file) => {
          this.$emit('UploadProgress', {up, file})
             // 每个文件上传时,处理相关的事情
             console.log('*************** UploadProgress', file.percent, up,)
        },
        'FileUploaded': async (up, file, info) => {
            let domain = up.getOption('domain');
            let {key} = JSON.parse(info)
            this.$emit('FileUploaded', {url: domain + key, file })
            console.log(domain + key);
             // 每个文件上传成功后,处理相关的事情
             // 其中 info 是文件上传成功后，服务端返回的json，形式如
             // {
             //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
             //    "key": "gogopher.jpg"
             //  }
             // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
        },
        'Error': (up, err, errTip) => {
           this.$emit('Error', {up, err, errTip})
             //上传出错时,处理相关的事情
             up.stop() //修复上次错误后卡在76%
             console.log('*************** Error', up, err, errTip)
            //  this.$message({message: '网络异常，请5秒后重试！', type: 'error'})

        },
        'UploadComplete': () => {
          this.$emit('UploadComplete')
             //队列文件处理完毕后,处理相关的事情
           console.log('*************** UploadComplete')
        },
        'Key': function(up, file) {
            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
            // 该配置必须要在 unique_names: false , save_key: false 时才生效
            let key = qiniuDir + moment().format('YYYYMMDDHHmmss') + file.name
            // // do something with key here
            return key
        }
      }
    })
  }
}
