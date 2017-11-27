import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ENV_METRICS } from '../metrics/environmental';
import { updateVectorURL } from '../modules/app';
import { updateEnvValues } from '../modules/main';
import { calculateEnvScore } from '../utils/score';
import Panel from './Panel';

const mapStateToProps = state => ({
    baseValues: state.main.baseValues,
    tempValues: state.main.tempValues,
    values: state.main.envValues,
    scores: state.main.envScores,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    updateVectorURL, updateEnvValues
}, dispatch);

class EnvironmentalScore extends React.Component {

    handleClick = (metric, value) => {
        const { values, baseValues, tempValues } = this.props;
        const newValues = { ...values, [metric]: value };
        const scores = calculateEnvScore(newValues, baseValues, tempValues);
        this.props.updateEnvValues({
            values: newValues,
            envScores: scores.score,
            vector: scores.vector,
        }).then(() => {
            if (!scores.vector) return;
            this.props.updateVectorURL();
        });
    }

    render() {
        const { values, scores } = this.props;
        return (
            <Panel
                title={'Environmental Score'}
                score={scores}
                values={values}
                metrics={ENV_METRICS}
                onClick={this.handleClick}
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnvironmentalScore);