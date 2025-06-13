import { Level } from "@/api/level/level.type";
import { SET_ALL_LEVEL } from "@/store/actions/level-action";

interface LevelState {
  levels: Level[];
}

const initialState: LevelState = {
  levels: [],
};

export default function levelReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_LEVEL:
      return {
        ...state,
        levels: action.payload,
      };
    default:
      return state;
  }
}
