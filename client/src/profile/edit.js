import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, notification, Select, Divider } from 'antd';
import Network from '../services/network';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount = () => {
    var p = this.props.profile;
    this.props.form.setFieldsValue({
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      address: p.address,
      city: p.city,
      state: p.state,
      zip: p.zip,
      dateOfBirth: moment(p.dateOfBirth),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.loadingTrue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let p = {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          email: values.email,
          city: values.city,
          state: values.state,
          zip: values.zip,
          dateOfBirth: values.dateOfBirth,
        };
        if (values.password !== undefined) {
          p.password = values.password;
        }
        this.loadingTrue();
        p._id = this.props.profile._id;
        Network.put('/profile', p, this.networkResponse);
      } else {
        this.openNotificationWithIcon('error', 'Error', 'Error updating profile. Please review form.');
        this.loadingFalse();
      }
    });
  };

  // Network Stuff
  networkResponse = res => {
    this.loadingFalse();
    if (res.status) {
      if (res.status === 404) {
        this.openNotificationWithIcon('error', 'Error', 'Error saving profile. Please try again.');
      } else if (res.status === 201 || res.status === 200) {
        this.props.closeDrawerAndUpdateView();
        this.openNotificationWithIcon('success', 'Success', 'Profile updated.');
      }
    }
  };

  loadingTrue = () => {
    this.setState({ loading: true });
  };
  loadingFalse = () => {
    this.setState({ loading: false });
  };

  /**
   * notifications
   */
  openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} id="edit-profile">
        <h2>Settings</h2>
        <Divider />
        <Row gutter={16}>
          <Col sm={24} md={8}>
            <FormItem label="First name">
              {getFieldDecorator('firstName', {
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Please input your first name.' }],
              })(<Input placeholder="Firs Name" />)}
            </FormItem>
          </Col>
          <Col sm={24} md={8}>
            <FormItem label="Last Name">
              {getFieldDecorator('lastName', {
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Please input your last name.' }],
              })(<Input placeholder="Last Name" />)}
            </FormItem>
          </Col>

          <Col sm={24} md={8}>
            <FormItem label="Email">
              {getFieldDecorator('email', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input placeholder="Email" />)}
            </FormItem>
          </Col>

          <Col sm={24} md={8}>
            <FormItem label="Address">
              {getFieldDecorator('address', {
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Please input your address.' }],
              })(<Input placeholder="Address" />)}
            </FormItem>
          </Col>
          <Col sm={24} md={8}>
            <FormItem label="City">
              {getFieldDecorator('city', {
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Please fill out your city.' }],
              })(<Input placeholder="City" />)}
            </FormItem>
          </Col>
          <Col sm={24} md={4}>
            <FormItem label="State">
              {getFieldDecorator('state', {
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Please fill out your state.' }],
              })(
                <Select placeHolder="State (required)">
                  <Option value="AL">Alabama</Option>
                  <Option value="AK">Alaska</Option>
                  <Option value="AZ">Arizona</Option>
                  <Option value="AR">Arkansas</Option>
                  <Option value="CA">California</Option>
                  <Option value="CO">Colorado</Option>
                  <Option value="CT">Connecticut</Option>
                  <Option value="DE">Delaware</Option>
                  <Option value="DC">District Of Columbia</Option>
                  <Option value="FL">Florida</Option>
                  <Option value="GA">Georgia</Option>
                  <Option value="HI">Hawaii</Option>
                  <Option value="ID">Idaho</Option>
                  <Option value="IL">Illinois</Option>
                  <Option value="IN">Indiana</Option>
                  <Option value="IA">Iowa</Option>
                  <Option value="KS">Kansas</Option>
                  <Option value="KY">Kentucky</Option>
                  <Option value="LA">Louisiana</Option>
                  <Option value="ME">Maine</Option>
                  <Option value="MD">Maryland</Option>
                  <Option value="MA">Massachusetts</Option>
                  <Option value="MI">Michigan</Option>
                  <Option value="MN">Minnesota</Option>
                  <Option value="MS">Mississippi</Option>
                  <Option value="MO">Missouri</Option>
                  <Option value="MT">Montana</Option>
                  <Option value="NE">Nebraska</Option>
                  <Option value="NV">Nevada</Option>
                  <Option value="NH">New Hampshire</Option>
                  <Option value="NJ">New Jersey</Option>
                  <Option value="NM">New Mexico</Option>
                  <Option value="NY">New York</Option>
                  <Option value="NC">North Carolina</Option>
                  <Option value="ND">North Dakota</Option>
                  <Option value="OH">Ohio</Option>
                  <Option value="OK">Oklahoma</Option>
                  <Option value="OR">Oregon</Option>
                  <Option value="PA">Pennsylvania</Option>
                  <Option value="RI">Rhode Island</Option>
                  <Option value="SC">South Carolina</Option>
                  <Option value="SD">South Dakota</Option>
                  <Option value="TN">Tennessee</Option>
                  <Option value="TX">Texas</Option>
                  <Option value="UT">Utah</Option>
                  <Option value="VT">Vermont</Option>
                  <Option value="VA">Virginia</Option>
                  <Option value="WA">Washington</Option>
                  <Option value="WV">West Virginia</Option>
                  <Option value="WI">Wisconsin</Option>
                  <Option value="WY">Wyoming</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col sm={24} md={4}>
            <FormItem label="Zip">
              {getFieldDecorator('zip', {
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Please fill out your zip.' }],
              })(<Input placeholder="Zip" />)}
            </FormItem>
          </Col>

          <Col sm={24} md={12}>
            <FormItem label="Password">
              {getFieldDecorator('password', {})(<Input placeholder="Password" />)}
              <span className="form-info">Leave blank to keep current password.</span>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Button className="link aqua sign-btn" loading={this.state.loading} htmlType="submit">
            Save
          </Button>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(EditProfile);
