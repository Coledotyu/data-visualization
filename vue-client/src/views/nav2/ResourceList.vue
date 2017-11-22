<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.word" placeholder="关键词搜索"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="list" highlight-current-row v-loading="listLoading" @header-click="sortQuery" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column type="index" width=60>
			</el-table-column>
      <el-table-column prop="fileType" label="文件类型" sortable>
			</el-table-column>
			<el-table-column prop="name" label="文件名" sortable>
			</el-table-column>
			<el-table-column prop="size" label="文件大小" sortable>
			</el-table-column>
			<el-table-column prop="_id" label="文件ID" sortable>
			</el-table-column>
      <el-table-column label="外链地址" sortable>
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <a v-bind:href="scope.row.url" target="_blank">
            <p>{{ scope.row.url }}</p>
          </a>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.url }}</el-tag>
          </div>
        </el-popover>
      </template>
      </el-table-column>
			<el-table-column prop="createdAt" label="创建时间" sortable>
      </el-table-column>
      <el-table-column prop="updatedAt" label="修改时间" sortable>
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
	import { getResourceList } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					word: this.getKeyWord()
				},
				list: [],
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
				this.getList();
			},
			getList(sort=this.sortKey) {
				let para = {
					page: this.page,
					keyword: this.filters.word,
					sort: sort
				};
				this.listLoading = true;
				getResourceList(para).then((res) => {
          this.total = 600;
					this.list = res.data.data;
					this.listLoading = false;
				});
			},
			selsChange: function(sels) {
        this.sels = sels 
      },
      sortQuery: function(column, event) {
      	this.sortKey = column.property === "createdAt" ? "createdAt" : "updatedAt";
        this.getList();
      }
		},
		mounted() {
			this.getList();
		}
	}
</script>
<style scoped>
</style>
