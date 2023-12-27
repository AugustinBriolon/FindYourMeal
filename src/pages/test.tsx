import React from "react";
import { Link } from "react-router-dom";
import transition from "../transition";

const Test: React.FC = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Test</h1>
    </div>
  );
};

export default transition(Test);
