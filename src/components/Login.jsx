import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";
import toast from "react-hot-toast";

const defaultTheme = createTheme();

const Login = () => {
  const [isAuthenticated,setIsAuthentication]=useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate hook should be inside the component
  
  const {location, setLocation} = React.useContext(AuthContext)
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await toast.promise(
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
         email,
         password,
       }),

       {
          loading: "Logging in ...",
          success: "Logged in successfully",
          error: "failed to login"
       }

      )
   
      if (response.data.success) {
        setLocation(() => response.data.location)
        navigate("/dashboard"); // Navigate to home page upon successful login

      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please try again.");
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login Here
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log in
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
