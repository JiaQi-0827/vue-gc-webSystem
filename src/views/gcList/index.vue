<template>
	<div class="home card">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="材料查询">
				<el-input v-model="formInline.search" placeholder="请输入材料关键字查询" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
				<el-button type="primary" @click="handleClickAdd">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" stripe style="width: 100%">
			<el-table-column type="index" label="序号" width="180" />
			<el-table-column prop="name" label="Name" width="180" />
			<el-table-column prop="address" label="Address" />
		</el-table>
	</div>
</template>
<script setup lang="ts" name="homeList">
import { reactive, onMounted } from "vue";
import { materilList } from "@/api/modules/materilList";
const formInline = reactive({
	search: ""
});
const tableData = reactive([]);
onMounted(() => {
	materilList();
});
const onSubmit = () => {};
const handleClickAdd = () => {};
</script>

<style scoped lang="scss"></style>
