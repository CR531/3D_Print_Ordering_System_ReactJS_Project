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

const styles = theme => ({
    root: {
        width: '91%',
        marginLeft: "4%",
        marginRight: "4%",
        marginTop: "3%",
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
        backgroundColor: "#FFFF66"
    },
    chip_css: {
        marginTop: "-3%",
    }
});

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chipStatus: false,
            active_index: -1,
            orders: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/printOrder')
            .then(response => {
                this.setState({ orders: response.data });
                console.log(this.state.orders);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    handleExpChange = (index) => {
        this.setState({ ...this.state, active_index: this.state.active_index === index ? -1 : index })
        console.log("Expanded panel is :" + this.state.active_index)
    }
    handleOrderOpen = () => {
        console.log("We are in Order open");
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.root} >
                    <Typography className={classes.main_heading}><b>Order History</b></Typography>
                    <br />
                    {this.state.orders.map((listValue, index) => {
                        return (
                            <ExpansionPanel expanded={this.state.active_index === index}
                                onChange={() => this.handleExpChange(index)}
                            >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    id={index}
                                >
                                    <div className={classes.column1}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={3}>
                                                <Typography className={classes.secondaryHeading}>Name : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={9}>
                                                <Typography className={classes.dataHeading}>{listValue.name} </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.column1}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={4}>
                                                <Typography className={classes.secondaryHeading}>Receipt # </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <Typography className={classes.dataHeading}>{listValue.receipt_number} </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={classes.column1}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={3}>
                                                <Typography className={classes.secondaryHeading}>Status : </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={3} className={classes.chip_css}>
                                                {(listValue.job_completed_check && listValue.job_delivered_check) ? <Chip label="Done" className={classes.chip1} />
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
                                                <Typography className={classes.dataHeading}>{listValue.job_completed_GA}</Typography>
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
                                                <Typography className={classes.dataHeading}>{listValue.job_completion_date}</Typography>
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
                                                <Typography className={classes.dataHeading}>{listValue.job_delivered_GA} </Typography>
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
                                                <Typography className={classes.dataHeading}>{listValue.job_delivery_date}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </ExpansionPanelDetails>
                                <Divider />
                                <ExpansionPanelActions>
                                    <Button size="small" onClick={() => this.handleExpChange()}>Cancel</Button>
                                    <Button size="small" color="primary" onClick={() => this.handleOrderOpen()}>
                                        Open Order
                                    </Button>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                        );
                    })}
                </div >
            </div>
        );
    }
}
export default withStyles(styles)(Orders);