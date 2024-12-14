import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [errorsList, setErrorsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dataInfo, setDataInfo] = useState({
    userName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    rePassword: "",
  });

  // State for the date dropdowns
  const [date, setDate] = useState({
    year: "",
    month: "",
    day: "",
  });

  // Generate arrays for dropdown options
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Handle dropdown changes and update dateOfBirth
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const updatedDate = { ...date, [name]: value };
    setDate(updatedDate);

    // Combine the selected year, month, and day into YYYY-MM-DD format
    if (updatedDate.year && updatedDate.month && updatedDate.day) {
      const formattedDate = `${updatedDate.year}-${String(updatedDate.month).padStart(2, "0")}-${String(updatedDate.day).padStart(2, "0")}`;
      setDataInfo((prev) => ({ ...prev, dateOfBirth: formattedDate }));
    }
  };

  function getData(e) {
    let objtoSend = { ...dataInfo };
    objtoSend[e.target.name] = e.target.value;
    setDataInfo(objtoSend);
  }

  async function handleSubmit(e) {
    console.log(dataInfo);
    setLoading(true);
    e.preventDefault();
    let validateResult = validateRegisterForm();
    setErrorsList(validateResult?.error?.details);
    if (validateResult?.error?.details?.length > 0) {
      console.log(validateResult?.error?.details);
      setLoading(false);
    } else {
      axios
        .post("http://hawas.runasp.net/api/v1/Register", dataInfo)
        .then((res) => {
          console.log("done", res);
          navigate("/login");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(err?.response?.data);
          setLoading(false);
        });
    }
  }

  function validateRegisterForm() {
    let scheme = Joi.object({
      userName: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      dateOfBirth: Joi.date().iso().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
      rePassword: Joi.ref("password"),
    });
    return scheme.validate(dataInfo, { abortEarly: false });
  }

  return (
    <>
      <div className="w-75 mx-auto">
        <h1 className="text-center">Register Now</h1>
        <div className="d-flex justify-content-center">
        <p className="text-center opacity-75">You Can Sign Up with fake Credentials</p>
        <span className="fw-bold">👋</span>
        </div>
        {errorsList?.map((err) => (
          <h3 className="alert alert-danger" key={err.message}>{err.message}</h3>
        ))}
        {errorMessage?.length ? (
          <h3 className="alert alert-danger">{errorMessage}</h3>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit}>
          <label className="form-label text-white fw-bold" htmlFor="name"><i class="fa-solid fa-file-signature me-2"></i>First Name:</label>
          <input onChange={getData} className="form-control mb-3" type="text" id="name" name="userName" placeholder="First Name" />

          <label className="form-label text-white fw-bold" htmlFor="dateOfBirth"><i class="fa-solid fa-calendar-days me-2"></i>Date of Birth:</label>
          <div className="mb-3 d-flex gap-2">
            <select className="form-control" name="year" value={date.year} onChange={handleDateChange}>
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select className="form-control" name="month" value={date.month} onChange={handleDateChange}>
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select className="form-control" name="day" value={date.day} onChange={handleDateChange}>
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <label className="form-label text-white fw-bold" htmlFor="email"><i class="fa-solid fa-envelope me-2"></i>E-mail:</label>
          <input onChange={getData} className="form-control mb-3" type="email" id="email" name="email" placeholder="E-mail" />
          <label className="form-label text-white fw-bold" htmlFor="password"><i class="fa-solid fa-lock me-2"></i>Password:</label>
          <input onChange={getData} className="form-control mb-3" type="password" id="password" name="password" placeholder="Password" />
          <label className="form-label text-white fw-bold" htmlFor="password"><i class="fa-solid fa-registered me-2"></i>Re-Password:</label>
          <input onChange={getData} className="form-control mb-3" type="password" id="rePassword" name="rePassword" placeholder="Re-Password" />
          <button type="submit" className="btn btn-warning mt-3 px-4">
            {loading === true ? (
              <i className="fas fa-spin fa-spinner"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
