/// <reference path="typings/main.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'react', 'react-dom'], factory);
    }
})(function (require, exports) {
    var React = require('react');
    var ReactDOM = require('react-dom');
    //import { createStore } from 'redux'
    //import Counter from 'Counter'
    //import counter from 'reducers'
    var Counter = (function (_super) {
        __extends(Counter, _super);
        function Counter(props) {
            _super.call(this, props);
            this.incrementAsync = this.incrementAsync.bind(this);
            this.incrementIfOdd = this.incrementIfOdd.bind(this);
        }
        Counter.prototype.incrementIfOdd = function () {
            if (this.props.value % 2 !== 0) {
                this.props.onIncrement();
            }
        };
        Counter.prototype.incrementAsync = function () {
            setTimeout(this.props.onIncrement, 1000);
        };
        Counter.prototype.render = function () {
            return (React.createElement("p", null, "Clicked: ", this.props.value, " times", ' ', React.createElement("button", {"onClick": this.props.onIncrement}, "+"), ' ', React.createElement("button", {"onClick": this.props.onDecrement}, "-"), ' ', React.createElement("button", {"onClick": this.incrementIfOdd}, "Increment if odd"), ' ', React.createElement("button", {"onClick": this.incrementAsync}, "Increment async")));
        };
        return Counter;
    })(React.Component);
    //const store = createStore(counter)
    var rootEl = document.getElementById('root');
    //    < Counter
    //value = { store.getState() }
    //onIncrement = {() => store.dispatch({ type: 'INCREMENT' })}
    //onDecrement = {() => store.dispatch({ type: 'DECREMENT' })}
    ///>,
    function render() {
        ReactDOM.render(React.createElement(Counter, {"value": 42, "onIncrement": function () { }, "onDecrement": function () { }}), rootEl);
    }
    render();
});
//store.subscribe(render)
//# sourceMappingURL=index.js.map