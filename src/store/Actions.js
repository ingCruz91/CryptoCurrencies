import {actionTypes} from './ActionTypes';

export const actions = {
  addAsset: asset => ({type: actionTypes.ADD_ASSET, data: asset}),
  updateAsset: asset => ({type: actionTypes.UPDATE_ASSET, data: asset}),
};
