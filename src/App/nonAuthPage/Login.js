import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (dataInput) => {
    try {
      const resLogin = await axios.post(
        "http://localhost:8080/login",
        dataInput
      );
      const token = resLogin.data.accessToken;
      sessionStorage.setItem("token", token);

      if (resLogin.status === 200) {
        alert("Selamat, Login succesful");
        props.history.push("/auth");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="mt-5 mb-5">
        <div className="card col-8 offset-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="m-5">
              <h2 className="mb-5">Sign In</h2>
              <div className="form-group">
                <label>Username</label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  ref={register({
                    validate: (value) => value.length > 4,
                  })}
                ></input>
                {errors.username && (
                  <p className="text-danger">
                    check your username, username at least 5 characters
                  </p>
                )}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  ref={register({
                    validate: (value) => value.length > 7,
                  })}
                ></input>
                {errors.password && (
                  <p className="text-danger">
                    check your password, password at least 8 characters
                  </p>
                )}
              </div>
              <button className="btn btn-primary mb-5" type="submit">
                Login
              </button>
              <p>
                Dont have an account? <a href="/register">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
