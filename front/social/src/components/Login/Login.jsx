import React, { useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Actions/User";

export const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setpassword] = useState("");
   const dispatch = useDispatch();

   const loginHandler = (e) => {
      e.preventDefault();
      dispatch(loginUser(email, password));

      console.log(password, email);
   };
   return (
      <div className="login">
         <form className="loginForm" onSubmit={loginHandler}>
            <Typography variant="h4">Tizimga Kirish</Typography>
            <input
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               type="email"
               placeholder="Email kiriting"
               required
            />
            <input
               value={password}
               onChange={(e) => setpassword(e.target.value)}
               type="password"
               placeholder="Parol kiriting"
               required
            />

            <Link to="/forgot/password">
               <Typography>Parolni unutdingizmi?</Typography>
            </Link>
            <Button
               type="submit"
               style={{
                  width: "80%",
                  background: "green",
                  color: "white",
                  borderRadius: "20px",
                  padding: "15px",
               }}
            >
               Login
            </Button>
            <Link to="/register">
               <Typography>Ro'yhatdan O'tish</Typography>
            </Link>
         </form>
      </div>
   );
};
