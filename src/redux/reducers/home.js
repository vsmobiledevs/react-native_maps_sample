import * as types from '../actions/types';

const initialState = {
  polygons: [],
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_POLYGON:
      return {
        ...state,
        polygons: [...state.polygons, [action.payload]],
      };
    default:
      return state;
  }
};
