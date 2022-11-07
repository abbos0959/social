import React from "react";
import "./Home.css";
import { User } from "../User/User";
import { Post } from "../Post/Post";

export const Home = () => {
   return (
      <div className="home">
         <div className="homeleft">
<Post/>

         </div>
         <div className="homeright">
            <User userId={"sasa"} name={"abbos"} />
         </div>
      </div>
   );
};
