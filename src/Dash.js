import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import RequestForm from "./RequestForm";
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        position: "sticky",
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: "5%",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    menu_list: {
        background: "#3f51b5",
        textAlign: "center",
    },
    menu_text: {
        color: "white",
        fontSize: "larger",
        fontWeight: "700",
    },
    card_css: {
        marginTop: "5%",
        marginLeft: "3%",
        marginRight: "3%",
        width: "77%",
    },
    div_css: {
        height: "100vh"
    },
    toolbar: theme.mixins.toolbar,
});

class Dash extends Component {
    constructor() {
        super();
        this.state = {
            form_selected: true,
            history_selected: false
        }
        this.form_button_change = this.form_button_change.bind(this);
        this.history_button_change = this.history_button_change.bind(this);
    }
    form_button_change = e => {
        this.setState({ history_selected: false, form_selected: true });
        console.log(`form Selected value is :`, this.state.form_selected);
    };
    history_button_change = e => {
        this.setState({ form_selected: false, history_selected: true });
        console.log(`History Selected value is :`, this.state.history_selected);
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <List>
                        <ListItem className={classes.menu_list}>
                            <ListItemText className={classes.menu_text} primary="Menu" />
                        </ListItem>
                        <Divider />
                        <ListItem
                            button
                            onClick={this.form_button_change}
                            selected={this.state.form_selected}>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary="Request Form" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={this.history_button_change} selected={this.state.history_selected}>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="History" />
                        </ListItem>
                    </List>
                    <Divider />
                </Drawer>
                <Card className={classes.card_css}>
                    {this.state.form_selected && <Typography paragraph>
                        <RequestForm />
                    </Typography>}
                    {this.state.history_selected && <Typography paragraph>
                        This is History page
                           </Typography>}
                </Card>
            </div>
        );
    }
}
export default withStyles(styles)(Dash);