import "./App.css";
import { Header } from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";
function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(loadUser());
   }, []);
   return (
      <Router>
         <Header />
         <Routes>
            <Route path="/" element={<Login />} />
         </Routes>
      </Router>
   );
}

export default App;
