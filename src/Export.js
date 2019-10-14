import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const styles = theme => ({
    root: {
        width: '91%',
        marginLeft: "4%",
        marginRight: "4%",
        marginTop: "3%",
        overflowX: 'auto',
    },
    main_heading: {
        fontSize: "x-large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
    },
    table: {
        minWidth: 650,
    },
    tableHeading: {
        fontSize: "large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
        color: "Black",
    },
    dataHeading: {
        fontSize: "large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
        color: "dimgrey",
    },
});


class Export extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }
    async componentDidMount() {
        await axios.get('http://localhost:4000/printOrder')
            .then(response => {
                this.setState({ ...this.state, orders: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} style={{ "marginBottom": "2%" }}>
                <Typography className={classes.main_heading}><b>Export Data</b></Typography>
                <br />
                {this.state.orders &&
                    this.state.orders.length > 0 &&
                    <Paper className={classes.root}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell ><Typography className={classes.tableHeading}>Name </Typography></TableCell>
                                    <TableCell align="right"><Typography className={classes.tableHeading}>Wsu ID </Typography></TableCell>
                                    <TableCell align="right"><Typography className={classes.tableHeading}>Order Date </Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.orders.map((listValue, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            <Typography className={classes.dataHeading}>{listValue.name} </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className={classes.dataHeading}>{listValue.wsuid} </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className={classes.dataHeading}>{listValue.order_date} </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                }
            </div>
        );
    }
}
export default withStyles(styles)(Export);