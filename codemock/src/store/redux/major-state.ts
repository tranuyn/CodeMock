import { SET_ALL_MAJOR } from "@/store/actions/major-action";
import { Major } from "../types/major.type";

interface MajorState {
  majors: Major[];
}

const initialState: MajorState = {
  majors: [],
};

export default function majorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_MAJOR:
      return { ...state, majors: action.payload };
    default:
      return state;
  }
}
