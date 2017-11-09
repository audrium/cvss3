import React from 'react';
import { Link } from 'react-router-dom';
import Typography from 'material-ui-next/Typography';
import { withStyles } from 'material-ui-next/styles';

const styles = theme => ({
    flex: {
        paddingLeft: 30,
        flex: 1,
        color: 'white',
        textDecoration: 'none',
        fontSize: 16
    },
    title: {
        color: 'white',
        textDecoration: 'none',
    }
});

const Breadcrumb = (props) => {

    const { classes, location } = props;

    const homeLink = <Link to="/" className={classes.title}>Home</Link>;
    const aboutLink = <span> / <Link to="/about" className={classes.title}>About</Link></span>;

    const home = location !== '/' ? homeLink : '';
    const about = location === '/about' || location.includes('/about/') ? aboutLink : '';

    return (
        <Typography className={classes.flex}>
            {home}
            {about}
        </Typography>
    );
}

export default withStyles(styles)(Breadcrumb);