import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let MoviesContext = createContext(0);
export default function MoviesContextProvider(props) {
  const [movies, setMovies] = useState([]);
  const [people, setPeople] = useState([]);
  const [tv, setTv] = useState([]);
  const [status, setStatus] = useState("none");
  let [pages, setPages] = useState(1);
  let [type, setType] = useState("");
  const navigate = useNavigate();
  const api_key = process.env.REACT_APP_API_KEY;
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getData("movie", setMovies, pages);
    getData("person", setPeople, pages);
    getData("tv", setTv, pages);
  }, []);
  function saveDataUser() {
    if (localStorage.getItem("access_token")) {
      const encodeToken = localStorage?.getItem("access_token");
      const decodeToken = jwtDecode(encodeToken);
      setUserData(decodeToken);
    } else {
      setUserData(null);
    }
  }
  function logOut() {
    setUserData(null);
    localStorage?.removeItem("access_token");
    navigate("/login");
  }
  function getData(type, callback, page) {
    setStatus("loading");
    axios
      .get(
        `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&include_adult=false&include_video=false&language=en-US&page=${page}`
      )
      .then(({ data: { results } }) => {
        callback(results);
        setStatus("none");
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });
  }
  return (
    <MoviesContext.Provider
      value={{
        movies,
        people,
        tv,
        status,
        setPages,
        setType,
        type,
        saveDataUser,
        logOut,
        userData,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
}
