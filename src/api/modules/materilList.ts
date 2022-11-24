import { ReqGetMaterilList, meterCreate, meterDetails } from "@/api/interface/index";
// import { PORT1 } from "@/api/config/servicePort";
// import qs from "qs";
import http from "@/api";

/**
 * @name 材料列表
 */
// * 材料列表接口
export const materilList = (params: object | undefined) => {
	return http.get<ReqGetMaterilList>(`/system/makings/tree`, params);
};
/**
 * @name 材料列表新建
 */
// * 材料列表新建接口
export const materilCreate = (data: object | undefined) => {
	return http.post<meterCreate>(`/system/makings`, data);
};
/**
 * @name 材料列表 详情
 */
// * 材料列表 详情
export const materilDetails = (data: string | any) => {
	return http.get<meterDetails>(`/system/makings/${data}`);
};
/**
 * @name 材料列表修改
 */
// * 材料列表 修改
export const materilUpdate = (data: object | undefined) => {
	return http.put<meterCreate>(`/system/makings`, data);
};
/**
 * @name 材料列表删除
 */
// * 材料列表 删除
export const materilDels = (data: string | undefined) => {
	return http.delete<meterCreate>(`/system/makings/${data}`);
};
