import * as types from './types';

export const savePolygon = data => {
  return {
    type: types.SAVE_POLYGON,
    payload: data,
  };
};
