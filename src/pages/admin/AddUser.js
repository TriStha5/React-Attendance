import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Card
} from 'antd';
import { useParams, useNavigate } from "react-router"
import { createUser, getUser, updateUser } from '../../utils/user.util';
import { showInfoTost, showSuccesssTost } from '../../utils/toastify.util';

const { Option } = Select;

const AddUser = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState(
      {
        name: "",
        age: 0,
        address: "",
        email: "",
        Designation: "",
        password: "",
        attendance: 0
      }
    );
  const [form] = Form.useForm();

  useEffect(() => {
    if (params.userId) {
      getUser(params.userId).then((data) => {
        setFormState(data);
        form.setFieldsValue(data);
      });
    }
  }, [form, params.userId]);

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    if(!params.userId) {
      await createUser(values);
      showSuccesssTost('User added successfully');
    } else {
      await updateUser(params.userId, values);
      showInfoTost('User Updated successfully');
    }
    navigate('/admin/view');
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
       <Card
        style={{
          marginTop: 16,
        }}
        type="inner"
        title={<h1>{params.userId ? "Edit User": "Add User"}</h1>}
      >
        <Form
        form={form}
        onFinish={onFinish}
        initialValues={formState}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              type: 'text',
              message: 'The input is not valid name!',
            },
            {
              required: true,
              message: 'Please input name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              required: true,
              message: 'Please input age!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input Address!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="designation"
          label="Designation"
          rules={[
            {
              required: true,
              message: 'Please select Designation!',
            },
          ]}
        >
          <Select placeholder="select your role">
            <Option value="President">President</Option>
            <Option value="Past President">Past President</Option>
            <Option value="Immidiate Past President">Immidiate Past President</Option>
            <Option value="Vice President">Vice President</Option>
            <Option value="Secretary">Secretary</Option>
            <Option value="Treasurer">Treasurer</Option>
            <Option value="Club Servide Chair">Club Servide Chair</Option>
            <Option value="Community Servide Chair">Community Servide Chair</Option>
            <Option value="International Servide Chair">International Servide Chair</Option>
            <Option value="Professional Development Chair">Professional Development Chair</Option>
            <Option value="Communication Manager">Communication Manager</Option>
            <Option value="Seargent-At-Arms">Seargent-At-Arms</Option>
            <Option value="Rotary Foundation Chair">Rotary Foundation Chair</Option>
            <Option value="Membership Chair">Membership Chair</Option>
            <Option value="Public Image Chair">Public Image Chair</Option>
            <Option value="General Member">General Member</Option>
            <Option value="Proposed Member">Proposed Member</Option>
            <Option value="Guest Member">Guest Member</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input Password!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default AddUser;