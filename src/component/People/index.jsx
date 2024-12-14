import React, { useContext } from "react";
import { MoviesContext } from "../context/Store";
import CardPeople from "../Home/component/CardPeople";
export default function People() {
  let { setPages, people } = useContext(MoviesContext);

  let num = new Array(10).fill(1).map((num, index) => index + 1);
  return (
    <div className="row g-4 my-4 d-flex  justify-content-center">
      {Array.isArray(people) &&
        people.length &&
        people.map((people) => <CardPeople key={people.id} people={people} />)}
      <nav aria-label="Page navigation example">
        <ul className="pagination d-flex justify-content-center ">
          {num.map((number) => (
            <li
              className="page-item "
              key={number}
              onClick={() => setPages(number)}
            >
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
