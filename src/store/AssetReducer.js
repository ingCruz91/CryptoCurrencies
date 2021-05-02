import _ from 'lodash';
import {actionTypes} from './ActionTypes';

const initialState = {
  listOfAssets: [],
};

const assetReducer = (state = initialState, action) => {
    console.log(action)
  switch (action.type) {
    case actionTypes.ADD_ASSET:
      return {
        ...state.listOfAssets,
        listOfAssets: state.listOfAssets.concat({
          id: action.data.id,
          key: action.data.key,
          value: action.data.value,
          diff: action.data.diff,
          status: action.data.status,
        }),
      };

    case actionTypes.UPDATE_ASSET:
      const index = _.findIndex(state.listOfAssets, {key: action.data.key});
      const assets = [...state.listOfAssets];
      const asset = {...assets[index]};
      console.log({ asset })
      asset.diff = 10;
      asset.value = action.data.value;
      asset.status = 'UP';
      assets[index] = asset;
      return {
        ...state.listOfAssets,
        listOfAssets: assets,
      };

    default:
      return {
        ...state,
      };
  }
};
export default assetReducer;
