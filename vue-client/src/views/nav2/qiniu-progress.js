
export default {
  data: () => ({
    url: null,
    percent: null,
  }),
  props: {
    height: Number,    // 进度条宽度
    qiniuBtn: Function, // 返回 qiniu-btn 对象
    fileUrl: String,  //  默认文件链接
    fileType: {type: String, default: 'video'} // 文件类型 video/audio/image
  },
  mounted () {
    this.qiniuBtn ()
      .$on('FileUploaded', event => { this.url = event.url })
      .$on('BeforeUpload', event => { this.percent = event.file.percent })
      .$on('UploadProgress', event => { this.percent = event.file.percent })
      .$on('UploadComplete', () => { setTimeout(() => this.percent = null, 1500) })
  },
}
