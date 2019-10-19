import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
const styles = theme => ({
    root: {
        width: '90%',
    },
    close: {
        padding: theme.spacing(0.5),
    },
    main_heading: {
        fontSize: "x-large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
    },
    saved_heading: {
        fontSize: "large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
        color: "white",
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: "1%",
    },
    date_instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    stepper_buttons: {
        textAlign: "right",
    },
    form_css: {
        margin: "2% 2% 2% 10%",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    grid_margin: {
        marginBottom: "-2%",
    },
    column: {
        flexBasis: '33.33%',
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: "500",
        fontSize: "large",
        fontVariant: "all-petite-caps",
    },
    column2: {
        flexBasis: '50%',
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
    main_card: {
        width: "100%",
    },
});
class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: ['3D Print Request Form', '3D Print Statement', 'Remarks'],
            activeStep: 0,
            snackbarSuccessStatus: false,
            snackbarFailStatus: false,
            response: {},
            name: '',
            wsuid: '',
            phone: '',
            email: '',
            filament_color: '',
            notes: '',
            cspace_rep_name: '',
            order_date: null,
            grams_used: '',
            amount_due: '',
            pickup_date: null,
            receipt_number: '',
            remark_notes: '',
            job_completed_check: false,
            job_completed_GA: '',
            job_completion_date: null,
            job_delivered_check: false,
            job_delivered_GA: '',
            job_delivery_date: null,
            name_flag: false,
            wsuid_flag: false,
            email_flag: false,
            cspace_rep_flag: false,
            grams_used_flag: false,
            amount_due_flag: false,
            receipt_number_flag: false,
            required_snackbar: false
        }
    }

    onGenericChange = (e) => {
        this.setState({ ...this.state, [e.target.id]: e.target.value });
    }

    handleOrderDateChange = async (date) => {
        await this.setState({ ...this.state, order_date: date });
    }
    handlePickUpDateChange = async (date) => {
        await this.setState({ ...this.state, pickup_date: date });
    }
    handleCompletedDateChange = async (date) => {
        await this.setState({ ...this.state, job_completion_date: date });
    }
    handleDeliveredDateChange = async (date) => {
        await this.setState({ ...this.state, job_delivery_date: date });
    }

    handleSuccessSnackbarClose = async () => {
        await this.setState({ ...this.state, snackbarSuccessStatus: false })
    }
    handleFailSnackbarClose = async () => {
        await this.setState({ ...this.state, snackbarFailStatus: false })
    }
    handleRequiredSnackbarClose = async () => {
        await this.setState({ ...this.state, required_snackbar: false })
    }
    handleNext = async (x) => {
        if (this.state.activeStep === 0) {
            if (this.state.name === "" || this.state.wsuid === "" || this.state.email === "") {
                await this.setState({ ...this.state, required_snackbar: true });
            }
            if (this.state.name !== "" && this.state.wsuid !== "" && this.state.email !== "") {
                await this.setState({ ...this.state, required_snackbar: false });
                await this.setState({ activeStep: x + 1 });
            }
        }
        if (this.state.activeStep === 1) {
            if (this.state.cspace_rep_name === "" || this.state.grams_used === "" || this.state.amount_due === ""
                || this.state.receipt_number === "" || this.state.order_date === null || this.state.pickup_date === null) {
                await this.setState({ ...this.state, required_snackbar: true });
            }
            if (this.state.cspace_rep_name !== "" && this.state.grams_used !== "" && this.state.amount_due !== ""
                && this.state.receipt_number !== "" && this.state.order_date !== null && this.state.pickup_date !== null) {
                await this.setState({ ...this.state, required_snackbar: false });
                await this.setState({ activeStep: x + 1 });
            }
        }
        if (this.state.activeStep > 1) {
            await this.setState({ activeStep: x + 1 });
        }
    }
    handleBack = async (x) => {
        await this.setState({ activeStep: x - 1 });
    }
    wait = (ms) => {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }
    async componentDidMount() {
        await this.setState({
            ...this.state,
            steps: ['3D Print Request Form', '3D Print Statement', 'Remarks'],
            activeStep: 0,
            snackbarSuccessStatus: false,
            snackbarFailStatus: false,
            response: {},
            name: '',
            wsuid: '',
            phone: '',
            email: '',
            filament_color: '',
            notes: '',
            cspace_rep_name: '',
            order_date: null,
            grams_used: '',
            amount_due: '',
            pickup_date: null,
            receipt_number: '',
            remark_notes: '',
            job_completed_check: false,
            job_completed_GA: '',
            job_completion_date: null,
            job_delivered_check: false,
            job_delivered_GA: '',
            job_delivery_date: null,
            name_flag: false,
            wsuid_flag: false,
            email_flag: false,
            cspace_rep_flag: false,
            grams_used_flag: false,
            amount_due_flag: false,
            receipt_number_flag: false,
            required_snackbar: false
        })
        if (this.state.name === "") {
            await this.setState({ ...this.state, name_flag: true })
        }
        if (this.state.wsuid === "") {
            await this.setState({ ...this.state, wsuid_flag: true })
        }
        if (this.state.email === "") {
            await this.setState({ ...this.state, email_flag: true })
        }
        if (this.state.cspace_rep_name === "") {
            await this.setState({ ...this.state, cspace_rep_flag: true })
        }
        if (this.state.grams_used === "") {
            await this.setState({ ...this.state, grams_used_flag: true })
        }
        if (this.state.amount_due === "") {
            await this.setState({ ...this.state, amount_due_flag: true })
        }
        if (this.state.receipt_number === "") {
            await this.setState({ ...this.state, receipt_number_flag: true })
        }
    }

    handleSave = async () => {
        const obj = {
            name: this.state.name,
            wsuid: this.state.wsuid,
            phone: this.state.phone,
            email: this.state.email,
            filament_color: this.state.filament_color,
            notes: this.state.notes,
            cspace_rep_name: this.state.cspace_rep_name,
            order_date: this.state.order_date,
            grams_used: this.state.grams_used,
            amount_due: this.state.amount_due,
            pickup_date: this.state.pickup_date,
            receipt_number: this.state.receipt_number,
            remark_notes: this.state.remark_notes,
            job_completed_check: this.state.job_completed_check,
            job_completed_GA: this.state.job_completed_GA,
            job_completion_date: this.state.job_completion_date,
            job_delivered_check: this.state.job_delivered_check,
            job_delivered_GA: this.state.job_delivered_GA,
            job_delivery_date: this.state.job_delivery_date,
        }
        await axios.post('http://localhost:4000/printOrder/add', obj)
            .then((res) => {
                this.setState({ response: res.data });
                console.log("response is :" + this.state.response.printOrder);
            });
        if (this.state.response.printOrder === "printOrder in added successfully") {
            this.setState({ ...this.state, snackbarSuccessStatus: true })
            await this.wait(1000);
        }
        if (this.state.response.printOrder !== "printOrder in added successfully") {
            this.setState({ ...this.state, snackbarFailStatus: true })
            await this.wait(1000);
        }
        this.setState({
            ...this.state,
            activeStep: 0,
            response: {},
            name: '',
            wsuid: '',
            phone: '',
            email: '',
            filament_color: '',
            notes: '',
            cspace_rep_name: '',
            order_date: null,
            grams_used: '',
            amount_due: '',
            pickup_date: null,
            receipt_number: '',
            remark_notes: '',
            job_completed_check: false,
            job_completed_GA: '',
            job_completion_date: null,
            job_delivered_check: false,
            job_delivered_GA: '',
            job_delivery_date: null,
            name_flag: false,
            wsuid_flag: false,
            email_flag: false,
            cspace_rep_flag: false,
            grams_used_flag: false,
            amount_due_flag: false,
            receipt_number_flag: false,
            required_snackbar: false
        })
    }
    handleCompletedChange = () => {
        this.setState({
            ...this.state,
            job_completed_check: !(this.state.job_completed_check),
            job_delivered_check: (this.state.job_completed_check === false ? false : ""),
        });
    }
    handleDeliveredChange = () => {
        this.setState({
            ...this.state,
            job_delivered_check: !(this.state.job_delivered_check)
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} style={{ "marginBottom": "2%" }}>
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {this.state.steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {(this.state.activeStep === 0) && <div className={classes.form_css}>
                    <Typography variant="h6" gutterBottom className={classes.main_heading}>
                        Request Form
      </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} className={classes.grid_margin}>
                            <TextField
                                id="name"
                                label="Name"
                                placeholder="Name"
                                style={{ "width": "90%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                required={this.state.name_flag}
                                value={this.state.name}
                                onChange={(value) => this.onGenericChange(value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.grid_margin}>
                            <TextField
                                id="wsuid"
                                label="WSU ID"
                                placeholder="WSU ID"
                                style={{ "width": "80%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                required={this.state.wsuid_flag}
                                value={this.state.wsuid}
                                onChange={(value) => this.onGenericChange(value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.grid_margin}>
                            <TextField
                                id="phone"
                                label="Phone"
                                placeholder="Phone"
                                style={{ "width": "80%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.phone}
                                onChange={(event) => {
                                    if (event.target.value.length <= 10) {
                                        if (isNaN(Number(event.target.value))) {
                                            return;
                                        } else {
                                            this.setState({ ...this.state, phone: event.target.value });
                                        }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} className={classes.grid_margin}>
                            <TextField
                                id="email"
                                label="Email"
                                placeholder="Email"
                                style={{ "width": "90%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                required={this.state.email_flag}
                                value={this.state.email}
                                onChange={(value) => this.onGenericChange(value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} className={classes.grid_margin}>
                            <TextField
                                id="filament_color"
                                label="Filament Color"
                                placeholder="Filament Color"
                                style={{ "width": "90%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.filament_color}
                                onChange={(value) => this.onGenericChange(value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} className={classes.grid_margin}>
                            <Typography style={{ "width": "90%" }} className={classes.instructions}>Please provide details regarding desired size of the print object or any additional information for staff:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} style={{ "marginBottom": "-3%" }}>
                            <Typography style={{ "width": "90%" }} className={classes.instructions}>[Note : Maximum object size is 25.2 cm L x 19.9 cm W x 15.0 cm H (9.9 in x 7.8 in x 5.9 in)]</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} style={{ "marginBottom": "-3%" }}>
                            <TextField
                                id="notes"
                                multiline
                                rows="4"
                                style={{ "width": "90%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.notes}
                                onChange={(value) => this.onGenericChange(value)}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <br />

                </div>}
                {(this.state.activeStep === 1) && <div className={classes.form_css}>
                    <Typography variant="h6" gutterBottom>
                        3D Printing Statement
      </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} className={classes.grid_margin}>
                            <TextField
                                id="cspace_rep_name"
                                label="C-Space Representative"
                                placeholder="C-Space Representative"
                                style={{ "width": "80%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                required={this.state.cspace_rep_flag}
                                value={this.state.cspace_rep_name}
                                onChange={(value) => this.onGenericChange(value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.grid_margin}>
                            <Typography style={{ "width": "90%" }} className={classes.date_instructions}><b>Order Date *</b></Typography>
                            <DatePicker
                                id="order_date"
                                label="Order Date"
                                placeholderText="mm/dd/yyyy"
                                selected={this.state.order_date}
                                onChange={this.handleOrderDateChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} className={classes.grid_margin}>
                            <TextField
                                id="grams_used"
                                label="Total Grams Used"
                                placeholder="Total Grams Used"
                                style={{ "width": "39%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                required={this.state.grams_used_flag}
                                value={this.state.grams_used}
                                onChange={(event) => {
                                    if (isNaN(Number(event.target.value))) {
                                        return;
                                    } else {
                                        this.setState({ ...this.state, grams_used: event.target.value });
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.grid_margin}>
                            <TextField
                                id="amount_due"
                                label="Total Amount Due"
                                placeholder="Total Amount Due"
                                style={{ "width": "80%" }}
                                required={this.state.amount_due_flag}
                                className={classes.textField}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                margin="normal"
                                variant="outlined"
                                value={this.state.amount_due}
                                onChange={(event) => {
                                    if (isNaN(Number(event.target.value))) {
                                        return;
                                    } else {
                                        this.setState({ ...this.state, amount_due: event.target.value });
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.grid_margin}>
                            <Typography style={{ "width": "90%" }} className={classes.date_instructions}><b>Expected Pick-Up Date *</b></Typography>
                            <DatePicker
                                id="expected_date"
                                label="Expected Pick-Up Date"
                                placeholderText="mm/dd/yyyy"
                                selected={this.state.pickup_date}
                                onChange={this.handlePickUpDateChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} style={{ "marginBottom": "-3%", "marginTop": "-2%" }}>
                            <Typography style={{ "width": "90%" }} className={classes.instructions}><b>$0.20 per gram (minimum of $1.00) </b></Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} className={classes.grid_margin}>
                            <TextField
                                id="receipt_number"
                                label="Receipt Number"
                                required={this.state.receipt_number_flag}
                                placeholder="Receipt Number"
                                style={{ "width": "80%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.receipt_number}
                                onChange={(value) => this.onGenericChange(value)}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <br />

                </div>}
                {(this.state.activeStep === 2) && <div className={classes.form_css}>
                    <Typography variant="h6" gutterBottom>
                        Remarks( For Office use only)
                        </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} style={{ "marginLeft": "-1%" }} >
                            <TextField
                                id="remark_notes"
                                multiline
                                rows="10"
                                style={{ "width": "90%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.remark_notes}
                                onChange={(value) => this.onGenericChange(value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.grid_margin}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="job_completed_check"
                                            checked={this.state.job_completed_check}
                                            onChange={() => this.handleCompletedChange()}
                                            color="primary"
                                            value={this.state.job_completed_check}
                                        />
                                    }
                                    label="Job Completed"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={9} className={classes.grid_margin} />
                        {this.state.job_completed_check ?
                            <Grid item xs={12} sm={6} className={classes.grid_margin}>
                                <TextField
                                    id="job_completed_GA"
                                    label="Completed GA"
                                    placeholder="Completed GA"
                                    style={{ "width": "90%" }}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.job_completed_GA}
                                    onChange={(value) => this.onGenericChange(value)}
                                />
                            </Grid> : <Grid item xs={12} sm={6} className={classes.grid_margin} />}
                        {this.state.job_completed_check ?
                            <Grid item xs={12} sm={6} className={classes.grid_margin}>
                                <Typography style={{ "width": "90%" }} className={classes.date_instructions}><b>Job Completion Date</b></Typography>
                                <DatePicker
                                    id="job_completion_date"
                                    label="Job Completion Date"
                                    placeholderText="mm/dd/yyyy"
                                    selected={this.state.job_completion_date}
                                    onChange={this.handleCompletedDateChange}
                                />
                            </Grid>
                            : <Grid item xs={12} sm={6} className={classes.grid_margin} />}
                        <Grid item xs={12} sm={3} className={classes.grid_margin}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="job_delivered_check"
                                            disabled={this.state.job_completed_check ? false : true}
                                            checked={(this.state.job_completed_check && this.state.job_delivered_check) ? true : false}
                                            onChange={() => this.handleDeliveredChange()}
                                            color="primary"
                                            value={this.state.job_delivered_check}
                                        />
                                    }
                                    label="Job Delivered"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={9} className={classes.grid_margin}></Grid>
                        {this.state.job_delivered_check ?
                            <Grid item xs={12} sm={6} className={classes.grid_margin}>
                                <TextField
                                    id="job_delivered_GA"
                                    label="Delivered GA"
                                    placeholder="Delivered GA"
                                    style={{ "width": "90%" }}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.job_delivered_GA}
                                    onChange={(value) => this.onGenericChange(value)}
                                />
                            </Grid> : <Grid item xs={12} sm={6} className={classes.grid_margin} />}
                        {this.state.job_delivered_check ?
                            <Grid item xs={12} sm={6} className={classes.grid_margin}>
                                <Typography style={{ "width": "90%" }} className={classes.date_instructions}><b>Job Delivery Date</b></Typography>
                                <DatePicker
                                    id="job_delivery_date"
                                    label="Job Delivery Date"
                                    placeholderText="mm/dd/yyyy"
                                    selected={this.state.job_delivery_date}
                                    onChange={this.handleDeliveredDateChange}
                                />
                            </Grid>
                            : <Grid item xs={12} sm={6} className={classes.grid_margin} />}
                        <Grid item xs={12} sm={3} />
                    </Grid>
                </div>}

                {(this.state.activeStep === 3) && <div className={classes.form_css}>
                    <Typography variant="h6" gutterBottom>
                        Order Summary
                </Typography>
                    <Card className={classes.main_card}>
                        <CardContent>
                            {console.log("Order date is " + this.state.order_date)}
                            {console.log("Pickup date is " + this.state.pickup_date)}

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.dataHeading}>Name :</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.secondaryHeading}>{(this.state.name && this.state.name !== "") ? this.state.name : ""}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.dataHeading}>WSU ID :</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.secondaryHeading}>{(this.state.wsuid && this.state.wsuid !== "") ? this.state.wsuid : ""}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.dataHeading}>Email :</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.secondaryHeading}>{(this.state.email && this.state.email !== "") ? this.state.email : ""}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.dataHeading}>Phone :</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.secondaryHeading}>{(this.state.phone && this.state.phone !== "") ? this.state.phone : ""}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.dataHeading}>Filament Color :</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.secondaryHeading}>{(this.state.filament_color && this.state.filament_color !== "") ? this.state.filament_color : ""}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.dataHeading}>C-Space Representative :</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.secondaryHeading}>{(this.state.cspace_rep_name && this.state.cspace_rep_name !== "") ? this.state.cspace_rep_name : ""}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.dataHeading}>Order Date :</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.secondaryHeading}>
                                        {(this.state.order_date && this.state.order_date !== null) ? this.state.order_date.toString().substring(0, 15) : null}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.dataHeading}>Grams Used :</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.secondaryHeading}>{(this.state.grams_used && this.state.grams_used !== "") ? this.state.grams_used : ""}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.dataHeading}>Amount :</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.secondaryHeading}>{(this.state.amount_due && this.state.amount_due !== "") ? "$ " + this.state.amount_due : ""}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.dataHeading}>Expected Pick-Up date :</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.secondaryHeading}>
                                        {(this.state.pickup_date && this.state.pickup_date !== null) ? this.state.pickup_date.toString().substring(0, 15) : null}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.dataHeading}>Receipt Number :</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <Typography className={classes.secondaryHeading}>{(this.state.receipt_number && this.state.receipt_number !== "") ? this.state.receipt_number : ""}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>}
                <div className={classes.stepper_buttons}>
                    {this.state.activeStep === this.state.steps.length ? (
                        <div>
                            <Button
                                disabled={this.state.activeStep === 0}
                                onClick={() => this.handleBack(this.state.activeStep)}
                                className={classes.backButton}
                            >
                                Back
              </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ "background": "#3b3b3b" }}
                                onClick={() => this.handleSave({ vertical: 'bottom', horizontal: 'center' })}>
                                Save
                                    </Button>
                        </div>
                    ) : (
                            <div>
                                <Button
                                    disabled={this.state.activeStep === 0}
                                    onClick={() => this.handleBack(this.state.activeStep)}
                                    className={classes.backButton}
                                >
                                    Back
              </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ "background": "#3b3b3b" }}
                                    onClick={() => this.handleNext(this.state.activeStep)}>
                                    {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        )}
                </div>
                <Snackbar
                    open={this.state.snackbarSuccessStatus}
                    onClose={() => this.handleSuccessSnackbarClose()}
                    autoHideDuration={5000}
                >
                    <SnackbarContent
                        style={{ "background": "green" }}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className={classes.message}>
                                <CheckCircleIcon className={clsx(classes.icon, classes.iconVariant)} />
                                Data Saved Successfully...!
                            </span>
                        }
                        action={[
                            <IconButton
                                key="close"
                                aria-label="close"
                                color="inherit"
                                className={classes.close}
                                onClick={() => this.handleSuccessSnackbarClose()}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
                <Snackbar
                    open={this.state.snackbarFailStatus}
                    onClose={() => this.handleFailSnackbarClose()}
                    autoHideDuration={5000}
                >
                    <SnackbarContent
                        style={{ "background": "red" }}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className={classes.message}>
                                <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
                                Unable to save, please try again
                            </span>
                        }
                        action={[
                            <IconButton
                                key="close"
                                aria-label="close"
                                color="inherit"
                                className={classes.close}
                                onClick={() => this.handleFailSnackbarClose()}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
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
                                Please Enter Required Fields
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
            </div >
        );
    }
}
export default withStyles(styles)(RequestForm);