import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col, Alert } from 'antd';
import Network from '../services/network';
const FormItem = Form.Item;

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      successfulSignin: false,
      errorSigningIn: false,
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const user = { email: values.email, password: values.password };
        this.loadingTrue();
        Network.post('/signin', user, this.networkResponse);
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
      if (res.status === 401) {
        this.setState({ errorSigningIn: true, serverErrors: 'Please check your email and password' });
      } else if (res.status === 201 || res.status === 200) {
        // save to local storage
        localStorage.setItem('token', res.data.token);
        this.props.userHasAuthenticated(true);
      }
    }
  };

  closeAlert = () => {
    this.setState({ successfulSignin: false, errorSigningIn: false });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="signin">
        <h2 className="header-text">Sign In</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
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
            })(<Input placeholder="Email" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Row>
              <Col>
                {this.state.successfulSignin && (
                  <Alert
                    message={this.state.serverSuccess}
                    type="success"
                    closable
                    afterClose={this.closeAlert}
                    showIcon
                  />
                )}
                {this.state.errorSigningIn && (
                  <Alert
                    message={this.state.serverErrors}
                    type="error"
                    closable
                    afterClose={this.closeAlert}
                    showIcon
                  />
                )}
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button className="link lg blue" loading={this.state.loading} htmlType="submit">
              Sign in
            </Button>
            <br />
            <Link className="login-form-forgot" to="/forgot-password">
              Forgot password?
            </Link>
            <br />
            Don't have an account?{' '}
            <Link className="register" to="/register">
              Sign up!
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(SignIn);
