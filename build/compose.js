"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.compose = compose;
function compose() {
    for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
        fns[_key] = arguments[_key];
    }

    return function () {
        if (fns.length === 0) {
            return arguments.length <= 0 ? undefined : arguments[0];
        }

        var last = fns[fns.length - 1];
        var rest = fns.slice(0, -1);

        return rest.reduceRight(function (composed, f) {
            return f(composed);
        }, last.apply(undefined, arguments));
    };
};