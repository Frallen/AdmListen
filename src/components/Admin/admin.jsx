import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { required } from "../validators/validator";
import { InputPass } from "./../formControls/controls";
import { Button, message, Table, Modal } from "antd";
import classes from "./admin.module.scss";
import { Form } from "antd";

let Box = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={classes.form}>
      <Field
        component={InputPass}
        name="Password"
        validate={[required]}
      ></Field>
      <Form.Item>
        <Button htmlType="submit" type="primary" block>
          Войти
        </Button>
      </Form.Item>
    </form>
  );
};

let FormAdm = reduxForm({
  form: "Login",
})(Box);

let Admin = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [Main, setMain] = useState();
  const [isShow, setShow] = useState(false);
  let data = [];
  let datah = [];
  let tablestate = {
    bordered: true,

    pagination: { pageSize: 50 },
    size: "small",
    scroll: { x: 900 },
  };

  props.data.map((p) =>
    data.push({
      key: p.id,
      id: p.id,
      date: p.date,
      FIO: p.FIO,
      index: p.index,
      address: p.address,
      Email: p.Email,
      Tel: p.Tel,
      Tema: p.Tema,
      Text: p.Text,
    })
  );

  props.hist.map((p) =>
    datah.push({
      key: p.id,
      id: p.id,
      date: p.date,
      FIO: p.FIO,
      index: p.index,
      address: p.address,
      Email: p.Email,
      Tel: p.Tel,
      Tema: p.Tema,
      Text: p.Text,
    })
  );

  let columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "ФИО",
      dataIndex: "FIO",
      key: "FIO",
    },
    {
      title: "Индекс",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Адрес",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Почта",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Телефон",
      dataIndex: "Tel",
      key: "Tel",
    },
    {
      title: "Тема",
      dataIndex: "Tema",
      key: "Tema",
    },
    {
      title: "Текст",
      dataIndex: "Text",
      key: "Text",
      fixed: "right",
      render: (text, row) => (
        <span onClick={() => show(row.Text)} className={classes.tableBtnB}>
          Показать
        </span>
      ),
    },
    {
      title: "Действие",
      key: "Action",
      fixed: "right",
      render: (text, row) => (
        <span onClick={() => onDelete(row.id)} className={classes.tableBtnR}>
          Удалить
        </span>
      ),
    },
  ];
  let columns2 = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "ФИО",
      dataIndex: "FIO",
      key: "FIO",
    },
    {
      title: "Индекс",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Адрес",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Почта",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Телефон",
      dataIndex: "Tel",
      key: "Tel",
    },
    {
      title: "Тема",
      dataIndex: "Tema",
      key: "Tema",
    },
    {
      title: "Текст",
      dataIndex: "Text",
      key: "Text",
      fixed: "right",
      render: (text, row) => (
        <span onClick={() => show(row.Text)} className={classes.tableBtnB}>
          Показать
        </span>
      ),
    },
  ];
  let onDelete = (id) => {
    props.Delete(id);
  };

  let show = (text) => {
    setMain(text);
    setVisible(true);
  };

  let onSubmit = (formData) => {
    props.AdminAcess(formData);
  };

  if (props.error) {
    message.error(props.error);
    props.Clear();
  }

  return (
    <div>
      {!props.access ? (
        <div className={classes.loginPage}>
          <div className={classes.login}>
            <FormAdm {...props} onSubmit={onSubmit}></FormAdm>
          </div>
        </div>
      ) : (
        <div className={classes.TabButt}>
          {!isShow && (
            <Table {...tablestate} columns={columns} dataSource={data}></Table>
          )}
          {isShow && (
            <Table
              {...tablestate}
              columns={columns2}
              dataSource={datah}
            ></Table>
          )}
          <div className={classes.btns}>
            {!isShow && <Button onClick={() => setShow(true)}>История</Button>}
            {isShow && (
              <Button onClick={() => setShow(false)}>Актуальные</Button>
            )}
            <Button className={classes.exit} onClick={() => props.Clear()}>
              Выход
            </Button>
          </div>
        </div>
      )}
      <div>
        <Modal
          title="Текст обращения"
          visible={isVisible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
          <p>{Main}</p>
        </Modal>
      </div>
    </div>
  );
};

export default Admin;
