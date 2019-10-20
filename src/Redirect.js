import React, { Component } from "react";

export class Redirect extends Component {
    constructor(props) {
        super();
        this.state = { ...props };
    }
    componentDidMount() {
        document.title = 'Estimate Cost';
    }
    componentWillMount() {
        window.location = "http://156.26.97.138/3Destimate/index.html";
    }
    render() {
        return (<section>Redirecting...</section>);
    }
}

export default Redirect;