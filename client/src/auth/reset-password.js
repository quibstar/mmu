import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Alert } from 'antd';
import Network from '../services/network';
const FormItem = Form.Item;

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      successSubmitting: false,
      errorSubmitting: false,
      serverErrors: '',
      serverSuccess: '',
      token: null,
    };
  }

  componentDidMount() {
    var token = this.props.match.params.id;
    this.setState({ token });
    document.body.classList.add('session');
  }

  componentWillUnmount() {
    document.body.classList.remove('session');
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.state.token !== null) {
        var user = {
          token: this.state.token,
          password: values.password,
        };
        Network.post('/reset-password-confirm', user, this.networkResponse);
      }
    });
  };

  // network stuff
  loadingTrue = () => {
    this.setState({ loading: true });
  };
  loadingFalse = () => {
    this.setState({ loading: false });
  };

  networkResponse = res => {
    this.loadingFalse();
    if (res.status) {
      if (res.status === 500) {
        this.setState({ errorSubmitting: true, serverErrors: res.data.error });
      } else if (res.status >= 400) {
        this.setState({ errorSubmitting: true, serverErrors: res.data.error });
      } else if (res.status === 201 || res.status === 200) {
        // save to local storage
        localStorage.setItem('token', res.data.token);
        this.props.userHasAuthenticated(true);
      }
    }
  };
  closeAlert = () => {
    this.setState({ successSubmitting: false, errorSubmitting: false });
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
      <div id="reset-password">
        <h2 className="header-text">Reset Password</h2>

        <Col>
          <Form onSubmit={this.handleSubmit} id="password-reset-form">
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

            <Row>
              <FormItem>
                <Col span={24}>
                  {this.state.successSubmitting && (
                    <Alert
                      message={this.state.serverSuccess}
                      type="success"
                      closable
                      afterClose={this.closeAlert}
                      showIcon
                    />
                  )}
                  {this.state.errorSubmitting && (
                    <Alert
                      message={this.state.serverErrors}
                      type="error"
                      closable
                      afterClose={this.closeAlert}
                      showIcon
                    />
                  )}
                </Col>
              </FormItem>
            </Row>
            <FormItem>
              <Button className="link lg blue" loading={this.state.loading} htmlType="submit">
                Reset
              </Button>
            </FormItem>
          </Form>
        </Col>
      </div>
    );
  }
}

export default Form.create()(ResetPassword);
