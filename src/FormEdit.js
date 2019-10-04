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

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
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
        marginBottom: "-2%"
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


class FormEdit extends Component {
    async componentDidMount() {
        await this.setState({
            ...this.state, open_Dialog: this.props.open_Dialog,
            name: this.props.selected_Order.name,
            wsuid: this.props.selected_Order.wsuid,
            phone: this.props.selected_Order.phone,
            email: this.props.selected_Order.email,
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
            job_delivered_check: this.props.selected_Order.job_delivered_check,
            job_delivered_GA: (this.props.selected_Order.job_delivered_check ? this.props.selected_Order.job_delivered_GA : ""),
            job_delivery_date: (this.props.selected_Order.job_delivered_check ? this.props.selected_Order.job_delivery_date : null),
            id: this.props.selected_Order.id
        });
    }
    handleCompletedChange = () => {
        this.setState({
            ...this.state,
            job_completed_check: !(this.state.job_completed_check),
            job_delivered_check: (this.state.job_completed_check ? false : false),
        });
    }
    handleDeliveredChange = () => {
        this.setState({ ...this.state, job_delivered_check: !(this.state.job_delivered_check) });
    }
    handleClose = () => {
        this.setState({ ...this.state, open_Dialog: false })
        this.props.onDialogClose(false);
    }

    constructor(props) {
        super(props);
        this.state = {
            open_Dialog: false,
            orders: [],
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
            id: null
        }
    }
    onGenericChange = (e) => {
        this.setState({ ...this.state, [e.target.id]: e.target.value });
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
    handleUpdate = async () => {
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
            id: this.state.id
        };

        // await axios.post('http://localhost:4000/printOrder/update1', obj)
        //     .then((res) => {
        //         console.log("response is :" + res);
        //     });

    }

    render() {
        const { classes } = this.props;
        return (
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
                            <Button color="inherit" onClick={() => this.handleUpdate()}>
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
                        </ListItem>
                        <ListItem className={classes.listItem}>
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
                                id="phone"
                                label="Phone"
                                placeholder="Phone"
                                style={{ "width": "30%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.phone}
                                onChange={(value) => this.onGenericChange(value)}
                            />
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
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <TextField
                                id="grams_used"
                                label="Total Grams Used"
                                placeholder="Total Grams Used"
                                style={{ "width": "30%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={this.state.grams_used}
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
                                onChange={(value) => this.onGenericChange(value)}
                            />
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
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Grid item xs={12} sm={3} style={{ "marginLeft": "1%", "marginTop": "1.5%" }}>
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
                        </ListItem>

                        <ListItem className={classes.listItem}>
                            <TextField
                                id="job_completed_GA"
                                label="Completed GA"
                                placeholder="Completed GA"
                                style={{ "width": "30%" }}
                                className={classes.textField}
                                margin="normal"
                                disabled={this.state.job_completed_check === false ? true : false}
                                variant="outlined"
                                value={this.state.job_completed_GA}
                                onChange={(value) => this.onGenericChange(value)}
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item xs={12} sm={6} className={classes.grid_margin} container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        placeholder='mm/dd/yyyy'
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
                        <ListItem className={classes.listItem}>
                            <Grid item xs={12} sm={3} style={{ "marginLeft": "1%", "marginTop": "1.5%" }}>
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
                        </ListItem>

                        <ListItem className={classes.listItem}>
                            <TextField
                                id="job_delivered_GA"
                                label="Delivered GA"
                                placeholder="Delivered GA"
                                style={{ "width": "30%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                disabled={this.state.job_delivered_check === false ? true : false}
                                value={this.state.job_delivered_GA}
                                onChange={(value) => this.onGenericChange(value)}
                            />
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
                                        disabled={this.state.job_delivered_check === false ? true : false}
                                        value={this.state.job_delivery_date}
                                        onChange={this.handleDeliveredDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(FormEdit);

