import React from 'react';
import { withStyles } from 'material-ui-next/styles';
import { LinearProgress } from 'material-ui-next/Progress';

const styles = theme => ({
    progress: {
        height: '2px',
        backgroundColor: 'black'
    }
});

const Progress = (props) => {
    return <LinearProgress mode="query" className={props.classes.progress}/>;
}

export default withStyles(styles)(Progress);