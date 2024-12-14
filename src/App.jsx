import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Movies from "./component/Movies";
import People from "./component/People";
import Tv from "./component/Tv";
import NotFound from "./component/NotFound";
import Register from "./component/Register";
import Login from "./component/Login";
import { useContext, useEffect } from "react";
import Details from "./component/Details";
import {MoviesContext} from "./component/context/Store";

function App() {
  let { saveDataUser } = useContext(MoviesContext);
  function ProtectedRoute(props) {
    if (localStorage?.getItem("access_token") === null) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }
  useEffect(() => {
    saveDataUser();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="home"
            element={<Home />}
          />
          <Route
            path="Movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="people"
            element={
              <ProtectedRoute>
                <People />
              </ProtectedRoute>
            }
          />
          <Route
            path="tv"
            element={
              <ProtectedRoute>
                <Tv />
              </ProtectedRoute>
            }
          />
          <Route
            path="details/:id"
            element={
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            }
          />

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
