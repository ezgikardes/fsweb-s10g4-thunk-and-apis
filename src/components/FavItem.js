import React from "react";
import { useDispatch } from "react-redux";
import { removeFav } from "../store/actions/actions";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function FavItem({ imgURL }) {
  const dispatch = useDispatch();

  const handleRemoveFav = () => {
    dispatch(removeFav(imgURL.message));
    toast("Favorilerden çıkarıldı")
  }; //buraya imgURL.message dememizin sebebi, api objesinde image linkinin "message" field'ında olması.

  return (
    <div className="bg-white shadow hover:shadow-lg p-3 pl-5 flex items-center group transition-all">
      <div className="flex-1 pr-4">
        <img //buradaki div yerine bir img tag'i koyduk, prop'tan gelen imgURL'i src attribute'una atadık.
          src={imgURL.message}></img>
      </div>
      <button
        onClick={handleRemoveFav}
        className="transition-all px-3 py-2 block text-sm rounded bg-rose-700 text-white opacity-30 group-hover:opacity-100">
        Çıkar
      </button>
    </div>
  );
}

export default FavItem;
