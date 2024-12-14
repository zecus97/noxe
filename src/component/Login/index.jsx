import axios from "axios";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../context/Store";

export default function Login() {
  let { saveDataUser } = useContext(MoviesContext);

  const navigate = useNavigate();
  const [errorsList, setErrorsList] = useState([]);
    const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dataInfo, setDataInfo] = useState({
    email: "",
    password: "",
  });

  function getData(e) {
    let objtoSend = { ...dataInfo };
    objtoSend[e.target.name] = e.target.value;
    setDataInfo(objtoSend);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let validateResult = validateLoginForm();
    setErrorsList(validateResult?.error?.details);
    setLoading(true);
    if (validateResult?.error?.details?.length > 0) {
      console.log(validateResult?.error?.details);
      setLoading(false);
    } else {
      axios
        .post("http://hawas.runasp.net/api/v1/Login", dataInfo)
        .then((res) => {
          console.log(res);
          localStorage.setItem("access_token", res?.data?.jwt);
          saveDataUser();
          setLoading(false);
          navigate("/home");
        })
        .catch((err) => {
          setErrorMessage(err?.response?.data);
          setLoading(false);
        });
    }
  }
  function validateLoginForm() {
    let scheme = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return scheme.validate(dataInfo, { abortEarly: false });
  }
  return (
    <>
      <div className="w-75 mx-auto">
        <h1 className="text-center">Login Now</h1>
        {errorsList?.map((err) => (
          <h2 className="alert alert-danger h6">{err.message}</h2>
        ))}
        {errorMessage?.length ? (
          <h3 className="alert alert-danger">{errorMessage}</h3>
        ) : (
          <></>
        )}
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="email">
          <i class="fa-solid fa-envelope me-2"></i>Email :
          </label>
          <input
            onChange={getData}
            className="form-control mb-2"
            type="email"
            id="email"
            name="email"
          />
          <label className="form-label" htmlFor="password">
          <i class="fa-solid fa-lock me-2"></i>Password :
          </label>
          <input
            onChange={getData}
            className="form-control mb-2"
            type="password"
            id="password"
            name="password"
          />
           <button type="submit" className="btn btn-warning mt-3 px-4">
            {loading === true ? (
              <i className="fas fa-spin fa-spinner"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
