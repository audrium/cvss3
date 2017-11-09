import React from 'react';
import Typography from 'material-ui-next/Typography';
import Button from 'material-ui-next/Button';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui-next/styles';

const styles = theme => ({
    container: {
        height: 'calc(100vh - 76px)'
    },
    textContainer: {
        color: 'rgba(0, 0, 0, 0.54)',
        position: 'relative',
        top: '30%',
        textAlign: 'center',
        verticalAlign: 'middle',
        transform: 'translateY(-30 %)'
    },
    button: {
        margin: theme.spacing.unit,
    },
    link: {
        textDecoration: 'none'
    }
});

const Home = (props) => {
    const { classes } = props;
    return (
        <div className={classes.container}>
            <div className={classes.textContainer}>
                <Typography type="display1" gutterBottom>Common Vulnerability Scoring System Version 3.0 Calculator</Typography>
            </div>
        </div>
    );
}

export default withStyles(styles)(Home);