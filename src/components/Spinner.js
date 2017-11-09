import React from 'react';
import { withStyles } from 'material-ui-next/styles';
import { CircularProgress } from 'material-ui-next/Progress';

const styles = theme => ({
    spinner: {
        width: '100px',
        height: '100px',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto'
    },
});

const Spinner = (props) => {
    return <CircularProgress size={50} className={props.classes.spinner} />;
}

export default withStyles(styles)(Spinner);