import React, { useContext } from "react";
import { MoviesContext } from "../context/Store";
import CardTv from './../Home/component/CardTv';
export default function Tv() {
  let { tv, setPages } = useContext(MoviesContext);
  let num = new Array(10).fill(1).map((num, index) => index + 1);
  return (
    <div className="row g-4 my-4 d-flex  justify-content-center">
      {tv.map((tv) => (
        <CardTv 
        key={tv.id} 
        tv={tv} />
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
