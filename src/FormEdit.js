import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import emailjs from 'emailjs-com';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import clsx from 'clsx';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
    response_dialog_header_css: {
        background: "rgba(255, 194, 23, 0.95)",
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
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        fontSize: "x-large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    grid_margin: {
        marginLeft: "-3%",
    },
    list: {
        marginLeft: "4%",
        marginRight: "4%",
    },
    listItem: {
        marginBottom: "-1%"
    },
    main_heading: {
        fontSize: "x-large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
    },
    checkbox_margins: {
        marginTop: "1%",
        marginLeft: "-6%"
    },
    margin_top_1: {
        marginTop: "1%"
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


class FormEdit extends Component {
    async componentDidMount() {
        axios.get('http://localhost:4000/printOrder/edit/' + this.props.selected_Order._id)
            .then(response => {
                console.log("Response is given as :" + response)
            })
            .catch(function (error) {
                console.log(error);
            })
        await this.setState({
            ...this.state, open_Dialog: this.props.open_Dialog,
            name: this.props.selected_Order.name,
            wsuid: this.props.selected_Order.wsuid,
            phone: this.props.selected_Order.phone,
            email: this.props.selected_Order.email,
            email_notify_check: (this.props.selected_Order.email_notify_check ? this.props.selected_Order.email_notify_check : false),
            filament_color: this.props.selected_Order.filament_color,
            notes: this.props.selected_Order.notes,
            cspace_rep_name: this.props.selected_Order.cspace_rep_name,
            order_date: this.props.selected_Order.order_date,
            grams_used: this.props.selected_Order.grams_used,
            amount_due: this.props.selected_Order.amount_due,
            pickup_date: this.props.selected_Order.pickup_date,
            receipt_number: this.props.selected_Order.receipt_number,
            remark_notes: this.props.selected_Order.remark_notes,
            job_completed_check: this.props.selected_Order.job_completed_check,
            job_completed_GA: (this.props.selected_Order.job_completed_check === true ? this.props.selected_Order.job_completed_GA : ""),
            job_completion_date: (this.props.selected_Order.job_completed_check === true ? this.props.selected_Order.job_completion_date : null),
            job_completed_email_sent: (this.props.selected_Order.job_completed_email_sent) ?
                ((this.props.selected_Order.email_notify_check && this.props.selected_Order.job_completed_check) === true ? this.props.selected_Order.job_completed_email_sent : false)
                : false,
            job_delivered_check: (this.props.selected_Order.job_completed_check === true ? this.props.selected_Order.job_delivered_check : false),
            job_delivered_GA: (this.props.selected_Order.job_delivered_check === true ? this.props.selected_Order.job_delivered_GA : ""),
            job_delivery_date: (this.props.selected_Order.job_delivered_check === true ? this.props.selected_Order.job_delivery_date : null),
            job_feedback_email_sent: (this.props.selected_Order.job_feedback_email_sent) ?
                ((this.props.selected_Order.email_notify_check && this.props.selected_Order.job_delivered_check) === true ? this.props.selected_Order.job_feedback_email_sent : false)
                : false,
            id: this.props.selected_Order.id
        });
    }
    handleCompletedChange = () => {
        this.setState({
            ...this.state,
            job_completed_check: !(this.state.job_completed_check),
        });
    }
    handleDeliveredChange = () => {
        this.setState({
            ...this.state,
            job_delivered_check: !(this.state.job_delivered_check)
        });
    }
    handleClose = () => {
        this.setState({ ...this.state, open_Dialog: false })
        this.props.onDialogClose(false);
        window.location.reload(false);
    }
    handleResponseClose = () => {
        this.setState({ ...this.state, open_new_dialog: false, open_Dialog: false })
        this.props.onDialogClose(false);
        window.location.reload(false);
    }
    constructor(props) {
        super(props);
        this.state = {
            open_new_dialog: false,
            update_response: {},
            open_Dialog: false,
            orders: [],
            name: '',
            wsuid: '',
            phone: '',
            email: '',
            email_notify_check: false,
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
            job_completed_email_sent: false,
            job_delivered_check: false,
            job_delivered_GA: '',
            job_delivery_date: null,
            job_feedback_email_sent: false,
            id: null,
            required_snackbar: false
        }
    }
    onGenericChange = (e) => {
        this.setState({ ...this.state, [e.target.id]: e.target.value });
    }
    handleOrderDateChange = date => {
        this.setState({ ...this.state, order_date: date });
    }
    handlePickUpDateChange = date => {
        this.setState({ ...this.state, pickup_date: date });
    }
    handleCompletedDateChange = date => {
        this.setState({ ...this.state, job_completion_date: date });
    }
    handleDeliveredDateChange = date => {
        this.setState({ ...this.state, job_delivery_date: date });
    }
    handleEmailNotifyChange = () => {
        this.setState({
            ...this.state,
            email_notify_check: !(this.state.email_notify_check)
        });
    }
    handleCompletedEmail = () => {
        console.log('We are in email block');
        const templateParams = {
            from_name: "Ablah Library C-Space",
            rec_email: this.state.email !== '' ? this.state.email : null,
            to_name: this.state.name !== '' ? this.state.name : null,
        };

        emailjs.send('gmail', 'job_completed_email', templateParams, 'user_w4kn7eTBZHYxmroPYgwUv')
            .then((response) => {
                console.log('SUCCESS!');
                alert("Job Completed Email Sent Successfully")
            }, (err) => {
                console.log('FAILED...', err);
            });
        console.log('We are out of email block');
    }
    handleJobCompletedEmailSent = () => {
        this.setState({
            ...this.state,
            job_completed_email_sent: !(this.state.job_completed_email_sent)
        });
    }
    handleFeedbackEmail = () => {
        console.log('We are in email block');
        const templateParams = {
            from_name: "Ablah Library C-Space",
            rec_email: this.state.email !== '' ? this.state.email : null,
            to_name: this.state.name !== '' ? this.state.name : null,
        };

        emailjs.send('gmail', 'feedback_email', templateParams, 'user_w4kn7eTBZHYxmroPYgwUv')
            .then((response) => {
                console.log('SUCCESS!');
                alert("Feedback Email Sent Successfully")
            }, (err) => {
                console.log('FAILED...', err);
            });
        console.log('We are out of email block');
    }
    handleFeedbackEmailSent = () => {
        this.setState({
            ...this.state,
            job_feedback_email_sent: !(this.state.job_feedback_email_sent)
        });
    }
    wait = (ms) => {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }
    checkRequiredFields = async () => {
        if (this.state.job_completed_check === false && this.state.job_delivered_check === false) {
            await this.setState({ ...this.state, required_snackbar: false });
            this.handleUpdate();
        }
        if (this.state.job_completed_check === true && this.state.job_delivered_check === false) {
            if (this.state.job_completed_GA === "" || this.state.job_completion_date === null) {
                await this.setState({ ...this.state, required_snackbar: true });
            } else {
                await this.setState({ ...this.state, required_snackbar: false });
                this.handleUpdate();
            }
        }
        if (this.state.job_completed_check === false && this.state.job_delivered_check === true) {
            await this.setState({ ...this.state, required_snackbar: false });
            this.handleUpdate();
        }
        if (this.state.job_completed_check === true && this.state.job_delivered_check === true) {
            if (this.state.job_completed_GA === "" || this.state.job_completion_date === null
                || this.state.job_delivered_GA === "" || this.state.job_delivery_date === null) {
                await this.setState({ ...this.state, required_snackbar: true });
            } else {
                await this.setState({ ...this.state, required_snackbar: false });
                this.handleUpdate();
            }
        }
    }
    handleUpdate = async () => {
        const obj = {
            name: this.state.name,
            wsuid: this.state.wsuid,
            phone: this.state.phone,
            email: this.state.email,
            email_notify_check: this.state.email_notify_check,
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
            job_completed_GA: (this.state.job_completed_check === false ? "" : this.state.job_completed_GA),
            job_completion_date: (this.state.job_completed_check === false ? null : this.state.job_completion_date),
            job_completed_email_sent: ((this.state.email_notify_check && this.state.job_completed_check) === true ? this.state.job_completed_email_sent : false),
            job_delivered_check: (this.state.job_completed_check === false ? false : this.state.job_delivered_check),
            job_delivered_GA: (((this.state.job_completed_check === false) || (this.state.job_delivered_check === false)) ? "" : this.state.job_delivered_GA),
            job_delivery_date: (((this.state.job_completed_check === false) || (this.state.job_delivered_check === false)) ? null : this.state.job_delivery_date),
            job_feedback_email_sent: (((this.state.job_completed_check === false) || (this.state.job_delivered_check === false) || (this.state.email_notify_check === false)) ? false : this.state.job_feedback_email_sent),
            id: this.state.id
        };
        axios.post('http://localhost:4000/printOrder/update/' + this.props.selected_Order._id, obj)
            .then((res) => {
                this.setState({ update_response: res.data });
                console.log("response is :" + this.state.update_response);
            });
        await this.checkResponse(this.state.update_response);
    }
    checkResponse = async (val) => {
        this.setState({ ...this.state, open_new_dialog: true })
    }
    handleReqSnackbarClose = async () => {
        await this.setState({ ...this.state, required_snackbar: false })
    }
    render() {
        const { classes } = this.props;
        return (
            <div>{this.state.open_new_dialog &&
                <Dialog
                    className={classes.main_heading}
                    open={true}
                    onClose={() => this.handleResponseClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle className={classes.response_dialog_header_css} id="alert-dialog-title">{"Update Status"}</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" style={{ "color": "black" }}>
                            <br />
                            {(this.state.update_response === "update_success")
                                ? "You have successfully updated the 3d print order data."
                                : "Unable to update the 3d print order data. Please try again."}
                            <br />
                        </DialogContentText>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button onClick={() => this.handleResponseClose()} color="primary" autoFocus>Ok</Button>
                    </DialogActions>
                </Dialog>
            }
                <div>
                    <Dialog fullScreen open={this.state.open_Dialog} onClose={() => this.handleClose()} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar} style={{ "background": "#3b3b3b" }}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={() => this.handleClose()} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                    Order Details
                        </Typography>
                                <Button color="inherit" onClick={() => this.checkRequiredFields()} style={{ "background": "rgba(255, 194, 23, 0.95)", "color": "black" }}>
                                    Update
                        </Button>
                            </Toolbar>
                        </AppBar>
                        <List className={classes.list}>
                            <ListItem className={classes.listItem}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    placeholder="Name"
                                    style={{ "width": "30%" }}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.name}
                                    onChange={(value) => this.onGenericChange(value)}
                                />
                                <TextField
                                    id="wsuid"
                                    label="WSU ID"
                                    placeholder="WSU ID"
                                    style={{ "width": "30%" }}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.wsuid}
                                    onChange={(value) => this.onGenericChange(value)}
                                />
                                <TextField
                                    id="phone"
                                    label="Phone"
                                    placeholder="Phone"
                                    style={{ "width": "30%" }}
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
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Grid item xs={12} sm={3} style={{ "marginLeft": "1%", "marginRight": "5%" }}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    id="email_notify_check"
                                                    checked={this.state.email_notify_check}
                                                    onChange={() => this.handleEmailNotifyChange()}
                                                    color="primary"
                                                    value={this.state.email_notify_check}
                                                />
                                            }
                                            label="Send Email Notifications"
                                        />
                                    </FormGroup>
                                </Grid>
                                <TextField
                                    id="email"
                                    label="Email"
                                    placeholder="Email"
                                    style={{ "width": "61%" }}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.email}
                                    onChange={(value) => this.onGenericChange(value)}
                                />

                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <TextField
                                    id="filament_color"
                                    label="Filament Color"
                                    placeholder="Filament Color"
                                    style={{ "width": "30%" }}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.filament_color}
                                    onChange={(value) => this.onGenericChange(value)}
                                />
                                <TextField
                                    id="notes"
                                    multiline
                                    label="Notes"
                                    placeholder="Notes"
                                    rows="3"
                                    style={{ "width": "61%" }}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.notes}
                                    onChange={(value) => this.onGenericChange(value)}
                                />
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <TextField
                                    id="cspace_rep_name"
                                    label="C-Space Representative"
                                    placeholder="C-Space Representative"
                                    style={{ "width": "30%" }}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.cspace_rep_name}
                                    onChange={(value) => this.onGenericChange(value)}
                                />
                                <TextField
                                    id="grams_used"
                                    label="Total Grams Used"
                                    placeholder="Total Grams Used"
                                    style={{ "width": "30%" }}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.grams_used}
                                    onChange={(event) => {
                                        if (isNaN(Number(event.target.value))) {
                                            return;
                                        } else {
                                            this.setState({ ...this.state, grams_used: event.target.value });
                                        }
                                    }}
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item xs={12} sm={4} className={classes.grid_margin} container justify="space-around">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="order_date"
                                            label="Order Date *"
                                            placeholder='mm/dd/yyyy'
                                            value={this.state.order_date}
                                            onChange={this.handleOrderDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <TextField
                                    id="receipt_number"
                                    label="Receipt #"
                                    placeholder="Receipt #"
                                    style={{ "width": "30%" }}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.receipt_number}
                                    onChange={(value) => this.onGenericChange(value)}
                                />
                                <TextField
                                    id="amount_due"
                                    label="Total Amount Due"
                                    placeholder="Total Amount Due"
                                    style={{ "width": "30%" }}
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
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item xs={12} sm={4} className={classes.grid_margin} container justify="space-around">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            placeholder='mm/dd/yyyy'
                                            margin="normal"
                                            id="expected_date"
                                            label="Expected Pick-Up Date *"
                                            value={this.state.pickup_date}
                                            onChange={this.handlePickUpDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <TextField
                                    id="remark_notes"
                                    multiline
                                    label="Remark Notes"
                                    placeholder="Remark Notes"
                                    rows="3"
                                    style={{ "width": "92%" }}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.remark_notes}
                                    onChange={(value) => this.onGenericChange(value)}
                                />
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <Grid item xs={12} sm={3} style={{ "marginLeft": "1%", "marginTop": "1.5%", "marginRight": "5%" }}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    id="job_completed_check"
                                                    checked={this.state.job_completed_check === true ? true : false}
                                                    onChange={() => this.handleCompletedChange()}
                                                    color="primary"
                                                    value={this.state.job_completed_check}
                                                />
                                            }
                                            label="Job Completed"
                                        />
                                    </FormGroup>
                                </Grid>
                                <TextField
                                    id="job_completed_GA"
                                    label="Completed GA"
                                    placeholder="Completed GA"
                                    style={{ "width": "30%" }}
                                    required={this.state.job_completed_check === true ? true : false}
                                    className={classes.textField}
                                    margin="normal"
                                    disabled={this.state.job_completed_check === false ? true : false}
                                    variant="outlined"
                                    value={this.state.job_completed_GA}
                                    onChange={(value) => this.onGenericChange(value)}
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item xs={12} sm={4} className={classes.grid_margin} container justify="space-around">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            placeholder='mm/dd/yyyy'
                                            required={this.state.job_completed_check === true ? true : false}
                                            margin="normal"
                                            id="job_completion_date"
                                            disabled={this.state.job_completed_check === false ? true : false}
                                            label="Job Completion Date"
                                            value={this.state.job_completion_date}
                                            onChange={this.handleCompletedDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </ListItem>
                            {(this.state.email_notify_check === true && this.state.job_completed_check === true) ?
                                <ListItem className={classes.listItem}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={4} style={{ "marginTop": "1.5%", "marginRight": "-3%" }}></Grid>
                                        <Grid item xs={12} sm={5} className={classes.margin_top_1}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={this.state.job_completed_email_sent === true ? true : false}
                                                style={{ "background": "#3b3b3b", "marginLeft": "2%" }}
                                                onClick={() => this.handleCompletedEmail()}>
                                                Send Job Completed Email
                                    </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={3} className={classes.checkbox_margins}>
                                            <FormGroup row>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            id="job_completed_email_sent"
                                                            checked={this.state.job_completed_email_sent}
                                                            disabled={(this.state.email_notify_check && this.state.job_completed_check) === true ? false : true}
                                                            onChange={() => this.handleJobCompletedEmailSent()}
                                                            color="primary"
                                                            value={this.state.job_completed_email_sent}
                                                        />
                                                    }
                                                    label="Job Completed Email Sent"
                                                />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </ListItem> : <ListItem className={classes.listItem} />}
                            <ListItem className={classes.listItem}>
                                <Grid item xs={12} sm={3} style={{ "marginLeft": "1%", "marginTop": "1.5%", "marginRight": "5%" }}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    id="job_delivered_check"
                                                    disabled={this.state.job_completed_check === false ? true : false}
                                                    checked={(this.state.job_delivered_check === true) ? true : false}
                                                    onChange={() => this.handleDeliveredChange()}
                                                    color="primary"
                                                    value={this.state.job_delivered_check}
                                                />
                                            }
                                            label="Job Delivered"
                                        />
                                    </FormGroup>
                                </Grid>
                                <TextField
                                    id="job_delivered_GA"
                                    label="Delivered GA"
                                    required={((this.state.job_completed_check === true) && (this.state.job_delivered_check === true)) ? true : false}
                                    placeholder="Delivered GA"
                                    style={{ "width": "30%" }}
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    disabled={((this.state.job_completed_check === false) || (this.state.job_delivered_check === false)) ? true : false}
                                    value={this.state.job_delivered_GA}
                                    onChange={(value) => this.onGenericChange(value)}
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item xs={12} sm={4} className={classes.grid_margin} container justify="space-around">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            placeholder='mm/dd/yyyy'
                                            margin="normal"
                                            required={((this.state.job_completed_check === true) && (this.state.job_delivered_check === true)) ? true : false}
                                            id="job_delivery_date"
                                            label="Job Delivery Date"
                                            disabled={((this.state.job_completed_check === false) || (this.state.job_delivered_check === false)) ? true : false}
                                            value={this.state.job_delivery_date}
                                            onChange={this.handleDeliveredDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </ListItem>
                            {(this.state.email_notify_check === true && this.state.job_delivered_check === true && this.state.job_completed_check === true) ?
                                <ListItem className={classes.listItem}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={4} style={{ "marginTop": "1.5%", "marginRight": "-3%" }}></Grid>
                                        <Grid item xs={12} sm={5} className={classes.margin_top_1}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={this.state.job_feedback_email_sent === true ? true : false}
                                                style={{ "background": "#3b3b3b", "marginLeft": "2%" }}
                                                onClick={() => this.handleFeedbackEmail()}>
                                                Send Feedback Email
                                    </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={3} className={classes.checkbox_margins}>
                                            <FormGroup row>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            id="job_feedback_email_sent"
                                                            checked={this.state.job_feedback_email_sent}
                                                            disabled={(this.state.email_notify_check && this.state.job_delivered_check && this.state.job_completed_check) === true ? false : true}
                                                            onChange={() => this.handleFeedbackEmailSent()}
                                                            color="primary"
                                                            value={this.state.job_feedback_email_sent}
                                                        />
                                                    }
                                                    label="Job Delivered Email Sent"
                                                />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </ListItem> : <ListItem className={classes.listItem} />}
                        </List>
                    </Dialog>
                </div>
                <Snackbar
                    open={this.state.required_snackbar}
                    onClose={() => this.handleReqSnackbarClose()}
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
                                onClick={() => this.handleReqSnackbarClose()}
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
export default withStyles(styles)(FormEdit);

