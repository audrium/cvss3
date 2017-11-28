import React from 'react';
import { withStyles } from 'material-ui-next/styles';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';

const styles = theme => ({
    appBar: {
        width: '100%'
    },
    title: {
        color: 'white',
        textDecoration: 'none',
    },
});

const Header = (props) => {
    const { classes } = props;
    return (
        <div className={classes.appBar}>
            <AppBar position="static">
                <Toolbar>
                    <Typography type="title">
                        <Link to="/cvss3/" className={classes.title}>CVSS v3 Calculator</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Header);