import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


class FormEdit extends Component {

    handleClose = () => {
        this.setState({ ...this.state, open_Dialog: false })
        this.props.onDialogClose(false);
    }

    constructor(props) {
        super(props);
        this.state = {
            open_Dialog: false
        }
    }
    async componentDidMount() {
        await this.setState({ ...this.state, open_Dialog: this.props.open_Dialog });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog fullScreen open={this.state.open_Dialog} onClose={() => this.handleClose()} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={() => this.handleClose()} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Order Details
                        </Typography>
                            <Button color="inherit" onClick={() => this.handleClose()}>
                                save
                        </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(FormEdit);

