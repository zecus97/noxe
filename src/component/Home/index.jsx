import React, { useContext } from "react";
import "./style.css";
import CardPeople from "./component/CardPeople";
import CardMovies from "./component/CardMovies";
import { MoviesContext } from "../context/Store";

export default function Home() {
  let { people, movies, status } = useContext(MoviesContext);

  return (
    <>
      {status === "none" ? (
        <>
          <div className="row g-4 my-4">
            <div className="col-md-4">
              <div className="brdr w-25"></div>
              <h1 className="h3 my-4">
              <i class="fa-solid fa-film me-2"></i>Trending
                <br /> Movies <br /> To Watch Right Now
              </h1>
              <p className="opacity-75">Top Trending Movies by Day</p>
              <div className="brdr"></div>
            </div>
            {movies.slice(0, 10).map((movie) => (
              <CardMovies key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="row g-4 my-4">
            <div className="col-md-4">
              <div className="brdr w-25"></div>
              <h1 className="h3 my-4">
              <i class="fa-solid fa-hat-cowboy-side me-2"></i> Trending
                <br /> People <br /> To Watch Right Now
              </h1>
              <p className="opacity-75">Top Trending People by Day</p>
              <div className="brdr"></div>
            </div>
            {people.slice(0, 10).map((people) => (
              <CardPeople key={people.id} people={people} />
            ))}
          </div>
        </>
      ) : status == "error" ? (
        <h1>Error</h1>
      ) : (
        <h1>Loding</h1>
      )}
    </>
  );
}
