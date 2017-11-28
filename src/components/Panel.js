import React from 'react';
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

const Panel = (props) => {
    const { classes, title, score, vector, values, metrics } = props;
    const showFooter = props.showFooter || false;
    return (
        <div>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        score &&
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            {score.toFixed(1)}
                        </Avatar>
                    }
                    subheader={title}
                />
                <CardContent className={classes.content}>
                    <Grid container justify="flex-start" spacing={24}>
                        {metrics.map(metric => (
                            <Grid item key={metric.name}>
                                <Tooltip title={metric.description} placement="bottom">
                                    <Typography type="caption" >{metric.title}</Typography>
                                </Tooltip>

                                <List>
                                    {metric.options.map(op => (
                                        <ListItem
                                            key={op.value}
                                            dense
                                            button
                                            onClick={() => props.onClick([metric.name], op.value)}
                                            className={classes.listItem}
                                        >
                                            <Checkbox
                                                checked={values[metric.name] === op.value}
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
                    {(showFooter && vector) &&
                        <div>
                            <Divider light />
                            <Typography type="caption" gutterBottom className={classes.vector}>
                                Vector: {vector}
                            </Typography>
                        </div>
                    }
                </CardContent>
            </Card>
        </div>
    );
}

export default withStyles(styles)(Panel);