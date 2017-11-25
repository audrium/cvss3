import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TEMPORAL_METRICS } from '../metrics/temporal';
import { updateVectorURL } from '../modules/app';
import { updateTempValues } from '../modules/main';
import { calculateTempScore } from '../utils/score';
import Panel from './Panel';

const mapStateToProps = state => ({
    baseScores: state.main.baseScores,
    values: state.main.tempValues,
    scores: state.main.tempScores,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    updateVectorURL, updateTempValues
}, dispatch);

class TemporalScore extends React.Component {

    handleClick = (metric, value) => {
        const newValues = { ...this.props.values, [metric]: value };
        const scores = calculateTempScore(newValues, this.props.baseScores);

        this.props.updateTempValues({
            values: newValues,
            tempScores: scores.score,
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
                title={'Temporal Score'}
                score={scores}
                values={values}
                metrics={TEMPORAL_METRICS}
                onClick={this.handleClick}
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemporalScore);