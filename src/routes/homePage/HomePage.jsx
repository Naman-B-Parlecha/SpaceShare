import React from "react";
import "./homePage.scss";
import SearchBar from "../../components/SearchBar/SearchBar";
const HomePage = () => {
  return (
    <div>
      <div className="homePage">
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              asperiores consequuntur, odit non tenetur maiores qui expedita
              ipsam totam dolorum eos rerum atque quos, obcaecati, autem
              molestias ea sapiente debitis.
            </p>
            <SearchBar />
            <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>
              <div className="box">
                <h1>200</h1>
                <h2>Award Gained</h2>
              </div>
              <div className="box">
                <h1>1200+</h1>
                <h2>Property Ready</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="imgContainer">
          <img src="/bg.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
