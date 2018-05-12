import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { withFormik } from 'formik';
import './Login.scss';
import LogoImage from './logo-white.png';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Route, Redirect } from 'react-router';

const InnerForm = (props) => {
    const {
        store,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue
    } = props
    return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <SelectComponent
            value={values.email}
            onChange={setFieldValue}
            items={store.users}
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
)
};

const MyForm = withFormik({
    mapPropsToValues: props => {
        return ({ email: '', password: '' })
    },
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
        props.store.auth(values)
    },
  })(InnerForm);

class SelectComponent extends Component {
    handleChange = (event, index, value) => {
        this.props.onChange('email', value)
    }

    render() {
        return (
            <SelectField
                floatingLabelText="Email"
                value={this.props.value}
                onChange={this.handleChange}
                style={{
                    fullWidth: true
                }}
                labelStyle={{
                    textAlign: 'left'
                }}
                selectedMenuItemStyle={{
                    textAlign: 'left'
                }}
                menuItemStyle={{
                    textAlign: 'left'
                }}
                floatingLabelStyle={{
                    left: '0'
                }}
            >
                {
                    this.props.items.map((item) => {

                        return <MenuItem value={item}
                            primaryText={item}
                            key={item} 
                            insetChildren={true}/>
                    })
                }
            </SelectField>
        )
    }
}

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {}
        this.store = props.auth;
    }

    componentDidMount() {
        this.store.getUsers()
    }
    
    render() {
        if(this.store.isRequireRegister) {
            return <Redirect to='/register'/>;
        }

        if(this.store.isAuthorized) {
            return <Redirect to='/'/>;
        }
        return (
            <section className="hero is-fullheight hero-container">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <img src={LogoImage} className="logo-image" alt="Logo" />
                            <Card>
                                <CardText>
                                    {
                                        this.store.users.length > 0 ? <MyForm store={this.store}/> : null
                                    }
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

export default inject(['auth'])(observer(Login));;