import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { pathImg } from "../../../constant/pathImg";
import { MoviesContext } from "../../context/Store";

export default function CardTv({ tv }) {
  const { setType } = useContext(MoviesContext);
  return (
    <div
      className="col-md-2 theCard"
      onClick={() => {
        setType("tv");
      }}
    >
      <div className="">
        <Link to={`/details/${tv.id}`}>
          <img src={pathImg(tv.poster_path)} alt="" className="w-100 rounded-4" />
          <h2 className="h6 mt-2">{tv.name}</h2>
        </Link>
      </div>
    </div>
  );
}
