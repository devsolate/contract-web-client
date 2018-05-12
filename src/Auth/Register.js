import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Route, Redirect } from 'react-router'
import { withFormik } from 'formik';
import './Register.scss';
import LogoImage from './logo-white.png';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

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
            type="name"
            name="name"
            hintText="Full Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className="form-input"
        />
        </div>
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
        label="Register"
        type="submit"
        disabled={isSubmitting} 
        backgroundColor="#0CCE6B"
        labelColor="#FFFFFF"
        className="form-submit"/>
    </form>
);

const MyForm = withFormik({
    mapPropsToValues: props => ({ email: '', password: '', name: '' }),
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
    handleSubmit: (
      values,
      {
        props,
        setSubmitting,
        setErrors,
      }
    ) => {
        props.store.callApi(values)
    },
  })(InnerForm);

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {}
        this.store = props.register;
    }
    
    render() {
        if (this.store.isRegisterSuccess) {
            return <Redirect to='/login'/>;
        }

        return (
            <section className="hero is-fullheight hero-container">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <img src={LogoImage} className="logo-image" alt="Logo" />
                            <Card>
                                <CardText>
                                    <MyForm store={this.store}/>
                                    {
                                        this.store.isLoading ? <RefreshIndicator
                                            size={70}
                                            left={0}
                                            top={0}
                                            status="loading"
                                        /> : null
                                    }
                                </CardText>
                            </Card>
                            <div className="register-link-container">
                                <Link to="/login"  className="register-link">Already have account? Sign-in</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default inject(['register'])(observer(Register));;