<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.word" placeholder="过滤词"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="searchWord">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="filterwords" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
      <el-table-column prop="word" label="过滤词" width="100" sortable>
			</el-table-column>
			<el-table-column prop="_id" label="ID" width="220" sortable>
			</el-table-column>
			<el-table-column prop="createdAt" label="创建时间" width="220" sortable>
			</el-table-column>
			<el-table-column prop="updatedAt" label="更新时间" width="220" sortable>
			</el-table-column>
			<el-table-column prop="__v" label="版本号" min-width="50" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="过滤词" prop="words">
					<el-input v-model="addForm.words" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getWordListPage, removefilterWord, createfilterWord, searchFilterWord } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					word: ''
				},
				filterwords: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入过滤词', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					_id: 0,
					word: '',
					createAt: '',
					updateAt: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入过滤词', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					words: '',
				}
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getWordList();
			},
			//获取过滤词列表
			getWordList() {
				let para = {
					page: this.page,
					word: this.filters.word
				};
				this.listLoading = true;
				getWordListPage(para).then((res) => {
          this.total = 100;
					this.filterwords = res.data.data;
					this.listLoading = false;
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { _id: row._id };
					removefilterWord(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getWordList();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					words: '',
				};
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							createfilterWord(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getWordList();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
      searchWord: function () {
        const para = {
          word: this.filters.word
        }
        searchFilterWord(para).then((res) => {
          this.filterwords = res.data.data;
					this.listLoading = false;
        })
      },
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getWordList();
		}
	}

</script>

<style scoped>

</style>
