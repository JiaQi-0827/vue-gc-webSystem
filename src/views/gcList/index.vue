<template>
	<div class="home card">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="材料查询">
				<el-input v-model="formInline.name" placeholder="请输入材料关键字查询" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmitSearch">查询</el-button>
				<el-button type="primary" @click="handleClickAdd">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" row-key="id" :tree-props="{ children: 'children' }" stripe style="width: 100%">
			<el-table-column type="index" label="序号" width="80px" />
			<el-table-column prop="name" label="材料名称" />
			<el-table-column prop="description" label="材料描述" />
			<el-table-column label="操作">
				<template #default="scoped">
					<el-button @click="handleOnclickEdit(scoped.row)">修改</el-button>
					<el-button @click="handleOnclickAddChildren(scoped.row)">+ 子材料</el-button>
					<el-button @click="handleOnclickDel(scoped.row)">删除</el-button>
					<!-- <el-button @click="handleOnclickDetail(scoped.row)">详情</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			v-model:current-page="formInline.currentPage"
			v-model:page-size="formInline.pageSize"
			:page-sizes="[20, 40, 60, 80]"
			layout="sizes, prev, pager, next"
			:total="total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>
<script lang="ts" name="homeList">
import { ElMessage, ElMessageBox } from "element-plus";
import { materilList, materilDels } from "@/api/modules/materilList";
import { meterilRow } from "@/api/interface";
export default {
	data() {
		return {
			total: 0,
			tableData: [],
			formInline: {
				name: "",
				currentPage: 1,
				pageSize: 10
			}
		};
	},
	created() {
		this.init();
	},
	methods: {
		async init() {
			const { rows, total } = await materilList(this.formInline);
			this.tableData = rows;
			this.total = total;
		},
		handleClickAdd() {
			this.$router.push({
				path: "/home/create",
				query: {
					level: 0
				}
			});
		},
		handleOnclickEdit(row: meterilRow) {
			console.log(row.name);
			this.$router.push({
				path: "/home/create",
				query: { id: row.id, pid: row.pid }
			});
		},

		handleOnclickAddChildren(row: meterilRow) {
			this.$router.push({
				path: "/home/create",
				query: { pid: row.id }
			});
		},
		handleOnclickDel(row: meterilRow) {
			ElMessageBox.confirm("确定要删除当前材料吗?", "警告", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					materilDels(row.id).then(res => {
						console.log(res);
						if (Number(res.code) == 200) {
							this.init();
							ElMessage({
								type: "success",
								message: "材料删除成功"
							});
						}
					});
				})
				.catch(() => {
					ElMessage({
						type: "info",
						message: "取消删除材料"
					});
				});
		},
		onSubmitSearch() {
			this.init();
		},
		handleSizeChange(value: number) {
			this.formInline.pageSize = value;
		},
		handleCurrentChange(value: number) {
			this.formInline.currentPage = value;
		}
	}
};
</script>

<style scoped lang="scss"></style>
