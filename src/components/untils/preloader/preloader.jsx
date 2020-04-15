import React from "react";
import { Spin } from "antd";
import classes from "./preloader.module.scss";

export const Preloader = () => {
  return (
    <div className={classes.PreloaderBox}>
      <Spin size="large" />
    </div>
  );
};


