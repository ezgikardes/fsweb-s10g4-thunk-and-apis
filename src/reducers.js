import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      let newState = {...state,  favs: [...state.favs, action.payload]};
      writeFavsToLocalStorage(newState);
      return newState;

    case FAV_REMOVE:
      return {...state, favs: state.favs.filter(i => i.message !== action.payload)};

    case FETCH_SUCCESS:
      return {...state, loading: false, current: action.payload, error: null };

    case FETCH_LOADING:
      return state;

    case FETCH_ERROR:
      return state;

    case GET_FAVS_FROM_LS:
      return {...state, favs: readFavsFromLocalStorage || []};

    default:
      return state;
  }
}
