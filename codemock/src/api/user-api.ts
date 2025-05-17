import { patch } from "./rest-utils";

const updateUser = async (params: any): Promise<any> => {
  return await patch("/user/profile", params);
};

export default { updateUser };
