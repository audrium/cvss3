import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openSnackbar } from '../modules/app';
import { setValues, clearValues } from '../modules/main';
import Typography from 'material-ui-next/Typography';
import { withStyles } from 'material-ui-next/styles';
import BaseScore from '../components/BaseScore';
import TemporalScore from '../components/TemporalScore';
import EnvScore from '../components/EnvScore';
import { validateVector, parseVector } from '../utils/utils';
import { calculateBaseScore, calculateTempScore, calculateEnvScore } from '../utils/score';
import blue from 'material-ui-next/colors/blue';

const mapStateToProps = state => ({
    location: state.router.location,
    vector: state.main.vector,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setValues, clearValues, openSnackbar
}, dispatch);

const styles = theme => ({
    link: {
        color: blue[600]
    },
    infoBar: {
        marginLeft: 12
    }
});

class Home extends React.Component {

    // Check if vector was changed in the URL and set new values

    componentWillReceiveProps(nextProps) {
        if (this.props.location.hash === nextProps.location.hash) return;

        const vector = this.props.vector || '';
        const nextVector = nextProps.location.hash.substring(1); // Removes #

        if (nextVector === "") {
            return this.props.clearValues();
        }

        if (nextVector !== vector) {
            return this.setVector(nextVector);
        }
    }

    // Check if vector is specified in the URL on initial page load

    componentDidMount() {
        const { hash } = this.props.location;
        if (!hash) return;

        const vector = hash.substring(1); // Removes #
        this.setVector(vector);
    }

    setVector(vector) {
        // Parse vector and save values to state
        const valid = validateVector(vector);
        if (!valid) {
            return this.props.openSnackbar('Vector is not valid');
        }

        const values = parseVector(vector);
        const base = calculateBaseScore(values.baseValues);
        const temp = calculateTempScore(values.tempValues, base.score);
        const env = calculateEnvScore(values.envValues, values.baseValues, values.tempValues);

        this.props.setValues({
            vector: base.vector ? base.vector + temp.vector + env.vector : null,

            baseVector: base.vector,
            baseScores: base.score,
            baseValues: values.baseValues,

            tempVector: temp.vector,
            tempScores: temp.score,
            tempValues: values.tempValues,

            envVector: env.vector,
            envScores: env.score,
            envValues: values.envValues,
        });
    }

    render() {
        const { vector, classes } = this.props;
        return (
            <div>
                <BaseScore />
                {vector && <TemporalScore />}
                {vector && <EnvScore />}
                <Typography type="caption" className={classes.infoBar}>
                    CVSS (Common Vulnerability Scoring System) is a free and open standard. It is owned and managed by <a target="_blank" rel="noopener noreferrer" href="https://www.first.org/cvss/specification-document" className={classes.link}>FIRST.Org</a>.
                </Typography>
            </div>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Home));