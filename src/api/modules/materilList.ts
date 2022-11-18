import { User } from "@/api/interface/index";
// import { PORT1 } from "@/api/config/servicePort";
// import qs from "qs";
import http from "@/api";

/**
 * @name 材料列表
 */
// * 材料列表接口
export const materilList = () => {
	return http.get<User.ReqGetMaterilList>(`/system/makings/list`);
};
