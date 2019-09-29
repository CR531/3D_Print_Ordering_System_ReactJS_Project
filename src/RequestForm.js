import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
const styles = theme => ({
    root: {
        width: '90%',
    },
    close: {
        padding: theme.spacing(0.5),
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
});
class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: ['3D Print Request Form', '3D Print Statement', 'Remarks'],
            activeStep: 0,
            selectedDate: '2019-01-01T21:11:54',
            snackbarSuccessStatus: false,
            snackbarFailStatus: false,
            completedCheck: false,
            deliveredCheck: false,
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
        }
    }
    onNameChange = (e) => {
        this.setState({ ...this.state, name: e.target.value });
        // console.log("State is :" + this.state.name)
    }
    onWsuIDChange = (e) => {
        this.setState({ ...this.state, wsuid: e.target.value });
    }
    onPhoneChange = (e) => {
        this.setState({ ...this.state, phone: e.target.value });
    }
    onEmailChange = (e) => {
        this.setState({ ...this.state, email: e.target.value });
    }
    onFilamentColorChange = (e) => {
        this.setState({ ...this.state, filament_color: e.target.value });
    }
    onNotesChange = (e) => {
        this.setState({ ...this.state, notes: e.target.value });
    }
    onCSpaceRepChange = (e) => {
        this.setState({ ...this.state, cspace_rep_name: e.target.value });
    }
    onGramsUsedChange = (e) => {
        this.setState({ ...this.state, grams_used: e.target.value });
    }
    onAmountDueChange = (e) => {
        this.setState({ ...this.state, amount_due: e.target.value });
    }
    onReceiptNumberChange = (e) => {
        this.setState({ ...this.state, receipt_number: e.target.value });
    }
    onRemarkNotesChange = (e) => {
        this.setState({ ...this.state, remark_notes: e.target.value });
    }
    onJobCompletedGAChange = (e) => {
        this.setState({ ...this.state, job_completed_GA: e.target.value });
    }
    onJobDeliveredGAChange = (e) => {
        this.setState({ ...this.state, job_delivered_GA: e.target.value });
    }

    handleOrderDateChange = date => {
        this.setState({ ...this.state, order_date: (date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()) });
    }
    handlePickUpDateChange = date => {
        this.setState({ ...this.state, pickup_date: (date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()) });
    }
    handleCompletedDateChange = date => {
        this.setState({ ...this.state, job_completion_date: (date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()) });
    }
    handleDeliveredDateChange = date => {
        this.setState({ ...this.state, job_delivery_date: (date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()) });
    }

    handleSuccessSnackbarClose = () => {
        this.setState({ ...this.state, snackbarSuccessStatus: false })
    }
    handleFailSnackbarClose = () => {
        this.setState({ ...this.state, snackbarFailStatus: false })
    }
    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    }
    handleNext = (x) => {
        this.setState({ activeStep: x + 1 });
    }
    handleBack = (x) => {
        this.setState({ activeStep: x - 1 });
    }
    wait = (ms) => {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
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
        this.setState({ ...this.state, activeStep: 0 })
        this.setState({
            ...this.state,
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
        })
    }
    handleCompletedChange = () => {
        this.setState({
            ...this.state,
            job_completed_check: !(this.state.job_completed_check),
            job_delivered_check: (this.state.job_completed_check ? false : false)
        });
    }
    handleDeliveredChange = () => {
        this.setState({ ...this.state, job_delivered_check: !(this.state.job_delivered_check) });
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {this.state.steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {(this.state.activeStep === 0) && <div className={classes.form_css}>
                    <Typography variant="h6" gutterBottom>
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
                                value={this.state.name}
                                onChange={(value) => this.onNameChange(value)}
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
                                value={this.state.wsuid}
                                onChange={(value) => this.onWsuIDChange(value)}
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
                                onChange={(value) => this.onPhoneChange(value)}
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
                                value={this.state.email}
                                onChange={(value) => this.onEmailChange(value)}
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
                                onChange={(value) => this.onFilamentColorChange(value)}
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
                                onChange={(value) => this.onNotesChange(value)}
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
                                id="cspace_rep"
                                label="C-Space Representative"
                                placeholder="C-Space Representative"
                                style={{ "width": "80%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.cspace_rep_name}
                                onChange={(value) => this.onCSpaceRepChange(value)}
                            />
                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={6} className={classes.grid_margin} container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="order_date"
                                    label="Order Date"
                                    placeholder='mm/dd/yyyy'
                                    value={this.state.order_date}
                                    onChange={this.handleOrderDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item xs={12} sm={12} className={classes.grid_margin}>
                            <TextField
                                id="grams_used"
                                label="Total Grams Used"
                                placeholder="Total Grams Used"
                                style={{ "width": "39%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.grams_used}
                                onChange={(value) => this.onGramsUsedChange(value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.grid_margin}>
                            <TextField
                                id="amount_due"
                                label="Total Amount Due"
                                placeholder="Total Amount Due"
                                style={{ "width": "80%" }}
                                className={classes.textField}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                margin="normal"
                                variant="outlined"
                                value={this.state.amount_due}
                                onChange={(value) => this.onAmountDueChange(value)}
                            />
                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={6} className={classes.grid_margin} container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    placeholder='mm/dd/yyyy'
                                    margin="normal"
                                    id="expected_date"
                                    label="Expected Pick-Up Date"
                                    value={this.state.pickup_date}
                                    onChange={this.handlePickUpDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item xs={12} sm={12} style={{ "marginBottom": "-3%", "marginTop": "-2%" }}>
                            <Typography style={{ "width": "90%" }} className={classes.instructions}><b>$0.20 per gram (minimum of $1.00) </b></Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} className={classes.grid_margin}>
                            <TextField
                                id="receipt_number"
                                label="Receipt #"
                                placeholder="Receipt #"
                                style={{ "width": "80%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.receipt_number}
                                onChange={(value) => this.onReceiptNumberChange(value)}
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
                                onChange={(value) => this.onRemarkNotesChange(value)}
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
                                    onChange={(value) => this.onJobCompletedGAChange(value)}
                                />
                            </Grid> : <Grid item xs={12} sm={6} className={classes.grid_margin} />}
                        {this.state.job_completed_check ?
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item xs={12} sm={6} className={classes.grid_margin} container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        placeholder='mm/dd/yyyy'
                                        margin="normal"
                                        id="job_completion_date"
                                        label="Job Completion Date"
                                        value={this.state.job_completion_date}
                                        onChange={this.handleCompletedDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider> : <Grid item xs={12} sm={6} className={classes.grid_margin} />}
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
                                    onChange={(value) => this.onJobDeliveredGAChange(value)}
                                />
                            </Grid> : <Grid item xs={12} sm={6} className={classes.grid_margin} />}
                        {this.state.job_delivered_check ?
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item xs={12} sm={6} className={classes.grid_margin} container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        placeholder='mm/dd/yyyy'
                                        margin="normal"
                                        id="job_delivery_date"
                                        label="Job Delivery Date"
                                        value={this.state.job_delivery_date}
                                        onChange={this.handleDeliveredDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider> : <Grid item xs={12} sm={6} className={classes.grid_margin} />}
                        <Grid item xs={12} sm={3} />
                    </Grid>
                </div>}
                <div className={classes.stepper_buttons}>
                    {this.state.activeStep === this.state.steps.length ? (
                        <div>
                            <Button variant="contained" color="primary" onClick={() => this.handleSave({ vertical: 'bottom', horizontal: 'center' })}>Save</Button>
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
                                <Button variant="contained" color="primary" onClick={() => this.handleNext(this.state.activeStep)}>
                                    {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        )}
                </div>
                <Snackbar
                    open={this.state.snackbarSuccessStatus}
                    onClose={() => this.handleSuccessSnackbarClose()}
                    autoHideDuration={10000}
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
                    autoHideDuration={10000}
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
            </div >
        );
    }
}
export default withStyles(styles)(RequestForm);