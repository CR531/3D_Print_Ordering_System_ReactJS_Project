import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import wsu_logo from "./Images/wsu_logo.PNG";
import './index.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dash from './Dash';
import Divider from '@material-ui/core/Divider';
const styles = theme => ({
    root1: {
        flexGrow: 1,
    },
    title1: {
        flexGrow: 1,
        color: "black",
        marginLeft: "22%",
        fontSize: "165%",
        fontWeight: "500",
    },
    paper: {
        padding: "2%",
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Mainpage extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.root1} >
                    <Grid container>
                        <Grid item xs><img
                            className="wsu_logo_css"
                            src={wsu_logo}
                            alt="WSU Logo"
                        >
                        </img></Grid>
                        <Grid item xs><Typography variant="h6" className={classes.title1}>
                            3D Print Ordering System
                      </Typography></Grid>
                        <Grid item xs></Grid>
                    </Grid>
                </div>
                <Divider />
                <div>
                    <Dash />
                </div>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Mainpage);