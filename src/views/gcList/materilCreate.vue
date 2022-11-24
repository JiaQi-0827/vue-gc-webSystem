<template>
	<div class="home card">
		<el-form
			ref="ruleFormRef"
			:model="materilFormState.materilForm"
			:rules="rules"
			label-width="120px"
			class="demo-ruleForm"
			status-icon
		>
			<el-form-item label="材料名称" prop="name">
				<el-input v-model="materilFormState.materilForm.name" />
			</el-form-item>

			<el-form-item label="材料描述" prop="description">
				<el-input v-model="materilFormState.materilForm.description" type="textarea" />
			</el-form-item>
			<el-form-item label="创建时间" required>
				<el-form-item prop="date">
					<el-date-picker
						v-model="materilFormState.materilForm.createTime"
						type="datetime"
						format="YYYY-MM-DD HH:mm:ss"
						value-format="YYYY-MM-DD HH:mm:ss"
						label="请选择时间"
						placeholder="请选择时间"
						style="width: 100%"
					/>
				</el-form-item>
			</el-form-item>

			<el-form-item>
				<el-button @click="resetForm(ruleFormRef)">重置</el-button>
				<el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script setup lang="ts" name="materilCreate">
import { materilCreate, materilDetails } from "@/api/modules/materilList";
import type { FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const ruleFormRef = ref<FormInstance>();
const rules = {
	name: [{ required: true, message: "请输入材料名称", trigger: "blur" }],
	description: { required: true, message: "请输入材料描述", trigger: "blur" },
	createTime: { type: "date", required: true, message: "请选择创建时间", trigger: "change" }
};
const detailsApi = async () => {
	const id = route.query.id ? route.query.id : undefined;
	if (id) {
		const { data } = await materilDetails(id);
		materilFormState.materilForm = data as any;
	}
};
detailsApi();
let materilFormState = reactive({
	materilForm: {
		name: "",
		createTime: "",
		description: "",
		pid: route.query.pid ? route.query.pid : "0"
	}
});

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid, fields) => {
		if (valid) {
			const { code } = await materilCreate(materilFormState.materilForm);
			if (Number(code) == 200) {
				materilFormState.materilForm = {
					name: "",
					createTime: "",
					description: "",
					pid: ""
				};
			}
		} else {
			console.log("error submit!", fields);
		}
	});
};
const resetForm = (formEl: FormInstance | undefined) => {
	console.log(formEl);
};
</script>
