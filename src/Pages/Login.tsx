import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
} from "../utils/helper";
import { AuthContext } from "../Store";

const Login = () => {
  const navigate = useNavigate();
  const context = React.useContext(AuthContext);
  const { setLogin, theme } = context;

  function Copyright(props: any) {
    return (
      <Typography variant="body2" align="center" {...props}>
        {"Copyright © "}
        Your Website
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const onclickLogin = (value: LoginForm) => {
    setLogin(true);
    setLocalStorageData("mycapacitorappLogin", { isLoggedIn: true });
    navigate("/");
  };

  return (
    <Box
      sx={{
        backgroundColor: theme === "dark" ? "primary.dark" : "primary.main",
        color: theme === "dark" ? "primary.main" : "primary.dark",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Formik
        initialValues={LoginValidator.initials}
        validationSchema={LoginValidator.validation}
        onSubmit={(values) => {
          onclickLogin(values);
        }}
      >
        {(props) => (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#3b3a37" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={props.handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(event) => {
                    props.setFieldValue("email", event.target.value);
                  }}
                />
                {props.errors.email && props.touched.email && (
                  <span>{props.errors.email}</span>
                )}
                <TextField
                  margin="normal"
                  required
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
                <FormControlLabel
                  control={<Checkbox value="remember" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="">Forgot password?</Link>
                  </Grid>
                  {/* <Grid item>
                    <Link to="">{"Don't have an account? Sign Up"}</Link>
                  </Grid> */}
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
