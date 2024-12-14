import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { pathImg } from "../../../constant/pathImg";
import { MoviesContext } from "../../context/Store";
export default function CardMovies({ movie }) {
  const { setType } = useContext(MoviesContext);
  return (
    <div
      className="col-md-2 theCard"
      onClick={() => {
        setType("movie");
      }}
    >
      <div className="">
        <Link to={`/details/${movie.id}`}>
          <img src={pathImg(movie.poster_path)} alt="" className="w-100 rounded-4" />
          <h2 className="h6 mt-2">{movie.title}</h2>
        </Link>
      </div>
    </div>
  );
}
