import Login from './Auth/Login';
import Register from './Auth/Register';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
    }
];

export default routes