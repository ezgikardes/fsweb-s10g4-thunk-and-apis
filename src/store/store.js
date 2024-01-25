import { legacy_createStore as createStore } from "redux";
import { myReducer } from './reducers/reducer';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import logger from "redux-logger";

const store = createStore(myReducer, applyMiddleware(thunk, logger));

export default store;

//"best practice" gereği, thunk'ın ardından logger koydum çünkü geliştirme aşamasında yaşadığım sorunları görmem gerekiyor.