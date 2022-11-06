import "./Header.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
   Search,
   AccountCircle,
   Home,
   Add,
   HomeOutlined,
   AddOutlined,
   SearchOutlined,
   AccountCircleOutlined,
} from "@mui/icons-material";
export const Header = () => {
   const [tab, setTab] = useState(window.location.pathname);
   console.log(tab);
   return (
      <div className="header">
         <Link to="/" onClick={() => setTab("/")}>
            {tab === "/" ? <Home style={{ color: "red" }} /> : <HomeOutlined />}
         </Link>
         <Link to="/newpost" onClick={() => setTab("/newpost")}>
            {tab === "/newpost" ? <Add style={{ color: "red" }} /> : <AddOutlined />}
         </Link>
         <Link to="search" onClick={() => setTab("/search")}>
            {tab === "/search" ? <Search style={{ color: "red" }} /> : <SearchOutlined />}
         </Link>
         <Link to="/account" onClick={() => setTab("/account")}>
            {tab === "/account" ? (
               <AccountCircle style={{ color: "red" }} />
            ) : (
               <AccountCircleOutlined />
            )}
         </Link>
      </div>
   );
};
