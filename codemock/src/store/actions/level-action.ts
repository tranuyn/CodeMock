export const GET_ALL_LEVEL = "GET_ALL_LEVEL";
export const SET_ALL_LEVEL = "SET_ALL_LEVEL";

export const getAllLevel = () => ({ type: GET_ALL_LEVEL });
export const setAllLevel = (data: any) => ({ type: SET_ALL_LEVEL, payload: data });
