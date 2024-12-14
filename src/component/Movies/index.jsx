import React, { useContext} from "react";
import CardMovies from "../Home/component/CardMovies";
import "./style.css";
import { MoviesContext } from "../context/Store";
export default function Movies() {
  let { movies, setPages } = useContext(MoviesContext);
  let num = new Array(10).fill(1).map((num, index) => index + 1);
  return (
    <div className="row g-4 my-4 d-flex  justify-content-center">
      {movies.map((movie) => (
        <CardMovies 
        key={movie.id} 
        movie={movie} />
      ))}
      <nav aria-label="Page navigation example">
        <ul className="pagination d-flex justify-content-center ">
          {num.map((number) => (
            <li className="page-item" onClick={() => setPages(number)}>
              <a className="page-link " href="#">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
