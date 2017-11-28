import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Snackbar from './components/Snackbar';
import { hideSnackbar } from './modules/app';

const mapStateToProps = state => ({
    app: state.app,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    hideSnackbar
}, dispatch);

const App = (props) => {
    const { snackbarShown, snackbarMessage } = props.app;
    return (
        <div>
            <Header />
            <Router basename="/cvss3">
                <Route exact path="/" component={Home} />
            </Router>
            <Snackbar
                open={snackbarShown}
                message={snackbarMessage}
                onClose={props.hideSnackbar}
            />
        </div>
    );
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));