import React, { useContext } from "react";
import { pathImg } from "../../../constant/pathImg";
import person from "../../../../src/assets/images.jpeg";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../context/Store";

export default function CardPeople({ people }) {
  let { setType } = useContext(MoviesContext);
  return (
    <div
      className="col-md-2 theCard"
      onClick={() => {
        setType("person");
      }}
    >
      <div className="">
        <Link to={`/details/${people.id}`}>
          <img
            src={people.profile_path ? pathImg(people.profile_path) : person}
            alt=""
            className="w-100 h-100 rounded-top-4"
          />
          <h2 className="h6 mt-2">{people.name}</h2>
        </Link>
      </div>
    </div>
  );
}
