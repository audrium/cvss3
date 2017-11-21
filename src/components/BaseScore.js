import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { BASE_METRICS } from '../modules/baseMetrics';
import { openSnackbar } from '../modules/app';
import { validateVector } from '../utils/utils';
import { calcBaseScore } from '../utils/calcBaseScore';
import Panel from './Panel';

const mapStateToProps = state => ({
    location: state.router.location,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    push, openSnackbar
}, dispatch);

const INITIAL_VALUES = {
    AV: null,
    AC: null,
    PR: null,
    UI: null,
    S: null,
    C: null,
    I: null,
    A: null,
};

class BaseScore extends React.Component {

    state = {
        score: null,
        baseValues: { ...INITIAL_VALUES }
    }

    componentWillReceiveProps(nextProps) {
        /*
            Check if vector was changed in the URL and set new values
        */
        const { score } = this.state;
        const vector = score ? score.vector : '';
        const nextVector = nextProps.location.hash.substring(1); // Removes #

        if (nextVector === "") {
            return this.setState({ baseValues: { ...INITIAL_VALUES }, score: null });
        }

        if (nextVector !== vector) {
            this.setVector(nextVector);
        }
    }

    componentDidMount() {
        /*
            Check if vector is specified in the URL on initial page load
        */
        const { hash } = this.props.location;
        if (!hash) return;

        const vector = hash.substring(1); // Removes #
        this.setVector(vector);
    }

    setVector(vector) {
        // Validate vector
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

        const score = calcBaseScore(values);
        return { score: score, vector: `CVSS:3.0/AV:${AV}/AC:${AC}/PR:${PR}/UI:${UI}/S:${S}/C:${C}/I:${I}/A:${A}` };
    }

    handleClick = (metric, value) => {
        const newValues = { ...this.state.baseValues, [metric]: value };
        const score = this.calculateScore(newValues);
        this.setState({ baseValues: newValues, score: score }, () => {
            if (!score) return;
            this.props.push({ ...this.props.location, hash: score.vector });
        });
    }

    render() {
        const { baseValues, score } = this.state;
        return (
            <Panel
                score={score}
                values={baseValues}
                metrics={BASE_METRICS}
                onClick={this.handleClick}
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BaseScore);