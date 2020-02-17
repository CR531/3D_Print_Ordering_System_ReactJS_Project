import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import FormEdit from "./FormEdit";
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const styles = theme => ({
    root: {
        width: '91%',
        marginLeft: "4%",
        marginRight: "4%",
        marginTop: "3%",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    main_heading: {
        fontSize: "x-large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
    },
    secondaryHeading: {
        fontSize: "large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
        color: "gray",
    },
    dataHeading: {
        fontSize: "large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
        color: "black",
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
        marginTop: "1%",
        marginBottom: "-2%",
    },
    column: {
        flexBasis: '33.33%',
    },
    column1: {
        flexBasis: '33.33%',
        marginBottom: "-1%"
    },
    column2: {
        flexBasis: '50%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    chip1: {
        margin: theme.spacing(1),
        width: "150%",
        backgroundColor: "green",
        color: "white",

    },
    chip2: {
        margin: theme.spacing(1),
        width: "150%",
        background: "rgba(255, 194, 23, 0.95)",
    },
    chip_css: {
        marginTop: "-3%",
    },
    card: {
        minWidth: 275,
    },
    card_data: {
        fontSize: "120%",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
        color: "black",
        textAlign: "center"
    },
    openOrderLabel: {
        color: "white",
        background: "#3b3b3b"
    },
    deleteOrderLabel: {
        left: 0,
        marginLeft: "3%",
        position: "absolute"
    },
    delete_dialog_header_css: {
        background: "rgba(255, 194, 23, 0.95)",
    },
});

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chipStatus: false,
            active_index: -1,
            open_Dialog: false,
            open_Delete_Dialog: false,
            open_Delete_status_Dialog: false,
            delete_Order: null,
            selected_Order: {},
            orders: [],
            sorted_data: [],
            delete_response: {}
        }
    }

    async componentDidMount() {
        document.title = 'Orders';
        await axios.get('http://localhost:4000/printOrder')
            .then(response => {
                this.setState({ ...this.state, orders: response.data, sorted_data: response.data });
                console.log(this.state.orders);
            })
            .catch(function (error) {
                console.log(error);
            })
        function sort_by_key(array, key) {
            return array.sort(function (a, b) {
                var x = a[key]; var y = b[key];
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }
        this.setState({ ...this.state, sorted_data: sort_by_key(this.state.sorted_data, 'id') })
    }
    handleExpChange = (index) => {
        this.setState({ ...this.state, active_index: this.state.active_index === index ? -1 : index })
        console.log("Expanded panel is :" + this.state.active_index)
    }
    handleOrderOpen1 = async (list, val) => {
        const type = list.find(el => el.id === val);
        await this.setState({ ...this.state, selected_Order: type });
        this.handleOrderOpen();
    }
    handleOrderOpen = async (val) => {
        await this.setState({ ...this.state, open_Dialog: true });
    }
    handleOrderDelete = async () => {
        await this.setState({ ...this.state, open_Delete_Dialog: false })
        console.log("We are deleting order " + this.state.delete_Order);
        await axios.get('http://localhost:4000/printOrder/delete/' + this.state.delete_Order)

            .then((res) => {
                this.setState({ delete_response: res.data });
                console.log("response is :" + this.state.delete_response);
            })
            .catch(err => console.log(err))
        await this.setState({ ...this.state, open_Delete_Dialog: false, open_Delete_status_Dialog: true });
    }
    dialog_close = (value) => {
        this.setState({ ...this.state, open_Dialog: value })
    }
    handleDeleteDialogClose = () => {
        this.setState({ ...this.state, open_Delete_Dialog: false })
    }
    handleDeleteStatusDialogClose = () => {
        this.setState({ ...this.state, open_Delete_Dialog: false, open_Delete_status_Dialog: false });
        window.location.reload(false);
    }
    filterData = (e) => {
        var x = -1;
        const updatedList = this.state.orders.filter(item => {
            if (((item.name.toString().toLowerCase().search(e.target.value.toString().toLowerCase())) === 0)
                || ((item.receipt_number.search(e.target.value) === 0))
                || ((item.status.toString().toLowerCase().search(e.target.value.toString().toLowerCase())) === 0)
                || ((item.wsuid.toString().toLowerCase().search(e.target.value.toString().toLowerCase()) === 0))) {
                console.log("Either Name or Receipt number or WSU ID Matched");
                x = 0;
            } else {
                x = -1;
            }
            return (
                x !== -1
            );
        });

        this.setState({ ...this.state, sorted_data: updatedList });
    };
    render() {
        const { classes } = this.props;
        return (

            <div style={{ "marginBottom": "2%" }}>
                {this.state.open_Delete_status_Dialog &&
                    <Dialog
                        className={classes.main_heading}
                        open={true}
                        onClose={() => this.handleDeleteStatusDialogClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle className={classes.delete_dialog_header_css} id="alert-dialog-title">{"Delete Status"}</DialogTitle>
                        <Divider />
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" style={{ "color": "black" }}>
                                <br />
                                {(this.state.delete_response === "delete_success")
                                    ? "You have successfully deleted the 3d print order data."
                                    : "Unable to delete the 3d print order data. Please try again."}
                            </DialogContentText>
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <Button onClick={() => this.handleDeleteStatusDialogClose()} color="primary" autoFocus>Close</Button>
                        </DialogActions>
                    </Dialog>
                }
                {this.state.open_Delete_Dialog &&
                    <Dialog
                        className={classes.main_heading}
                        open={true}
                        onClose={() => this.handleDeleteDialogClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle className={classes.delete_dialog_header_css} id="alert-dialog-title">{"Delete Order"}</DialogTitle>
                        <Divider />
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" style={{ "color": "black" }}>
                                <br />
                                {"Are you sure to delete the specific 3d print order?"}
                            </DialogContentText>
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <Button onClick={() => this.handleDeleteDialogClose()} color="primary" autoFocus>Close</Button>
                            <Button onClick={() => this.handleOrderDelete()} color="primary" autoFocus>Delete</Button>
                        </DialogActions>
                    </Dialog>
                }
                {this.state.open_Dialog && <div>
                    <FormEdit
                        open_Dialog={this.state.open_Dialog}
                        selected_Order={this.state.selected_Order}
                        onDialogClose={this.dialog_close}
                    />
                </div>}
                {!(this.state.open_Dialog) &&
                    <div className={classes.root} >
                        <Typography className={classes.main_heading}><b>Order History</b></Typography>
                        <br />
                        {this.state.orders &&
                            this.state.orders.length === 0 &&
                            <div>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography className={classes.card_data} color="textSecondary" gutterBottom>
                                            There are no Orders
                                    </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        }
                        {this.state.orders &&
                            this.state.orders.length > 0 &&
                            <TextField
                                id="search"
                                label="Search...."
                                placeholder="Name, Status, Wsu ID, Receipt Number"
                                style={{ "width": "98%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={(value) => this.filterData(value)}
                            />
                        }
                        {this.state.sorted_data &&
                            this.state.sorted_data.length > 0 &&
                            this.state.sorted_data.map((listValue, index) => {
                                var cd_date = new Date(listValue.job_completion_date);
                                var dd_date = new Date(listValue.job_delivery_date);
                                return (
                                    <ExpansionPanel expanded={this.state.active_index === index}
                                        onChange={() => this.handleExpChange(index)}
                                    >
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            id={index}
                                            style={{ "background": "lightgrey" }}
                                        >
                                            <div className={classes.column1}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={3}>
                                                        <Typography className={classes.secondaryHeading}>Name : </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={9}>
                                                        <Typography className={classes.dataHeading}>{(listValue.name && listValue.name !== "") ? listValue.name : "N/A"} </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className={classes.column1}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={4}>
                                                        <Typography className={classes.secondaryHeading}>Receipt # </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={8}>
                                                        <Typography className={classes.dataHeading}>{(listValue.receipt_number && listValue.receipt_number !== "") ? listValue.receipt_number : "N/A"} </Typography>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className={classes.column1}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={3}>
                                                        <Typography className={classes.secondaryHeading}>Status : </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={3} className={classes.chip_css}>
                                                        {(listValue.status === "Done") ? <Chip label="Done" className={classes.chip1} />
                                                            : <Chip label="Pending" className={classes.chip2} />}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </ExpansionPanelSummary>
                                        <Divider />
                                        <ExpansionPanelDetails className={classes.details}>
                                            <div className={classes.column2}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={classes.secondaryHeading}>Job Completed by : </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={classes.dataHeading}>{(listValue.job_completed_GA && listValue.job_completed_GA !== "") ? listValue.job_completed_GA : "N/A"}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className={classes.column2}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={classes.secondaryHeading}>Job Completion Date : </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        {(listValue.job_completion_date && listValue.job_completion_date !== null) &&
                                                            console.log("the fault date is :" + listValue.job_completion_date.toString())
                                                        }
                                                        <Typography className={classes.dataHeading}>{
                                                            (listValue.job_completion_date && listValue.job_completion_date !== null && cd_date && cd_date !== null)
                                                                ? (cd_date.getMonth() + 1).toString() + "-" + cd_date.getDate().toString() + "-" + cd_date.getFullYear().toString()
                                                                : "N/A"
                                                        }</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </ExpansionPanelDetails>
                                        <ExpansionPanelDetails className={classes.details}>
                                            <div className={classes.column2}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={classes.secondaryHeading}>Job Delivered by : </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={classes.dataHeading}>{(listValue.job_delivered_GA && listValue.job_delivered_GA !== "") ? listValue.job_delivered_GA : "N/A"} </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <div className={classes.column2}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={classes.secondaryHeading}>Job Delivery Date : </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography className={classes.dataHeading}>
                                                            {
                                                                (listValue.job_delivery_date && listValue.job_delivery_date !== null && dd_date && dd_date !== null)
                                                                    ? (dd_date.getMonth() + 1).toString() + "-" + dd_date.getDate().toString() + "-" + dd_date.getFullYear().toString()
                                                                    : "N/A"
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </ExpansionPanelDetails>
                                        <Divider />
                                        <ExpansionPanelActions>
                                            <Button size="small" className={classes.deleteOrderLabel} onClick={() => this.setState({ ...this.state, open_Delete_Dialog: true, delete_Order: listValue._id })}><DeleteIcon />Delete</Button>
                                            <Button size="small" onClick={() => this.handleExpChange()}>Cancel</Button>
                                            <Button size="small" variant="contained" color="#3b3b3b" className={classes.openOrderLabel} onClick={() => this.handleOrderOpen1(this.state.orders, listValue.id)}>
                                                Open Order
                                    </Button>
                                        </ExpansionPanelActions>
                                    </ExpansionPanel>
                                );
                            })}
                    </div >
                }</div>
        );
    }
}
export default withStyles(styles)(Orders);