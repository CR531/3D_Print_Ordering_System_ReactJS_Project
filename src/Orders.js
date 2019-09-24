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
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
});

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completedCheck: false,
            deliveredCheck: false
        }
    }
    handleCompletedChange = () => {
        this.setState({ ...this.state, completedCheck: !(this.state.completedCheck) });
    }
    handleDeliveredChange = () => {
        this.setState({ ...this.state, deliveredCheck: !(this.state.deliveredCheck) });
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} >
                <Typography className={classes.main_heading}><b>Order History</b></Typography>
                <br />
                <ExpansionPanel >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="panel1c-header"
                    >
                        <div className={classes.column}>
                            <Typography className={classes.heading}>Name : </Typography>
                        </div>

                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}>Receipt # </Typography>
                        </div>
                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}>Status : </Typography>

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
                        {/* {<div className={clsx(classes.column, classes.helper)}>

                            <Typography variant="caption">
                                Select your destination of choice
                              <br />
                            </Typography>
                        </div>} */}
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails>
                        <div className={classes.column}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.deliveredCheck}
                                            onChange={() => this.handleDeliveredChange()}
                                            color="primary"
                                        />
                                    }
                                    label="Job Delivered"
                                />
                            </FormGroup>
                        </div>
                        {this.state.deliveredCheck &&
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
        );
    }
}
export default withStyles(styles)(Orders);