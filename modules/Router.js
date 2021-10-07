import React from "react";
import PropTypes from "prop-types"; //타입을 확인함.
import warning from "tiny-warning";

import HistoryContext from "./HistoryContext.js";
import RouterContext from "./RouterContext.js";

/**
 * The public API for putting history on context.
 */
class Router extends React.Component {
    static computeRootMatch(pathname) { //경로명?
        return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
    }

    constructor(props) {
        super(props);

        this.state = {
            location: props.history.location
        };

        // This is a bit of a hack. We have to start listening for location
        // changes here in the constructor in case there are any <Redirect>s
        // on the initial render. If there are, they will replace/push when
        // they mount and since cDM fires in children before parents, we may
        // get a new location before the <Router> is mounted.
        this._isMounted = false;
        this._pendingLocation = null;

        if (!props.staticContext) {
            this.unlisten = props.history.listen(location => {
                if (this._isMounted) {
                    this.setState({ location });
                } else {
                    this._pendingLocation = location;
                }
            });
        }
    }

    componentDidMount() { //생성될때
        this._isMounted = true;

        if (this._pendingLocation) {
            this.setState({ location: this._pendingLocation });
        }
    }

    componentWillUnmount() { //제거될때
        if (this.unlisten) this.unlisten();
    }

    render() {
        return (
            <RouterContext.Provider
                value={{
                    history: this.props.history,
                    location: this.state.location,
                    match: Router.computeRootMatch(this.state.location.pathname),
                    staticContext: this.props.staticContext
                }}
            >
                <HistoryContext.Provider
                    children={this.props.children || null}
                    value={this.props.history}
                />
            </RouterContext.Provider>
        );
    }
}

let __DEV__;
if (__DEV__) {
    Router.propTypes = {
        children: PropTypes.node,
        history: PropTypes.object.isRequired,
        staticContext: PropTypes.object
    };

    Router.prototype.componentDidUpdate = function(prevProps) {
        warning(
            prevProps.history === this.props.history,
            "You cannot change <Router history>"
        );
    };
}

export default Router;
