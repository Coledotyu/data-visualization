<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.word" placeholder="关键词"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getWordList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
""
		<!--列表-->
		<el-table :data="wordlist" highlight-current-row v-loading="listLoading" @header-click="sortQuery" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
      <el-table-column prop="word" label="关键词" sortable>
		  	<template scope="scope">
				  <a :href="localUrl+'/#/keyword/list?keyword='+scope.row.word">
					  <p>{{ scope.row.word }}</p>
					</a>
      	</template>	
      </el-table-column>
			<el-table-column prop="xqCount" label="雪球词频" sortable>
			</el-table-column>
			<el-table-column prop="gbCount" label="股吧词频" sortable>
			</el-table-column>
			<el-table-column prop="totalCount" label="总词频" sortable>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

	</section>

</template>

<script>
	import util from '../../common/js/util'
	import { getWordFreqList } from '../../api/api'
  import config from '../../config'
  console.log(config)
	export default {
		data() {
			return {
				sortKey: 'totalCount',
				filters: {
					word: ''
				},
				wordlist: [],
				total: 600,
				page: 1,
				localUrl: config.localUrl,
				listLoading: false,
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入过滤词', trigger: 'blur' }
					]
				},
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getWordList();
			},
			//获取过滤词列表
			getWordList(sort=this.sortKey) {
				let para = {
					page: this.page,
					name: this.filters.name,
          sort: sort
				};
				this.listLoading = true;
				getWordFreqList(para).then((res) => {
          this.total = 600;
					this.wordlist = res.data.data;
					this.listLoading = false;
				});
			},
			selsChange: function(sels) {
        this.sels = sels 
      },
      sortQuery: function(column, event) {
      	this.sortKey = column.property;
        this.getWordList();
      }

		},
		mounted() {
			this.getWordList();
		}
	}
</script>
<style scoped>
</style>
