import React, { useState } from "react";
import classes from "./main.module.scss";
import { reduxForm, Field } from "redux-form";
import { Button, Form, Collapse, Modal, Drawer, notification } from "antd";
import {
  required,
  OnlyNum,
  MinLengthTel,
  OnlyLett,
  MinLengthIndex,
} from "../validators/validator";
import {
  TextArea,
  InputEmail,
  AllInput,
  AllInputCheck,
} from "./../formControls/controls";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import { ArrowLeftOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";

let Box = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={classes.formitems}>
      <Field
        component={AllInput}
        label="ФИО"
        name="FIO"
        validate={[required, OnlyLett]}
      ></Field>
      <Field
        component={AllInput}
        name="index"
        label="Индекс"
        maxLength="6"
        validate={[required, OnlyNum, MinLengthIndex]}
      ></Field>
      <Field
        component={AllInput}
        label="Адрес"
        name="address"
        validate={[required]}
      ></Field>
      <Field component={InputEmail} name="Email" validate={[required]}></Field>
      <Field
        component={AllInput}
        label="Телефон"
        maxLength="11"
        name="Tel"
        validate={[required, OnlyNum, MinLengthTel]}
      ></Field>
      <Field
        component={AllInput}
        name="Tema"
        label="Тема"
        validate={[required]}
      ></Field>
      <Field component={TextArea} name="Text" validate={[required]}></Field>
      <Form.Item>
        <Button type="primary" htmlType="submit" block disabled={props.load}>
          Отправить
        </Button>
      </Form.Item>
    </form>
  );
};
let BoxCheck = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={AllInputCheck}
        name="id"
        validate={[required]}
        label="Id обращения"
      ></Field>
      <Form.Item>
        <Button htmlType="submit" type="primary" block>
          Проверить
        </Button>
      </Form.Item>
    </form>
  );
};

let FormCheck = reduxForm({
  form: "Check",
})(BoxCheck);

let FormMess = reduxForm({
  form: "Message",
})(Box);

let Main = (props) => {
  const [isShow, setShow] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isStatus, SetStatus] = useState(false);

  let onSubmit = (formData) => {
    props.SendMessage(formData);
    setVisible(true);
  };
  let onSubmitCheck = (id) => {
    props.CheckStatus(id);
    SetStatus(false);
  };
  if (props.status) {
    notification.info({
      message: `Статуc обращения`,
      description: props.status,
      placement: "topLeft",
      duration:15,
    });
    props.Clear();
  }
  return (
    <div>
      {!isShow && (
        <div className={classes.main}>
          <div>
            <QueueAnim delay={600} animConfig={[{ opacity: [1, 0.2] }]}>
              <div key="a">
                <h1 className={classes.title}>Интернет приемная</h1>
                <p className={classes.text}>
                  На этой странице вы можете отправить обращение в администрацию
                  Слободского района. Поступающие письма рассматриваются и
                  направляются для разрешения имеющихся в них вопросов в органы
                  исполнительной власти Кировской области в соответствии с
                  Федеральным законом от 2 мая 2006 года № 59-ФЗ «О порядке
                  рассмотрения обращений граждан Российской Федерации».
                </p>
                <div className={classes.boxbtn} key="b">
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={() => setShow(true)}
                    disabled={props.load}
                  >
                    Сделать обращение
                  </Button>
                  <Button
                    className={classes.statusBtn}
                    shape="round"
                    size="large"
                    onClick={() => SetStatus(true)}
                  >
                    Проверить статус обращения
                  </Button>
                </div>
              </div>
            </QueueAnim>
            <Drawer
              title="Проверить статус"
              width={400}
              onClose={() => SetStatus(false)}
              visible={isStatus}
              bodyStyle={{ paddingBottom: 80 }}
              footer={
                <div>
                  <Button onClick={() => SetStatus(false)} type="primary" block>
                    Закрыть
                  </Button>
                </div>
              }
            >
              <FormCheck {...props} onSubmit={onSubmitCheck}></FormCheck>
            </Drawer>
          </div>
        </div>
      )}
      {isShow && (
        <QueueAnim
          delay={300}
          animConfig={[{ opacity: [1, 0.2] }, { opacity: [1, 0] }]}
        >
          <div className={classes.form} key="a">
            <FormMess {...props} onSubmit={onSubmit}></FormMess>

            <div className={classes.rules}>
              <Button onClick={() => setShow(false)} className={classes.back}>
                <ArrowLeftOutlined />
                Назад
              </Button>
              <p>
                Нажимая кнопку <b>Отравить</b>, вы даете свое согласие на
                передачу информации обращения в электронной форме по открытым
                каналам связи сети Интернет и на обработку ваших персональных
                данных
              </p>
              <Collapse key="1" className={classes.rulesColl}>
                <CollapsePanel header="Правило №1" key="1">
                  Письма, содержащие нецензурные, либо оскорбительные выражения,
                  информацию рекламного характера не рассматриваются.
                </CollapsePanel>

                <CollapsePanel header="Правило №2" key="2">
                  Ответ на ваше обращение будет направлен на указанный
                  электронный или почтовый адрес. Если в письменном обращении не
                  будет указана фамилия и адрес заявителя, либо указан неполный
                  или недостоверный адрес, ответ на такое обращение не дается.
                </CollapsePanel>
                <CollapsePanel header="Правило №3" key="3">
                  При написании обращения просим ясно, грамотно и лаконично
                  формулировать текст письма — это ускорит его обработку и
                  подготовку ответа.
                </CollapsePanel>
                <CollapsePanel header="Правило №4" key="4">
                  Информация о персональных данных граждан, направивших
                  обращение, хранится и обрабатывается с соблюдением требований
                  российского законодательства о персональных данных.
                </CollapsePanel>
              </Collapse>
            </div>
          </div>
        </QueueAnim>
      )}

      <Modal
        title="Обращение успешно отправлено"
        visible={isVisible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <p>
          Ваще обращение успешно отправлено и будет обработано в ближайщее время
        </p>
        <p>Ваш номер обращения - {props.message}</p>
        <p>
          <b>Сохраните ваш номер обращения</b>
        </p>
      </Modal>
    </div>
  );
};

export default Main;
