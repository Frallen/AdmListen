import React from "react";
import { Spin } from "antd";
import classes from "./preloader.module.scss";

let Preloader = () => {
  return (
    <div className={classes.PreloaderBox}>
      <Spin size="large" />
    </div>
  );
};

export default Preloader
