import React, { useEffect } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useDispatch, useSelector } from "react-redux"; 
import { ToastContainer, toast } from 'react-toastify';
import { fetchAnother, addFav, getFavsFromLocalStorage, favReset } from "./store/actions/actions";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const loading = false;
  const current = useSelector(store => store.current);
  const favs = useSelector(store => store.favs);
  const dispatch = useDispatch();


   //fetchAnother'ı, bütün uygulamanın didMount'unda (uygulama ilk yüklendiğinde) tetiklememiz lazım. Bunu useEffect'le yapacağız. Favori
  useEffect(() => {
    dispatch(fetchAnother())
    console.log("veri çekildi")
    dispatch(getFavsFromLocalStorage()); //uygulama başladığında local storage'daki favorileri çekmek için bunu da dispatch'le tetiklememiz gerek.
    console.log("favoriler çekildi")
    }, [])

  function addHandler() {
    dispatch(addFav(current));
    console.log("favorilere eklendi")
    toast("Favorilere eklendi!")
  }

  function resetHandler() {
    dispatch(favReset());
    toast("Favoriler sıfırlandı!")
  }


  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>}
          {current && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            <button 
              onClick={() => dispatch(fetchAnother())} //asenkron bir işlemi (fetchAnother) doğrudan bir olay dinleyicisine bağlamak genellikle işe yaramaz. dolayısıyla fetchAnother'ı doğrudan çağırmak yerine, onu bir işlev içine aldık.
              className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500"
            >
              Başka bir tane
            </button>
            <button
              onClick={addHandler}
              disabled={!current || favs.find((f) => f == current )} // eğer current yoksa, butonun aktif olmasını engelleme, disabled yap.
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorilere ekle
            </button>
            <button
              onClick={resetHandler}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorileri sıfırla
            </button>
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0
              ? favs.map((item, index) => (
                <FavItem key={index} id={item} imgURL={item} />
              )) //burada item.key, item.id ve item.activity vardı. bizim böyle değerlerimiz olmadığı için böyle bir düzenleme yaptık.
              : <div className="bg-white p-6 text-center shadow-md">Henüz bir favoriniz yok.</div> //favorilerimiz boşsa, bu yazıyı göster.
            }
          </div>
        </Route>
      </Switch>
      <ToastContainer position="bottom-right"/> {/*ekrandaki toast mesajlarını gösteren şey bu ToastContainer. O yüzden en dışa konması lazım.*/}
    </div>
  );
}
