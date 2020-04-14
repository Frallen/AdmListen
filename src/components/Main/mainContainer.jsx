import React from "react";
import { connect } from "react-redux";
import Main from "./main";
import { SendMessage, CheckStatus,Clear } from "./../../redux/mainReducer";

let Box = (props) => {
  let SendMessage = (data) => {
    props.SendMessage(data);
  };
  let CheckStatus = (id) => {
    props.CheckStatus(id);
  };
  let Clear=()=>{
    props.Clear()
  }
  return (
    <Main {...props} SendMessage={SendMessage} CheckStatus={CheckStatus} Clear={Clear}></Main>
  );
};

let mapStateToProps = (state) => {
  return {
    load: state.main.load,
    error: state.main.ErrorMess,
    message: state.main.SuccMessID,
    status: state.main.status,
    country: state.main.country,
  };
};

export default connect(mapStateToProps, { SendMessage, CheckStatus,Clear })(Box);
