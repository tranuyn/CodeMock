export const GET_ALL_MAJOR = "GET_ALL_MAJOR";
export const SET_ALL_MAJOR = "SET_ALL_MAJOR";

export const getAllMajor = () => ({ type: GET_ALL_MAJOR });
export const setAllMajor = (data: any) => ({ type: SET_ALL_MAJOR, payload: data });
