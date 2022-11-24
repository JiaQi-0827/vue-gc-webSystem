<template>
	<div class="home card">
		<el-form :inline="true" :model="state.formInline" class="demo-form-inline">
			<el-form-item label="材料查询">
				<el-input v-model="state.formInline.name" placeholder="请输入材料关键字查询" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmitSearch">查询</el-button>
				<el-button type="primary" @click="handleClickAdd">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="state.tableData" row-key="id" :tree-props="{ children: 'children' }" stripe style="width: 100%">
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
			v-model:current-page="state.formInline.currentPage"
			v-model:page-size="state.formInline.pageSize"
			:page-sizes="[20, 40, 60, 80]"
			layout="sizes, prev, pager, next"
			:total="state.total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>
<script lang="ts" setup name="homeList">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { materilList, materilDels } from "@/api/modules/materilList";
import { meterilRow } from "@/api/interface";
const router = useRouter();
const state = reactive({
	total: 0,
	tableData: [],
	formInline: {
		name: "",
		currentPage: 1,
		pageSize: 10
	}
});

const init = async () => {
	const { rows, total } = await materilList(state.formInline);
	state.tableData = rows;
	state.total = total;
};
init();
const handleClickAdd = () => {
	router.push({
		path: "/home/create",
		query: {
			level: 0
		}
	});
};
const handleOnclickEdit = (row: meterilRow) => {
	router.push({
		path: "/home/create",
		query: { id: row.id, pid: row.pid }
	});
};

const handleOnclickAddChildren = (row: meterilRow) => {
	router.push({
		path: "/home/create",
		query: { pid: row.id }
	});
};
const handleOnclickDel = (row: meterilRow) => {
	ElMessageBox.confirm("确定要删除当前材料吗?", "警告", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	})
		.then(() => {
			materilDels(row.id).then(res => {
				if (Number(res.code) == 200) {
					init();
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
};
const onSubmitSearch = () => {
	init();
};
const handleSizeChange = (value: number) => {
	state.formInline.pageSize = value;
};
const handleCurrentChange = (value: number) => {
	state.formInline.currentPage = value;
};
</script>

<style scoped lang="scss"></style>
