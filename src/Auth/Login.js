import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { withFormik } from 'formik';
import './Login.scss';
import LogoImage from './logo-white.png';
import { Link } from 'react-router-dom';

const InnerForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  }) => (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <TextField
            type="email"
            name="email"
            hintText="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="form-input"
        />
      </div>
      <div>
        <TextField
            type="password"
            name="password"
            hintText="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className="form-input"
        />
      </div>
      <RaisedButton
        label="Login"
        type="submit"
        disabled={isSubmitting} 
        backgroundColor="#0CCE6B"
        labelColor="#FFFFFF"
        className="form-submit"/>
    </form>
);

const MyForm = withFormik({
    // Transform outer props into form values
    mapPropsToValues: props => ({ email: '', password: '' }),
    // Add a custom validation function (this can be async too!)
    validate: (values, props) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    // Submission handler
    handleSubmit: (
      values,
      {
        props,
        setSubmitting,
        setErrors /* setValues, setStatus, and other goodies */,
      }
    ) => {
    //   LoginToMyApp(values).then(
    //     user => {
    //       setSubmitting(false);
    //       // do whatevs...
    //       // props.updateUser(user)
    //     },
    //     errors => {
    //       setSubmitting(false);
    //       // Maybe even transform your API's errors into the same shape as Formik's!
    //       setErrors(transformMyApiErrors(errors));
    //     }
    //   );
    },
  })(InnerForm);

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {}
    }
    
    render() {
        return (
            <section className="hero is-fullheight hero-container">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <img src={LogoImage} className="logo-image" />
                            <Card>
                                <CardText>
                                    <MyForm />
                                </CardText>
                            </Card>
                            <div className="register-link-container">
                                <Link to="/register"  className="register-link">Create new account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Login;