import React from "react";
import { isValidElementType } from "react-is";
//react-is:이 패키지를 사용하면 임의 값을 테스트하여 특정 반응 요소 유형인지 확인할 수 있습니다.
import PropTypes from "prop-types"; //타입을 확인함.
import invariant from "tiny-invariant";
import warning from "tiny-warning";

import RouterContext from "./RouterContext.js";
import matchPath from "./matchPath.js";

function isEmptyChildren(children) {
    return React.Children.count(children) === 0;
}

function evalChildrenDev(children, props, path) {
    const value = children(props);

    warning(
        value !== undefined,
        "You returned `undefined` from the `children` function of " +
        `<Route${path ? ` path="${path}"` : ""}>, but you ` +
        "should have returned a React element or `null`"
    );

    return value || null;
}

/**
 * The public API for matching a single path and rendering.
 */
class Route extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    invariant(context, "You should not use <Route> outside a <Router>");
                    //invariant: 불변의
                    const location = this.props.location || context.location;
                    const match = this.props.computedMatch?
                        this.props.computedMatch // <Switch> already computed the match for us
                        : this.props.path
                            ? matchPath(location.pathname, this.props)
                            : context.match;

                    const props = { ...context, location, match };

                    let { children, component, render } = this.props;

                    // Preact uses an empty array as children by
                    // default, so use null if that's the case.
                    if (Array.isArray(children) && children.length === 0) {
                        children = null;
                    }

                    let __DEV__;
                    return (
                        <RouterContext.Provider value={props}>
                            {props.match
                                ? children
                                    ? typeof children === "function"
                                        ? __DEV__
                                            ? evalChildrenDev(children, props, this.props.path)
                                            : children(props)
                                        : children
                                    : component
                                        ? React.createElement(component, props)
                                        : render
                                            ? render(props)
                                            : null
                                : typeof children === "function"
                                    ? __DEV__
                                        ? evalChildrenDev(children, props, this.props.path)
                                        : children(props)
                                    : null}
                        </RouterContext.Provider>
                    );
                }}
            </RouterContext.Consumer>
        );
    }
}

let __DEV__;
if (__DEV__) {
    Route.propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        //PropTypes.node & func 타입검사 하는듯.
        component: (props, propName) => {
            if (props[propName] && !isValidElementType(props[propName])) {
                return new Error(
                    `Invalid prop 'component' supplied to 'Route': the prop is not a valid React component`
                );
            }
        },
        exact: PropTypes.bool,
        location: PropTypes.object,
        path: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ]),
        render: PropTypes.func,
        sensitive: PropTypes.bool,
        strict: PropTypes.bool
    };

    Route.prototype.componentDidMount = function() { //렌더링을 생성할때
        warning(
            !(
                this.props.children &&
                !isEmptyChildren(this.props.children) &&
                this.props.component
            ),
            "You should not use <Route component> and <Route children> in the same route; <Route component> will be ignored"
        );

        warning(
            !(
                this.props.children &&!isEmptyChildren(this.props.children) && this.props.render
                //이 3개의 조건에 중족하지 않다면 아래의 메시지를 출력한다.
            ),
            "You should not use <Route render> and <Route children> in the same route; <Route render> will be ignored"
        );

        warning(
            !(this.props.component && this.props.render),
            "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"
        );
    };

    Route.prototype.componentDidUpdate = function(prevProps) { //렌더링을 업데이트 할때
        warning(
            !(this.props.location && !prevProps.location),
            '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
        );

        warning(
            !(!this.props.location && prevProps.location),
            '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
        );
    };
}

export default Route;
