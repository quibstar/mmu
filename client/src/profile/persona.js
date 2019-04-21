import React, { Component } from 'react';
import { Form, Input } from 'antd';
import ProfilePrefs from './profile-prefs';
const FormItem = Form.Item;

class Persona extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="my-prefs">
        <h2>This is me</h2>
        <Form>
          <FormItem label={'Display Name'}>
            {getFieldDecorator('displayName', {
              rules: [{ required: true, message: 'Please input your displayname!' }],
            })(<Input />)}
          </FormItem>
          <ProfilePrefs {...this.props} FormItem={FormItem} />
        </Form>
      </div>
    );
  }
}
export default Form.create()(Persona);
