import React from "react";
import "normalize.css";
import "./App.css";

import TitleBar from "./components/TitleBar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";

export default () => (
  <div className="app">
    <TitleBar />
    <Hero />
    <HowItWorks />
  </div>
);
