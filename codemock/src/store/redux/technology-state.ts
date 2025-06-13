import { SET_ALL_TECHNOLOGY } from "@/store/actions/technology-action";
import { Technology } from "../types/technology.type";

interface TechnologyState {
  technologies: Technology[];
}

const initialState: TechnologyState = {
  technologies: [],
};

export default function technologyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_TECHNOLOGY:
      return { ...state, technologies: action.payload };
    default:
      return state;
  }
}
