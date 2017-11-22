import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openSnackbar } from '../modules/app';
import { updateBaseValues, nullBaseValues } from '../modules/main';
import Typography from 'material-ui-next/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui-next/styles';
import BaseScore from '../components/BaseScore';
import { validateVector } from '../utils/utils';
import { calculateBaseScore } from '../utils/calcBaseScore';

const mapStateToProps = state => ({
    location: state.router.location,
    vector: state.main.vector,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    updateBaseValues, nullBaseValues, openSnackbar
}, dispatch);

const styles = theme => ({
});

class Home extends React.Component {

    // Check if vector was changed in the URL and set new values

    componentWillReceiveProps(nextProps) {
        if (this.props.location.hash === nextProps.location.hash) return;

        const vector = this.props.vector || '';
        const nextVector = nextProps.location.hash.substring(1); // Removes #

        if (nextVector === "") {
            return this.props.nullBaseValues();
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
        const score = calculateBaseScore(newValues);

        this.props.updateBaseValues({
            values: newValues,
            baseScores: score ? score.score : null,
            vector: score ? score.vector : null,
        });
    }

    render() {
        return (
            <div>
                <BaseScore />
            </div>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Home));