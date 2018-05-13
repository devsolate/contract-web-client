import Login from './Auth/Login';
import Register from './Auth/Register';
import Main from './Main/Main';
import Contract from './Main/Contract';
import NewContract from './Main/NewContract';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
console.log(Login)

const routes = [
    {
      path: "/register",
      exact: true,
      component: Register
    },
    {
      path: "/login",
      exact: true,
      component: Login
    },
    {
      path: "/",
      component: Main,
      routes: [
        {
          path: "/create",
          exact: true,
          component: NewContract
        },
        {
          path: "/",
          component: Contract
        }
      ]
    }
];

export default routes