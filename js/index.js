"use strict";

// Constractor
var _createClass = (function () {

    function defineProperties(target, props) {
        for (var i = 0; i < props.lenth; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;

            if ("value" in descriptor) descriptor.writable = true;

            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);

        return Constructor;
    };

})();

// Check if have self=this and typeof call
function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
        );
    }
    return (call && typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
            "Super expression must either be null or function, not " +
            typeof superClass
        );
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (superClass) {
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Container = (function () {
    function Container(_elemName, _id, _className) {
        _classCallCheck(this, Container);

        this.elemName = _elemName || "div";
        this.id = _id || "";
        this.className = _className || "";
    }

    _createClass(Container, [{
        key: "render",
        value: function render() {
            var elem = document.createElement(this.elemName);
            if (this.id) elem.id = this.id;
            if (this.className) elem.classList.add(this.className);

            return elem;
        }
    }]);

    return Container;
})();