import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Alert } from 'antd';
import Network from '../services/network';
const FormItem = Form.Item;

class ForgotPassword extends React.Component {
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
        const user = { email: values.email };

        this.loadingTrue();
        Network.post('/reset-password', user, this.networkResponse);
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
      if (res.status > 400) {
        this.setState({ errorSigningIn: true, serverErrors: 'Sorry that email was not found.' });
      } else if (res.status === 201 || res.status === 200) {
        this.setState({
          successfulSignin: true,
          errorSigningIn: false,
          serverSuccess: 'Reset email has been sent',
        });
      }
    }
  };

  closeAlert = () => {
    this.setState({ successfulSignin: false, errorSigningIn: false });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="reset-password">
        <h2 className="header-text">Reset Password</h2>
        <Col>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('email', {
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
              <Button className="link blue" loading={this.state.loading} htmlType="submit">
                Reset
              </Button>
              <br />
              <Link to="/sign-in">Nevermind</Link>.
            </FormItem>
          </Form>
        </Col>
      </div>
    );
  }
}

export default Form.create()(ForgotPassword);
