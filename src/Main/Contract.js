
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import AppBar from 'material-ui-next/AppBar';
import { inject, observer } from 'mobx-react';
class Contract extends Component {
    
    constructor(props) {
        super(props);

        this.state = {}
        this.store = props.contract;
    }

    render() {
        return (
            <div>
                Contract
            </div>
        )
    }
};

export default inject(['contract'])(observer(Contract));;