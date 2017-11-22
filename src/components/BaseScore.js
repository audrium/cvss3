import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BASE_METRICS } from '../metrics/base';
import { updateVectorURL } from '../modules/app';
import { updateBaseValues } from '../modules/main';
import { calculateBaseScore } from '../utils/calcBaseScore';
import Panel from './Panel';

const mapStateToProps = state => ({
    vector: state.main.vector,
    scores: state.main.baseScores,
    values: state.main.baseValues,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    updateVectorURL, updateBaseValues
}, dispatch);

class BaseScore extends React.Component {

    handleClick = (metric, value) => {
        const newValues = { ...this.props.values, [metric]: value };
        const score = calculateBaseScore(newValues);

        this.props.updateBaseValues({
            values: newValues,
            baseScores: score ? score.score : null,
            vector: score ? score.vector : null,
        }).then(() => {
            if (!score) return;
            this.props.updateVectorURL(score.vector);
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