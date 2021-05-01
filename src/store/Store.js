import {createStore, combineReducers} from 'redux';
import assetReducer from './AssetReducer';

const rootReducer = combineReducers({
  assetReducer,
});

const configureStore = () => createStore(rootReducer);
export default configureStore;
