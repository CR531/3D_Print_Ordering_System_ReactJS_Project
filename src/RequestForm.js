import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
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
}));

function getSteps() {
    return ['3D Print Request Form', '3D Print Statement', 'Remarks'];
}


export default function RequestForm() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2019-09-19T21:11:54'));

    function handleDateChange(date) {
        setSelectedDate(date);
    }
    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    function handleSave() {
        setActiveStep(0);
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {(activeStep === 0) && <div className={classes.form_css}>
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
            {(activeStep === 1) && <div className={classes.form_css}>
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
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
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
            {(activeStep === 2) && <div>
                Hello
            </div>}
            <div className={classes.stepper_buttons}>
                {activeStep === steps.length ? (
                    <div>
                        {/* <Typography className={classes.instructions}>All steps completed</Typography> */}
                        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                    </div>
                ) : (
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
              </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    )}
            </div>
        </div>
    );
}