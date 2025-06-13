export const GET_ALL_TECHNOLOGY = "GET_ALL_TECHNOLOGY";
export const SET_ALL_TECHNOLOGY = "SET_ALL_TECHNOLOGY";

export const getAllTechnology = (callback?: (data: any) => void) => ({
  type: GET_ALL_TECHNOLOGY,
  callback,
});

export const setAllTechnology = (data: any) => ({
  type: SET_ALL_TECHNOLOGY,
  payload: data,
});
