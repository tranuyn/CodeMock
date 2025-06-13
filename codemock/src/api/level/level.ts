import { get, post, patch, del } from "@/api/rest-utils";
import { Level } from "./level.type";

// Tạo level
export const createLevel = async (payload: Partial<Level>) => {
  return await post("/level/create", payload);
};

// Lấy tất cả level
export const getAllLevels = async (): Promise<Level[]> => {
  return await get("/level");
};

// Lấy level theo ID
export const getLevelById = async (id: string): Promise<Level> => {
  return await get(`/level/${id}`);
};

// Query nâng cao với filter (áp dụng cho phân trang, search, filter, sort)
// export const queryLevels = async (params: string): Promise<Level[]> => {
//   return await get("/level/query", params);
// };

// Cập nhật level
export const updateLevel = async (
  id: string,
  payload: Partial<Level>
): Promise<Level> => {
  return await patch(`/level/${id}`, payload);
};

// Xoá level
export const deleteLevel = async (id: string) => {
  return await del(`/level/${id}`);
};
