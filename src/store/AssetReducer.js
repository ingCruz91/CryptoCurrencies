import _ from 'lodash';
import {actionTypes} from './ActionTypes';

const initialState = {
  listOfAssets: [
    {id: 1, key: 'bitcoin', value: '57374.19', diff: 0, status: 'UP'},
    {id: 2, key: 'monero', value: '420.34', diff: 0, status: 'DOWN'},
  ],
};

const assetReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_ASSET:
      return {
        ...state.listOfAssets,
        listOfAssets: state.listOfAssets.concat({
          key: action.data.key,
          value: action.data.value,
        }),
      };

    case actionTypes.UPDATE_ASSET:
      const index = _.findIndex(state.listOfAssets, {key: action.data.key});
      const assets = [...state.listOfAssets];
      const asset = {...assets[index]};
      console.log({ asset })
      asset.diff = asset.value;
      asset.value = action.data.value;
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
