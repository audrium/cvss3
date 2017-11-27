import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BASE_METRICS } from '../metrics/base';
import { updateVectorURL } from '../modules/app';
import { updateBaseValues } from '../modules/main';
import { calculateBaseScore, calculateTempScore, calculateEnvScore } from '../utils/score';
import Panel from './Panel';

const mapStateToProps = state => ({
    vector: state.main.baseVector,
    scores: state.main.baseScores,
    values: state.main.baseValues,
    tempValues: state.main.tempValues,
    envValues: state.main.envValues
});

const mapDispatchToProps = dispatch => bindActionCreators({
    updateVectorURL, updateBaseValues
}, dispatch);

class BaseScore extends React.Component {

    handleClick = (metric, value) => {
        const { tempValues, envValues } = this.props;
        const newValues = { ...this.props.values, [metric]: value };
        const score = calculateBaseScore(newValues);

        this.props.updateBaseValues({
            values: newValues,
            baseScores: score ? score.score : null,
            vector: score ? score.vector : null,
            tempScores: score ? calculateTempScore(tempValues, score.score).score : null,
            envScores: score ? calculateEnvScore(envValues, newValues, tempValues).score : null,
        }).then(() => {
            if (!score) return;
            this.props.updateVectorURL();
        });
    }

    render() {
        const { values, scores, vector } = this.props;
        return (
            <Panel
                title={'Base Score'}
                score={scores}
                vector={vector}
                values={values}
                metrics={BASE_METRICS}
                onClick={this.handleClick}
                showFooter={true}
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BaseScore);