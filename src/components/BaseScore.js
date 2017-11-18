import React from 'react';
import { withStyles } from 'material-ui-next/styles';
import Card, { CardHeader, CardContent } from 'material-ui-next/Card';
import Typography from 'material-ui-next/Typography';
import List, { ListItem, ListItemText } from 'material-ui-next/List';
import Checkbox from 'material-ui-next/Checkbox';
import Avatar from 'material-ui-next/Avatar';
import Grid from 'material-ui-next/Grid';
import Tooltip from 'material-ui-next/Tooltip';
import blue from 'material-ui-next/colors/blue';
import { baseMetrics } from '../modules/baseMetrics';

const styles = theme => ({
    card: {
        minWidth: 275,
        margin: theme.spacing.unit * 1.5,
        overflowX: 'auto',
    },
    content: {
        paddingTop: 0,
    },
    title: {
        marginBottom: 16,
        fontSize: 16,
        color: theme.palette.text.secondary,
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
    }
});

class BaseScore extends React.Component {

    state = {
        AV: null,
        AC: null,
        PR: null,
        UI: null,
        S: null,
        C: null,
        I: null,
        A: null,
    }

    calculateScore = () => {
        const { AV, AC, PR, UI, S, C, I, A } = this.state;
        if (!AV || !AC || !PR || !UI || !S || !C || !I || !A)
            return null;

        // TODO: implement score calc
        return 7.8;
    }

    render() {
        const { classes } = this.props;
        const score = this.calculateScore();
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            score &&
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                7.8
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
                                                onClick={() => this.setState({ [metric.value]: op.value })}
                                                className={classes.listItem}
                                            >
                                                <Checkbox
                                                    checked={this.state[metric.value] === op.value}
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
                    </CardContent>
                </Card>
            </div>
        );
    }
}
export default withStyles(styles)(BaseScore);