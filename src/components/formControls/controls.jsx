import React from "react";
import { Input, Form } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const LoginLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 7 },
  },
};

export const InputPass = ({ input, meta, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <Form.Item
      label="Пароль"
      {...LoginLayout}
      validateStatus={HasError ? "error" : "validating"}
      hasFeedback={true && HasError}
      help={HasError && meta.error}
    >
      <Input.Password {...input} {...props}></Input.Password>
    </Form.Item>
  );
};


export const AllInput = ({ input, meta, label, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <Form.Item
      label={label}
      {...formItemLayout}
      validateStatus={HasError ? "error" : "validating"}
      hasFeedback={HasError && true}
      help={HasError && meta.error}
    >
      <Input {...input} {...props}></Input>
    </Form.Item>
  );
};


export const AllInputCheck = ({ input, meta, label, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <Form.Item
      label={label}
      {...LoginLayout}
      validateStatus={HasError ? "error" : "validating"}
      hasFeedback={HasError && true}
      help={HasError && meta.error}
    >
      <Input {...input} {...props}></Input>
    </Form.Item>
  );
};

export const InputEmail = ({ input, meta, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <Form.Item
      {...formItemLayout}
      label="Электронная почта"
      validateStatus={HasError ? "error" : "validating"}
      hasFeedback={HasError && true}
      help={HasError && meta.error}
    >
      <Input {...input} {...props} type="email"></Input>
    </Form.Item>
  );
};

export const TextArea = ({ input, meta, ...props }) => {
  const HasError = meta.touched && meta.error;
  return (
    <Form.Item
      {...formItemLayout}
      label="Текст обращения"
      validateStatus={HasError ? "error" : "validating"}
      hasFeedback={HasError && true}
      help={HasError && meta.error}
    >
      <Input.TextArea {...input} {...props}></Input.TextArea>
    </Form.Item>
  );
};
