// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	token: string;
	data: T;
	rows: any;
	total: number;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 登录模块
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResponseLogin {
		data: {
			token: string;
		};
		token: string;
	}
	export interface ResAuthButtons {
		[key: string]: {
			[key: string]: boolean;
		};
	}
}

// * 用户管理模块
export namespace User {
	export interface ReqGetUserParams extends ReqPage {
		username: string;
		gender: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string[];
		status: number;
	}
}
export interface ReqGetMaterilList {
	code: number;
	rows: any;
	total: Number;
}

// * 文件上传模块
export namespace Upload {
	export interface ResFileUrl {
		fileUrl: string;
	}
}

export interface meterilRow {
	createBy: null;
	createTime: null;
	updateBy: null;
	updateTime: null;
	remark: null;
	id: string;
	name: String;
	pid: string;
	description: String;
}
export interface meterCreate {
	msg: String;
	code: number;
}
