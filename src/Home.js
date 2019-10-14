import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
});
class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} style={{ "marginBottom": "2%" }}>
                <Typography className={classes.main_heading}><b>Home</b></Typography>
                <br />
            </div>
        );
    }
}
export default withStyles(styles)(Home);