<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.word" placeholder="评论关键词"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getWordList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="wordlist" highlight-current-row v-loading="listLoading" @header-click="sortQuery" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column type="index" width=60>
			</el-table-column>
      <el-table-column prop="_type" label="来源网站" sortable>
			</el-table-column>
			<el-table-column label="文章URL" sortable>
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <a v-bind:href="scope.row._source.fromArticleUrl" target="_blank">
            <p>{{ scope.row._source.fromArticleUrl }}</p>
          </a>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row._source.fromArticleUrl }}</el-tag>
          </div>
        </el-popover>
      </template>
      </el-table-column>
			<el-table-column prop="_source.user_name" label="文章作者" sortable>
      </el-table-column>
      <el-table-column prop="_source.view_count" label="文章浏览量" sortable>
      </el-table-column>
      <el-table-column prop="_source.topic_title" label="文章标题" sortable>
				<template scope="scope">
        	<el-popover trigger="hover" placement="top">
          	<p>{{ scope.row._source.topic_title }}</p>
          	<div slot="reference" class="name-wrapper">
            	<el-tag>{{ scope.row._source.topic_title }}</el-tag>
          	</div>
        	</el-popover>
      	</template>
			</el-table-column>
			<el-table-column prop="_source.commentUrl" label="评论URL" sortable>
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
            <a v-bind:href="scope.row._source.commentUrl" target="_blank">
              <p>{{ scope.row._source.commentUrl }}</p>
            </a>
            <div slot="reference" class="name-wrapper">
            	<el-tag>{{ scope.row._source.commentUrl }}</el-tag>
          	</div>
        	</el-popover>
      	</template>
			</el-table-column>
      <el-table-column prop="_source.comments" label="分页评论内容" sortable>
				<template scope="scope">
					<el-popover trigger="hover" placement="top">
						<p>{{ scope.row._source.comments }}</p>
						<div slot="reference" class="name-wrapper">
							<el-tag>{{ scope.row._source.comments }}</el-tag>
						</div>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column prop="_source.comment_count" label="评论数量" sortable>
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
	import { getKeywordList } from '../../api/api';

	export default {
		data() {
			return {
				sortKey: 'view_count',
				filters: {
					word: this.getKeyWord()
				},
				wordlist: [],
				total: 600,
				page: 1,
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
		  getKeyWord() {
		  	return this.$route.query.keyword || ''
		  },
			handleCurrentChange(val) {
				this.page = val;
				this.getWordList();
			},
			//获取过滤词列表
			getWordList(sort=this.sortKey) {
				let para = {
					page: this.page,
					keyword: this.filters.word,
					sort: this.sortKey
				};
				this.listLoading = true;
				getKeywordList(para).then((res) => {
          this.total = 600;
					this.wordlist = res.data.data.map((item) => {
						item._source.comments = JSON.stringify(item._source.comments)
						return item
					});
					this.listLoading = false;
				});
			},
			selsChange: function(sels) {
        this.sels = sels 
      },
      sortQuery: function(column, event) {
      	this.sortKey = column.property === "_source.view_count" ? "view_count" : "comment_count";
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
