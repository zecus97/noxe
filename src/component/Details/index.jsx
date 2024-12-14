import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pathImg } from "../../constant/pathImg";
import { MoviesContext } from "../context/Store";

export default function Details() {
  const api_key = process.env.REACT_APP_API_KEY;
  let { id } = useParams();
  const { contextType } = useContext(MoviesContext);

  const [type, setType] = useState(() => {
    return localStorage.getItem("type") || contextType || "movie";
  })

  const [details, setDetails] = useState({});

  useEffect(() => {
    if (type) {
      localStorage.setItem("type", type);
    }
  }, [type]);

  useEffect(() => {
    if (id && type) {
      getMovie(id, type, setDetails);
    }
  }, [id, type]);

  function getMovie(id, type, callback) {
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=eg-US`
      )
      .then(({ data }) => {
        callback(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-md-3">
          <img
            className="w-100 rounded-4"
            src={
              type === "movie" || type === "tv"
                ? pathImg(details.poster_path)
                : pathImg(details.profile_path)
            }
            alt=""
          />
        </div>
        <div className="col-md-8 d-flex ms-3">
          <div>
            <h2 className="mb-2">
              {type === "movie" ? details.title : details.name}
            </h2>
            {(type === "movie" || type === "tv") && (
              <p className="py-3 ">
                <span className="text-info fw-bold fs-5">Overview: </span>
                <br></br> {details.overview}
              </p>
            )}
            <ul className="p-0">
              {(type === "movie" || type === "tv") && (
                <li className="fs-5 fw-bold mt-2">
                  <i className="fa-solid fs-5 fa-star text-warning"></i>
                  <span className="text-info fs-4 fw-bold"> </span>
                  {details.vote_average}
                </li>
              )}
              <li className="fs-5">
                {type === "movie" && (
                  <span>
                    <i className="fa-solid fa-dollar-sign me-2"></i>
                    <span className="text-info fw-bold">Budget :</span>{" "}
                    {details.budget}
                  </span>
                )}
                {type === "tv" && (
                  <span>
                    <i className="fa-solid fa-tower-cell me-2"></i>
                    <span className="text-info fw-bold">First Air Date :</span>{" "}
                    {details.first_air_date}
                  </span>
                )}
              </li>
              <li className="fs-5">
                <i className="fa-solid fa-fire-flame-curved me-2"></i>
                <span className="text-info fw-bold">Popularity : </span>
                {details.popularity}
              </li>
              {(type === "movie" || type === "tv") && (
                <li className="fs-5">
                  <i className="fa-solid fa-users-line me-2"></i>
                  <span className="text-info fw-bold">Vote count : </span>
                  {details.vote_count}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}