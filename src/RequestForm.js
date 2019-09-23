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
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
const styles = theme => ({
    root: {
        width: '90%',
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
    }
});
class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: ['3D Print Request Form', '3D Print Statement', 'Remarks'],
            activeStep: 0,
            selectedDate: '2019-01-01T21:11:54',
            snackbarStatus: false
        }
    }
    handleSnackbarClose = () => {
        this.setState({ ...this.state, snackbarStatus: false })
    }
    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    }

    handleNext = (x) => {
        this.setState({ activeStep: x + 1 });
        // console.log(this.state.activeStep);
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
    handleSave() {
        this.setState({ snackbarStatus: true })
        this.wait(2000);
        this.setState({ activeStep: 0 })
        //need to save to db
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
                        <Grid item xs={12} sm={12} className={classes.grid_margin}>
                            <TextField
                                id="pname"
                                label="Name"
                                placeholder="Name"
                                style={{ "width": "90%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.grid_margin}>
                            <TextField
                                id="cspace_rep"
                                label="C-Space Representative"
                                placeholder="C-Space Representative"
                                style={{ "width": "80%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={6} className={classes.grid_margin} container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date"
                                    label="Date"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
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
                            />
                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={12} sm={6} className={classes.grid_margin} container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="expected_date"
                                    label="Expected Pick-Up Date"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
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
                        <Grid item xs={12} sm={12} style={{ "marginBottom": "-3%" }}>
                            <TextField
                                id="notes"
                                multiline
                                rows="10"
                                style={{ "width": "90%" }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
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
                    open={this.state.snackbarStatus}
                    onClose={() => this.handleSnackbarClose()}
                    message={<span id="message-id">Saved Successfully...!</span>}
                />
            </div>
        );
    }
}
export default withStyles(styles)(RequestForm);