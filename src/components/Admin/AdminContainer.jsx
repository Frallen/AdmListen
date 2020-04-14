import React, { useEffect } from "react";
import { connect } from "react-redux";
import Admin from "./admin";
import { AdminAcess, Clear, GetAll, Delete } from "./../../redux/mainReducer";


let Box = (props) => {
  useEffect(() => {
    props.GetAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let AdminAcess = (data) => {
    props.AdminAcess(data);
  };
  let Clear = () => {
    props.Clear();
  };
  let Delete = (id) => {
    props.Delete(id);
  };

  return (
    <Admin
      {...props}
      AdminAcess={AdminAcess}
      Clear={Clear}
      Delete={Delete}
    ></Admin>
  );
};

let mapStateToProps = (state) => {
  return {
    access: state.main.access,
    error: state.main.ErrorMess,
    data: state.main.data,
    hist: state.main.histData,
  };
};

export default connect(mapStateToProps, { AdminAcess, Clear, GetAll, Delete })(
  Box
);
