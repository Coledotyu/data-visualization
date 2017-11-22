<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-right: 0px;" >
			<el-form :inline="true">
      	<el-form-item >
        	<qiniu-upload @FileUploaded="uploadArticleImg($event.url, $event)" :fileIcon="articleImg" fileType="video"  text="点击上传"></qiniu-upload>
      	</el-form-item>
			</el-form>
		</el-col>

	</section>

</template>

<script>
	import util from '../../common/js/util'
	import qiniuUpload from './qiniu-upload.vue'
	import { createResource } from '../../api/api'
	
	export default {
		data: () => ({
			url: null,
			percent: null,
			articleImg: ''
		}),
		components: { qiniuUpload },
		methods: {
			selsChange: function(sels) {
        this.sels = sels 
      },
			uploadArticleImg: async function(url, event) {
				let para = {
					url: url,
          fileType: event.file.type,
          name: event.file.name,
          size: event.file.size
				}
        createResource(para).then((res) => {
					this.$message({
						message: "上传成功",
						type: 'success'
					})
        })
			}
		},
 
	}
</script>
<style scoped>
</style>
