import React, { Component } from 'react';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Image_1 from "./Images/image_1.jpg";
import Image_2 from "./Images/image_2.jpg";
import Grid from '@material-ui/core/Grid';

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
    para_heading: {
        fontFamily: "auto",
        fontSize: "medium",
        fontStyle: "unset",
        fontVariant: "common-ligatures"
    },
    image_css_1: {
        width: "80%",
    },
    image_css_2: {
        width: "50%",
    },
    grid_css: {
        textAlign: "center",
    }
});
class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} style={{ "marginBottom": "2%" }}>
                {/* <Typography className={classes.main_heading}><b>Home</b></Typography> */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={4} className={classes.grid_css}>
                        <img
                            className={classes.image_css_1}
                            src={Image_1}
                            alt="Image_1"
                        >
                        </img>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.grid_css}>
                        <img
                            className={classes.image_css_2}
                            src={Image_2}
                            alt="Image_1"
                        >
                        </img>
                    </Grid>
                    <Grid item xs={12} sm={2}></Grid>
                </Grid>
                <p className={classes.para_heading}>
                    C-Space offers access to a Makerbot Digitizer Desktop Makerbot Replicator 5th Generation 3D printer.  This equipment may be used by all currently enrolled WSU students or employees of Wichita State.  The scanner may be used to scan and create a digital file of three-dimensional objects.  The printer uses PLA plastic filament to print three-dimensional objects  using a design that is uploaded from a digital computer file
                </p>
                <p className={classes.para_heading}><b>General Policies</b></p>
                <p><ol type="I">
                    <li className={classes.para_heading}>
                        The 3D printer must be used only for lawful purposes. Users will not be permitted to use University Libraries' 3D printer or scanner to create material that is:
                    <ol type="a">
                            <li className={classes.para_heading}>Prohibited by local, state or federal law.</li>
                            <li className={classes.para_heading}>Unsafe, harmful, dangerous or poses an immediate threat to the well-being of others.</li>
                            <li className={classes.para_heading}>A utensil that is to be used for storing or consuming any food item. (The material provided in the library is not certified to be of food grade.)</li>
                            <li className={classes.para_heading}>Obscene or otherwise inappropriate in the UL environment.</li>
                            <li className={classes.para_heading}>In violation of another’s intellectual property rights. The printers will not be used to reproduce material that is subject to copyright, patent or trademark protection, unless authorized by the creator.</li>
                        </ol>
                    </li>
                    <li className={classes.para_heading}>WSU University Libraries reserves the right to refuse any 3D print request.</li>
                    <li className={classes.para_heading}>Cost: 3D printing jobs cost $0.20 per gram of filament used. This is payable by cash or credit card at the Circulation Desk. Any design failures will be held accountable to the designer of the model.</li>
                    <li className={classes.para_heading}>The use of 3D printed parts as a replacement for any machine part is not recommended (as it can lead to failure of the equipment ). Also, such parts are not designed to be exposed to direct and continuous sunlight, high temperatures or continuous stress.</li>
                    <li className={classes.para_heading}>Items must be picked up by the individual who printed them within 7 days. If you anticipate that you will be unable to pick up your print within the week, please specify a time frame when you submit your request via our request form and we will be happy to work with you. Please note: If no arrangements have been made and the week has passed, the printed object becomes the property of the University Libraries, but the patron will still be responsible for paying the fee associated with the printing.</li>
                    <li className={classes.para_heading}><b>Only designated Library staff and volunteers will have hands-on access to the 3D printer and scanner.</b></li>
                    <li className={classes.para_heading}><b>Printing and scanning policies are subject to change. Please refer to this guide for updated information.</b></li>
                </ol>
                </p>
            </div>
        );
    }
}
export default withStyles(styles)(Home);