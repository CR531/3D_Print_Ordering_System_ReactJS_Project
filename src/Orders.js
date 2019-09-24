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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const styles = theme => ({
    root: {
        width: '91%',
        marginLeft: "4%",
        marginRight: "4%",
        marginTop: "3%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    main_heading: {
        fontSize: "x-large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    column1: {
        flexBasis: '33.33%',
        marginBottom: "-1%"
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
    exp_summary_css: {
        marginTop: "3%",
        marginBottom: "0%",
    },
    chip_css: {
        marginTop: "-3%",
    }
});

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completedCheck: false,
            deliveredCheck: false,
            chipStatus: false,
            expand_Exp: false,
            openSaveDialog: false
        }
    }
    handleDialogClose = () => {
        this.setState({ ...this.state, openSaveDialog: false })
    };
    handleDialogOpen = () => {
        console.log("We are in open dialog method");
        console.log("We are in open dialog method " + this.state.openSaveDialog);
        this.setState({ ...this.state, openSaveDialog: true })
        console.log("We are in open dialog method " + this.state.openSaveDialog);

    };
    handleCompletedChange = () => {
        this.setState({
            ...this.state,
            completedCheck: !(this.state.completedCheck),
            deliveredCheck: (this.state.completedCheck ? false : false)
        });
    }
    handleDeliveredChange = () => {
        this.setState({ ...this.state, deliveredCheck: !(this.state.deliveredCheck) });
    }
    handleExpChange = () => {
        this.setState({ ...this.state, expand_Exp: !(this.state.expand_Exp) })
    }
    handleOrderSave = () => {
        console.log("entered order save");
        this.handleDialogOpen();
        console.log("entered order save" + this.state.openSaveDialog);
        this.handleExpChange();
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Dialog
                        open={this.state.openSaveDialog}
                        // open={true}
                        onClose={() => this.handleDialogClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.handleDialogClose()} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className={classes.root} >
                    <Typography className={classes.main_heading}><b>Order History</b></Typography>
                    <br />
                    <ExpansionPanel expanded={this.state.expand_Exp} onChange={() => this.handleExpChange()}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            id="panel1c-header"
                        >
                            <div className={classes.column1}>
                                <Typography className={classes.heading}>Name : </Typography>
                            </div>

                            <div className={classes.column1}>
                                <Typography className={classes.secondaryHeading}>Receipt # </Typography>
                            </div>
                            <div className={classes.column1}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={3}>
                                        <Typography className={classes.secondaryHeading}>Status : </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3} className={classes.chip_css}>
                                        {(this.state.completedCheck && this.state.deliveredCheck) ? <Chip label="Done" className={classes.chip1} />
                                            : <Chip label="Pending" className={classes.chip2} />}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    </Grid>
                                </Grid>

                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.details}>
                            <div className={classes.column}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.completedCheck}
                                                onChange={() => this.handleCompletedChange()}
                                                color="primary"
                                            />
                                        }
                                        label="Job Completed"
                                    />
                                </FormGroup>
                            </div>
                            {this.state.completedCheck &&
                                <div className={classes.column}>
                                    <TextField
                                        id="cGA"
                                        label="Completed GA"
                                        placeholder="Completed GA"
                                        style={{ "width": "100%" }}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </div>
                            }
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails>
                            <div className={classes.column}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={this.state.completedCheck ? false : true}
                                                checked={(this.state.completedCheck && this.state.deliveredCheck) ? true : false}
                                                onChange={() => this.handleDeliveredChange()}
                                                color="primary"
                                            />
                                        }
                                        label="Job Delivered"
                                    />
                                </FormGroup>
                            </div>
                            {(this.state.completedCheck && this.state.deliveredCheck) &&
                                <div className={classes.column}>
                                    <TextField
                                        id="dGA"
                                        label="Delivered GA"
                                        placeholder="Delivered GA"
                                        style={{ "width": "100%" }}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </div>
                            }
                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions>
                            <Button size="small">Cancel</Button>
                            <Button size="small" color="primary" onClick={() => this.handleOrderSave()}>
                                Save
          </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>

                </div >
            </div>
        );
    }
}
export default withStyles(styles)(Orders);