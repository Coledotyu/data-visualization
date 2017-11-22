<template>
	<div>
		<iframe width="100%" height="100%" class="iframe" :src="src">	</iframe>
		<el-button @click="handleUpdate()" class="left" type="success">重新生成</el-button>
  	<el-button @click="handleSpide()" class="right" type="success">重新爬虫</el-button>
	</div>
</template>
<script>
	import { post } from '../../api/request'
	import config from '../../config'
	let wcDomain = config.baseUrl

	export default {
		data() {
			return {
				src: this.resetSrc()
			}
		},
		watch: {
			$route (to, from) {
				this.src = this.resetSrc()
			}
		},
		methods: {
			wcName () {
				return this.$route.path.split('/')[2]
			},
			resetSrc () {
				let wcName = this.wcName().toLowerCase()
				return `${wcDomain}${wcName}_wordcloud.html`
			},
			async handleUpdate () {
				try {
					let obj = await post(`${wcDomain}update/:type/wordcloud`.replace(/:type/g, this.wcName()))
					if (!obj.code) {
						this.success()
					}
					else {
						debugger
						this.error(obj.message)
					}
				} catch (e) {
					this.error(e)
				}
			},
			async handleSpide () {
				try {
					let obj = await post(`${wcDomain}update/:type/wordfile`.replace(/:type/g, this.wcName()))
					if (!obj.code) {
						this.success()
					}
					else {
						this.error(obj.message)
					}
				} catch (e) {
					this.error(e)
				}
			},
			success () {
				this.$message({
					message: '刷新成功',
					type: 'success'
				})
			},
			error (e) {
				this.$message({
					message: `请求出现问题:${e}`,
					type: 'error'
				})
			},
		},
		mounted() {
			
		}
	}

</script>

<style scoped>
.iframe {
	width:100%;
	height:800px;
	border:0;
}
.left {
  float:left;
}
.right {
  float:right;
}
</style>