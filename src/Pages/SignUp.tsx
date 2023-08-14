import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import {
  LoginForm,
  LoginValidator,
  setLocalStorageData,
  SignupValidator,
} from "../utils/helper";
import { AuthContext } from "../Store";
import { makeStyles } from "@mui/material";
import { LoginInputs } from "../Components/Styled/Components";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const context = React.useContext(AuthContext);
  const { setUid } = context;

  const onclickSignup = (value: LoginForm) => {
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, value.email, value.password)
      .then((result) => {
        updateProfile(result.user, { displayName: value.name }).then((res) => {
          console.log(result);
          result?.user.getIdTokenResult().then((res) => {
            setUid(result.user.uid ?? "");
            setLocalStorageData("mycapacitorappLogin", {
              uid: result.user.uid ?? "",
            });
            navigate("/");
          });
        });
      })
      .catch((err) => {
        toast.error(err?.message ?? "Something went wrong!");
        console.log(err);
      });
  };

  return (
    <Formik
      initialValues={SignupValidator.initials}
      validationSchema={SignupValidator.validation}
      onSubmit={(values) => {
        onclickSignup(values);
      }}
    >
      {(props) => (
        <>
          <Box component="form" onSubmit={props.handleSubmit} sx={{ mt: 1 }}>
            <LoginInputs
              margin="normal"
              required
              variant="filled"
              fullWidth
              id="name"
              label="Full name"
              name="name"
              autoComplete="name"
              onChange={(event) => {
                props.setFieldValue("name", event.target.value);
              }}
            />
            {props.errors.email && props.touched.email && (
              <span style={{ color: "red" }}>{props.errors.name}</span>
            )}
            <LoginInputs
              margin="normal"
              required
              variant="filled"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(event) => {
                props.setFieldValue("email", event.target.value);
              }}
            />
            {props.errors.email && props.touched.email && (
              <span style={{ color: "red" }}>{props.errors.email}</span>
            )}
            <LoginInputs
              margin="normal"
              required
              variant="filled"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                props.setFieldValue("password", event.target.value);
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link style={{ color: "inherit" }} to="">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </>
      )}
    </Formik>
  );
};

export default SignUp;
