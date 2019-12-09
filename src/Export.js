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
import Grid from '@material-ui/core/Grid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import clsx from 'clsx';
import ReactExport from 'react-data-export';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

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
    grid_margin: {
        marginBottom: "-1%",
        marginRight: "-5%"
    },
    get_orders_button_grid_margin: {
        marginLeft: "5%",
        marginBottom: "-1%",
        marginTop: "-0.5%",
    },
    export_button_grid_margin: {
        marginBottom: "-1%",
        marginTop: "-0.5%",
    },
    date_grid_margin: {
        marginLeft: "-2%",
        marginBottom: "-1%",
        // marginRight: "-5%",
    },
    date_instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    get_orders_label: {
        color: "white",
        background: "#3b3b3b"
    },
    card_data: {
        fontSize: "120%",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
        color: "black",
        textAlign: "left"
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: "500",
        fontSize: "large",
        fontVariant: "all-petite-caps",
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    close: {
        padding: theme.spacing(0.5),
    },
    card: {
        minWidth: 275,
        height: "55px",
    },
    main_card: {
        width: "100%",
    },
});


class Export extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            start_date: null,
            end_date: null,
            sorted_Orders: [],
            required_snackbar: false,
            no_of_records: 0,
            dataset: [],
            converted_array: []
        }
    }
    async componentDidMount() {
        document.title = 'Export Data';
        await axios.get('http://localhost:4000/printOrder')
            .then(response => {
                this.setState({ ...this.state, orders: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    handleStartDateChange = async (date) => {
        await this.setState({ ...this.state, start_date: date });
    }
    handleEndDateChange = async (date) => {
        await this.setState({ ...this.state, end_date: date });
    }
    handleRequiredSnackbarClose = () => {
        this.setState({ ...this.state, required_snackbar: false })
    }
    getOrders = async () => {
        if (this.state.start_date === null || this.state.end_date === null) {
            await this.setState({ ...this.state, required_snackbar: true });
        }
        var sd = new Date(this.state.start_date);
        var ed = new Date(this.state.end_date);
        const myList = [];
        var x = 0;
        if (this.state.orders) {
            if (this.state.orders.length > 0) {
                this.state.orders.map((value) => {
                    var spec_date = new Date(value.order_date);
                    if ((spec_date >= sd) && (spec_date <= ed)) {
                        if (value.job_completed_check === true && value.job_delivered_check === true) {
                            x = x + 1;
                            myList.push(value);
                        }
                    }
                    return myList;
                })
            }
        }
        await this.setState({ ...this.state, sorted_Orders: myList, no_of_records: x });
        let globalArray = [];
        if (this.state.sorted_Orders) {
            if (this.state.sorted_Orders.length > 0) {
                this.state.sorted_Orders.map(listValue => {
                    let arr = [];
                    arr.push((listValue.name !== "") ? listValue.name : "N/A");
                    arr.push((listValue.receipt_number !== "") ? listValue.receipt_number : "N/A");
                    arr.push((listValue.filament_color !== "") ? listValue.filament_color : "N/A");
                    arr.push((listValue.grams_used !== "") ? listValue.grams_used : "N/A");
                    arr.push((listValue.amount_due !== "") ? listValue.amount_due : "N/A");
                    if (listValue.grams_used !== "") {
                        let tempString = listValue.grams_used.toString();
                        let tempVal = parseFloat(tempString);
                        arr.push(tempVal * (0.055));
                    } else {
                        arr.push("N/A");
                    }
                    if (listValue.job_delivered_check === true) {
                        arr.push("Delivered");
                    }
                    else {
                        arr.push("Not Delivered");
                    }
                    globalArray.push(arr);
                    return globalArray;
                })
            }
        }
        console.log("global array is :" + globalArray);
        await this.setState({ ...this.state, converted_array: globalArray })
        let sample_dataset = [{
            columns: [
                { title: "Name", width: { wch: 30 } },
                { title: "Receipt Number #", width: { wch: 25 } },
                { title: "Material Color", width: { wch: 20 } },
                { title: "Weight (g)", width: { wch: 10 } },
                { title: "Cost ($)", width: { wch: 10 } },
                { title: "Material Cost ($)", width: { wch: 15 } },
                { title: "Delivered Status", width: { wch: 20 } },
            ],
            data: this.state.converted_array
        }]
        await this.setState({ ...this.state, dataset: sample_dataset })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} style={{ "marginBottom": "2%" }}>
                <Typography className={classes.main_heading}><b>Export Data</b></Typography>
                <br />
                <Paper className={classes.root} style={{ "marginBottom": "0.5%" }}>
                    <div>
                        <Card className={classes.main_card}>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} className={classes.grid_margin}>
                                        <Typography className={classes.tableHeading}><b>Display Orders by dates :</b></Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3} className={classes.grid_margin} style={{ "marginLeft": "2%" }}>
                                        <Typography style={{ "marginTop": "-2%" }} className={classes.tableHeading}><b>Start Date :</b></Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3} className={classes.date_grid_margin}>
                                        <DatePicker
                                            id="start_date"
                                            placeholderText="mm/dd/yyyy"
                                            selected={this.state.start_date}
                                            onChange={this.handleStartDateChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} className={classes.date_grid_margin}>
                                    </Grid>
                                    <Grid item xs={12} sm={3} className={classes.grid_margin} style={{ "marginLeft": "2%" }}>
                                        <Typography style={{ "marginTop": "-2%" }} className={classes.tableHeading}><b>End Date :</b></Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3} className={classes.date_grid_margin}>
                                        <DatePicker
                                            id="end_date"
                                            placeholderText="mm/dd/yyyy"
                                            selected={this.state.end_date}
                                            onChange={this.handleEndDateChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3} className={classes.get_orders_button_grid_margin}>
                                        <Button size="small" variant="contained" color="#3b3b3b" className={classes.get_orders_label}
                                            onClick={() => this.getOrders()}
                                        >
                                            Get Orders
                                    </Button>
                                    </Grid>
                                    {(this.state.no_of_records && this.state.no_of_records > 0) ?
                                        <Grid item xs={12} sm={3} className={classes.export_button_grid_margin}>
                                            <ExcelFile
                                                filename="3D_Print_Orders"
                                                element={<Button size="small" variant="contained" color="#3b3b3b" className={classes.get_orders_label}
                                                >
                                                    Generate File
                                    </Button>}>
                                                <ExcelSheet
                                                    name="3d Printing Details"
                                                    dataSet={(this.state.dataset && this.state.dataset.length > 0) ? this.state.dataset : []}
                                                />
                                            </ExcelFile>
                                        </Grid> : <Grid item xs={12} sm={3} className={classes.export_button_grid_margin}></Grid>}
                                </Grid>
                            </CardContent>
                        </Card>
                    </div>
                </Paper>
                <Paper className={classes.root} style={{ "marginBottom": "0.5%" }}>
                    <div>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.card_data} color="textSecondary" gutterBottom>
                                    {this.state.no_of_records} records Found
                                    </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Paper>
                {this.state.sorted_Orders &&
                    this.state.sorted_Orders.length > 0 &&
                    <Paper className={classes.root} style={{ "marginBottom": "1%" }}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead style={{ "background": "lightgrey" }}>
                                <TableRow>
                                    <TableCell ><Typography className={classes.tableHeading}>Name </Typography></TableCell>
                                    <TableCell align="right"><Typography className={classes.tableHeading}>Wsu ID </Typography></TableCell>
                                    <TableCell align="right"><Typography className={classes.tableHeading}>Order Date </Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.sorted_Orders.map((listValue, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            <Typography className={classes.dataHeading}>{(listValue.name && listValue.name !== "") ? listValue.name : "N/A"} </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className={classes.dataHeading}>{(listValue.wsuid && listValue.wsuid !== "") ? listValue.wsuid : "N/A"} </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className={classes.dataHeading}>
                                                {(listValue.order_date && listValue.order_date !== null) ? listValue.order_date.toString().split("T")[0] : "N/A"}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                }
                <Snackbar
                    open={this.state.required_snackbar}
                    onClose={() => this.handleRequiredSnackbarClose()}
                    autoHideDuration={3000}
                >
                    <SnackbarContent
                        style={{ "background": "black" }}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className={classes.message}>
                                <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
                                Please Enter the Date Fields
                            </span>
                        }
                        action={[
                            <IconButton
                                key="close"
                                aria-label="close"
                                color="inherit"
                                className={classes.close}
                                onClick={() => this.handleRequiredSnackbarClose()}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
            </div>
        );
    }
}
export default withStyles(styles)(Export);