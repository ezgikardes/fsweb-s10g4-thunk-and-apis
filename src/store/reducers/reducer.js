import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  FAV_RESET,
} from "../actions/actions";

const initial = {
  favs: [],
  current: null, //axios ile çektiğimiz datayı buradaki current field'ı içerisine yazıyoruz. 
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
      let newState2 = {...state, favs: state.favs.filter(i => i.message !== action.payload)};
      writeFavsToLocalStorage(newState2);
      return newState2; //favs field'ının içindeki datayı filtreleyip, bu yeni state'i localStorage'a kaydedip yeni bir state olarak döndürdük.Bunu yapmasaydık, sildiğimiz data localStorage'da görünmeye devam edecekti.

    case FETCH_SUCCESS:
      return {...state, loading: false, current: action.payload, error: null };
      //fetch success olduğunda soading false olacak, current da action.payload'dan gönderdiğimiz data olacak. 
    case FETCH_LOADING:
      return {...state, loading: true };

    case FETCH_ERROR:
      return {...state, loading: false, current: null, error: action.payload };

    case GET_FAVS_FROM_LS:
      return {...state, favs: readFavsFromLocalStorage() || []}; //eğer readFavsFromLocalStore() bir data döndürürse onu kullan, döndürmezse boş array kullan. Bunu yapmadığımızda, localStorage'da herhangi bir favorimiz olmadığı durumda hata verir.

      case FAV_RESET:
      let newState3 = {...state, favs: []};
      writeFavsToLocalStorage(newState3);
      return newState3; 

    default:
      return state;
  }
}
