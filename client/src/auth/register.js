import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Checkbox, Alert } from 'antd';
import Network from '../services/network';
const FormItem = Form.Item;

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      successRegisteringAccount: false,
      errorRegisteringAccount: false,
      serverErrors: '',
      serverSuccess: '',
    };
  }

  componentDidMount() {
    document.body.classList.add('session');
  }

  componentWillUnmount() {
    document.body.classList.remove('session');
  }

  // loading stuff
  loadingTrue = () => {
    this.setState({ loading: true });
  };
  loadingFalse = () => {
    this.setState({ loading: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.loadingTrue();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var account = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          tos: values.agreement,
        };
        Network.post('/signup', account, this.networkResponse);
      } else {
        this.loadingFalse();
      }
    });
  };

  networkResponse = res => {
    this.loadingFalse();
    if (res && res.status) {
      if (res.status === 500) {
        this.setState({ errorRegisteringAccount: true, serverErrors: res.data.error });
      } else if (res.status === 422) {
        this.setState({ errorRegisteringAccount: true, serverErrors: res.data.error });
      } else if (res.status === 201 || res.status === 200) {
        // save to local storage
        localStorage.setItem('token', res.data.token);
        this.props.userHasAuthenticated(true);
        this.props.history.push('/profile/');
      }
    }
  };

  closeAlert = () => {
    this.setState({ successRegisteringAccount: false, errorRegisteringAccount: false });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="registration">
        <Form onSubmit={this.handleSubmit} id="registration-form">
          <h2 className="header-text">Complete signup</h2>
          <p>It’s easy to get started!</p>
          <Row gutter={16}>
            <Col sm={24} md={12}>
              <FormItem>
                {getFieldDecorator('firstName', {
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: 'Please fill in your first name',
                    },
                  ],
                })(<Input placeholder="First Name" />)}
              </FormItem>
            </Col>
            <Col sm={24} md={12}>
              <FormItem>
                {getFieldDecorator('lastName', {
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: 'Please fill in your last name',
                    },
                  ],
                })(<Input placeholder="Last Name" />)}
              </FormItem>
            </Col>
            <Col md={24}>
              <FormItem>
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
                })(<Input placeholder="email" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col sm={24} md={12}>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input type="password" placeholder="password" />)}
              </FormItem>
            </Col>
            <Col sm={12} md={12}>
              <FormItem>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input type="password" onBlur={this.handleConfirmBlur} placeholder="Confirm Password" />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem>
              {getFieldDecorator('agreement', {
                rules: [
                  {
                    required: true,
                    message: 'Please agree to our term of service',
                  },
                ],
                valuePropName: 'checked',
              })(
                <Checkbox>
                  Agree to <a href="/terms-and-conditions">terms and conditions</a>
                </Checkbox>
              )}
            </FormItem>
          </Row>
          <Row>
            <Col span={24}>
              {this.state.successRegisteringAccount && (
                <Alert
                  message={this.state.serverSuccess}
                  type="success"
                  closable
                  afterClose={this.closeAlert}
                  showIcon
                />
              )}
              {this.state.errorRegisteringAccount && (
                <Alert message={this.state.serverErrors} type="error" closable afterClose={this.closeAlert} showIcon />
              )}
            </Col>
          </Row>
          <FormItem>
            <Button className="link lg blue" loading={this.state.loading} htmlType="submit">
              Lets Go!
            </Button>
          </FormItem>

          <div className="sign-in">
            Already have an account? <a href="/sign-in">Sign In</a>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(RegistrationForm);
