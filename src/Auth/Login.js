import React, {Component} from 'react';
import Card, { CardActions, CardContent } from 'material-ui-next/Card';
import Button from 'material-ui-next/Button';
import TextField from 'material-ui-next/TextField';
import { withFormik } from 'formik';
import './Login.scss';
import LogoImage from './logo-white.png';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Select from 'material-ui-next/Select';
import { MenuItem, MenuList } from 'material-ui-next/Menu';
import { Route, Redirect } from 'react-router';
import { FormControl, FormHelperText } from 'material-ui-next/Form';
import Input, { InputLabel } from 'material-ui-next/Input';
import { withStyles } from 'material-ui-next/styles';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    }
});

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
          label="Password"
          className="form-input"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          margin="normal"
          type="password"
          name="password"
        />
      </div>
      <Button
        type="submit"
        variant="raised"
        className="form-submit">
        Login
        </Button>
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
    handleChange = (event) => {
        this.props.onChange('email', event.target.value)
    }

    render() {
        return (
            <FormControl>
                <InputLabel htmlFor="email-select">Email</InputLabel>
                <Select
                    value={this.props.value}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'email',
                        id: 'email-select',
                    }}
                >
                {
                    this.props.items.map((item) => {
                        return <MenuItem value={item} key={item}>{item}</MenuItem>
                    })
                }
                </Select>
            </FormControl>
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
                                <CardContent>
                                    {
                                        this.store.users.length > 0 ? <MyForm store={this.store}/> : null
                                    }
                                </CardContent>
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

export default withStyles(styles)(inject(['auth'])(observer(Login)));