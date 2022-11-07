import "./App.css";
import { Header } from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";
import { Home } from "./components/Home/Home";
function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(loadUser());
   }, []);

   const { isauth } = useSelector((state) => state.user);
   return (
      <Router>
         {isauth && <Header />}
         <Routes>
            <Route path="/" element={isauth ? <Home /> : <Login />} />
         </Routes>
      </Router>
   );
}

export default App;
