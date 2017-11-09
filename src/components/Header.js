import React, { Component } from 'react';
import { withStyles } from 'material-ui-next/styles';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui-next/AppBar';
import Hidden from 'material-ui-next/Hidden';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import IconButton from 'material-ui-next/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui-next/Drawer';
import Divider from 'material-ui-next/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui-next/List';
import DraftsIcon from 'material-ui-icons/Drafts';
import Breadcrumb from './Breadcrumb';

const styles = theme => ({
    appBar: {
        width: '100%'
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    flex: {
        flex: 1,
    },
    list: {
        width: 250,
        flex: 'initial',
    },
    listFull: {
        width: 'auto',
        flex: 'initial',
    },
    logo: {
        marginRight: 10,
        marginLeft: -10,
        marginTop: 4,
    },
    title: {
        color: 'white',
        textDecoration: 'none',
    },
    link: {
        textDecoration: 'none'
    },
});

class Header extends Component {

    render() {
        const { classes, open } = this.props;
        return (
            <div>
                <div className={classes.appBar}>
                    <AppBar position="static">
                        <Toolbar disableGutters>
                            <IconButton
                                className={classes.menuButton}
                                color="contrast"
                                aria-label="Menu"
                                onClick={this.props.handleDrawerOpen}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Link to="/">
                                <span>
                                    {/*<img alt='' className={classes.logo} src="/images/logo.png" />*/}
                                </span>
                            </Link>

                            <Typography type="title">
                                <Link to="/" className={classes.title}>CVSS v3 Calculator</Link>
                            </Typography>

                            <Hidden mdDown>
                                <Breadcrumb location={this.props.location} />
                            </Hidden>
                        </Toolbar>
                    </AppBar>
                </div>
                <Drawer
                    open={open}
                    onRequestClose={this.props.handleDrawerClose}
                    onClick={this.props.handleDrawerClose}
                >
                    <List className={classes.list}>
                        <ListItem button className={classes.link}>
                            <ListItemIcon><DraftsIcon /></ListItemIcon>
                            <Link to="/home"><ListItemText primary="Home" /></Link>
                        </ListItem>
                        <Divider />

                        <ListItem button className={classes.link}>
                            <ListItemIcon><DraftsIcon /></ListItemIcon>
                            <Link to="/about"><ListItemText primary="About" /></Link>
                        </ListItem>
                        <Divider />
                    </List>
                </Drawer>
            </div >
        );
    }
}

export default withStyles(styles)(Header);