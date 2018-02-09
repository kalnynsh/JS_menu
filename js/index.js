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
    return (call && (typeof call === "object" || typeof call === "function")) ? call : self;
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


var MenuItem = (function (_Container) {
    _inherits(MenuItem, _Container);

    function MenuItem(itemElem, itemClassName, itemHref, itemHrefLabel) {
        _classCallCheck(this, MenuItem);

        var _this = _possibleConstructorReturn(
            this,
            (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this)
        );
        _this.elemName = itemElem || 'li';
        _this.className = itemClassName || 'menu-item';
        _this.href = itemHref || '#';
        _this.hrefLabel = itemHrefLabel || 'Link';

        return _this;
    }

    _createClass(MenuItem, [{
        key: "render",
        value: function render() {
            var elem = document.createElement(_this.elemName);
            var a = document.createElement('a');
            a.href = _this.href;
            a.textContent = _this.hrefLabel;

            elem.appendChild(a);

            return elem;
        }
    }]);

    return MenuItem;

})(Container);


var Menu = (function (_Container2) {
    _inherits(Menu, _Container2);

    function Menu(menuElem, menuId, menuClass, menuItems) {
        _classCallCheck(this, Menu);

        var _this2 = _possibleConstructorReturn(
            this,
            (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this)
        );

        _this2.elemName = menuElem || "ul";
        _this2.id = menuId;
        _this2.className = menuClass || "";
        _this2.items = menuItems;

        return _this2;
    }

    _createClass(Menu, [{
        key: "render",
        value: function render() {
            var ul = document.createElement(_this2.elemName);
            ul.id = _this2.id;
            ul.classList.add(_this2.className);
            for (var i = 0; i < _this2.items.length; i++) {
                if (_this2.items[i] instanceof MenuItem) {
                    ul.appendChild(_this2.items[i].render());
                }
            }

            return ul;
        }
    }]);

    return Menu;
})(Container);

//