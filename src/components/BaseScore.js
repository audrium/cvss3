import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui-next/styles';
import Card, { CardHeader, CardContent } from 'material-ui-next/Card';
import Typography from 'material-ui-next/Typography';
import List, { ListItem, ListItemText } from 'material-ui-next/List';
import Checkbox from 'material-ui-next/Checkbox';
import Avatar from 'material-ui-next/Avatar';
import Grid from 'material-ui-next/Grid';
import Tooltip from 'material-ui-next/Tooltip';
import Divider from 'material-ui-next/Divider';
import blue from 'material-ui-next/colors/blue';
import { openSnackbar } from '../modules/app';
import { baseMetrics } from '../modules/baseMetrics';
import { validateVector } from '../utils/utils';

const mapStateToProps = state => ({
    location: state.router.location,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    push, openSnackbar
}, dispatch);

const styles = theme => ({
    card: {
        minWidth: 275,
        margin: theme.spacing.unit * 1.5,
        overflowX: 'auto',
    },
    content: {
        paddingTop: 0,
    },
    listItem: {
        margin: 0,
        marginRight: 16,
        padding: 0,
    },
    tooltip: {
        maxWidth: 200, //TODO: fix width
    },
    avatar: {
        backgroundColor: blue[500],
    },
    vector: {
        paddingTop: theme.spacing.unit * 2.5,
    }
});

class BaseScore extends React.Component {

    state = {
        score: null,
        baseValues: {
            AV: null,
            AC: null,
            PR: null,
            UI: null,
            S: null,
            C: null,
            I: null,
            A: null,
        }
    }

    componentDidMount() {
        /*
            Check if vector is specified in the URL.
        */
        const { hash } = this.props.location;
        if (!hash) return;

        // Validate vector
        const vector = hash.substring(1); // Removes #
        const valid = validateVector(vector);
        if (!valid) {
            return this.props.openSnackbar('Vector is not valid');
        }

        // Parse vector and save values to state
        const values = vector.split(/[:/]/);
        if (values.length !== 18) return;

        const newValues = {
            AV: values[3] || null,
            AC: values[5] || null,
            PR: values[7] || null,
            UI: values[9] || null,
            S: values[11] || null,
            C: values[13] || null,
            I: values[15] || null,
            A: values[17] || null,
        };
        const score = this.calculateScore(newValues);
        this.setState({ baseValues: newValues, score: score });
    }

    calculateScore = (values) => {
        const { AV, AC, PR, UI, S, C, I, A } = values;
        if (!AV || !AC || !PR || !UI || !S || !C || !I || !A)
            return null;

        // TODO: implement score calc
        return { score: 7.8, vector: `CVSS:3.0/AV:${AV}/AC:${AC}/PR:${PR}/UI:${UI}/S:${S}/C:${C}/I:${I}/A:${A}` };
    }

    handleClick = (metric, value) => {
        const newValues = { ...this.state.baseValues, [metric]: value };
        const score = this.calculateScore(newValues);
        this.setState({ baseValues: newValues, score: score });
        const urlParam = score ? score.vector : null;
        this.props.push({ ...this.props.location, hash: urlParam });
    }

    render() {
        const { classes } = this.props;
        const { baseValues, score } = this.state;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            score &&
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                {score.score}
                            </Avatar>
                        }
                        subheader="Base Score"
                    />
                    <CardContent className={classes.content}>
                        <Grid container justify="flex-start" spacing={24}>
                            {baseMetrics.map(metric => (
                                <Grid item key={metric.value}>
                                    <Tooltip title={metric.description} placement="bottom">
                                        <Typography type="caption" >{metric.title}</Typography>
                                    </Tooltip>

                                    <List>
                                        {metric.options.map(op => (
                                            <ListItem
                                                key={op.value}
                                                dense
                                                button
                                                onClick={() => this.handleClick([metric.value], op.value)}
                                                className={classes.listItem}
                                            >
                                                <Checkbox
                                                    checked={baseValues[metric.value] === op.value}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                                <ListItemText className={classes.listItem} primary={op.label} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            ))}
                        </Grid>
                        {score &&
                            <div>
                                <Divider light />
                                <Typography type="caption" gutterBottom className={classes.vector}>
                                    Vector: {score.vector}
                                </Typography>
                            </div>
                        }
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(BaseScore));