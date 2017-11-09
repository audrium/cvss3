import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Snackbar from './components/Snackbar';
import Progress from './components/Progress';
import { hideSnackbar } from './modules/app';

const mapStateToProps = state => ({
    app: state.app,
    router: state.router,
    loading: false
});

const mapDispatchToProps = dispatch => bindActionCreators({
    hideSnackbar
}, dispatch);

class App extends Component {

    state = {
        drawerOpen: false,
    }

    render() {
        const { loading } = this.props;
        return (
            <div>
                {loading && <Progress />}

                <Header
                    open={this.state.drawerOpen}
                    handleDrawerOpen={() => this.setState({ drawerOpen: true })}
                    handleDrawerClose={() => this.setState({ drawerOpen: false })}
                    location={this.props.router.location.pathname}
                />

                <div>
                    <Route exact path="/" component={Home} />
                </div>

                <Snackbar
                    open={this.props.app.snackbarShown}
                    message={this.props.app.snackbarMessage}
                    onClose={this.props.hideSnackbar}
                />
            </div>
        );
    }

}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));