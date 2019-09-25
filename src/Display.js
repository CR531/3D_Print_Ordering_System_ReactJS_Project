import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

class Display extends Component {

    constructor(props) {
        super(props);
        this.state = { business: [] };
    }
    componentDidMount() {
        axios.get('http://localhost:4000/business')
            .then(response => {
                this.setState({ business: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    tabRow() {
        return this.state.business.map(function (object, i) {
            return <TableRow obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">Business List</h3>
                {true && console.log("Hello : " + this.state.business.length)}
                {this.state.business.length > 0 &&
                    this.state.business[0] &&
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Person</th>
                                <th>Business</th>
                                <th>GST Number</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.tabRow()}
                        </tbody>
                    </table>
                }
                {this.state.business.map((listValue, index) => {
                    return (
                        <table className="table table-striped" style={{ marginTop: 20 }}>
                            <tbody>
                                <tr key={index}>
                                    <td>{listValue.person_name}</td>
                                    {/* <td>{listValue.title}</td> */}
                                    {/* <td>{listValue.price}</td> */}
                                </tr>
                            </tbody>
                        </table>
                    );
                })}
            </div>
        );
    }
}
export default Display;