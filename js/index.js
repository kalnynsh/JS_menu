"use strict";

function Container(containerElem, containerClassName, containerId) {

    this.elem = containerElem || 'div';
    if (containerId) this.id = containerId;
    if (containerClassName) this.className = containerClassName;
}

Container.prototype.render = function () {
    var containerElem = document.createElement(this.elem);
    if (this.id) containerElem.id = this.id;
    if (this.className) containerElem.classList.add(this.className);

    return containerElem;
};


function MenuItem(itemElem, itemClass, itemData, itemHref, itemHrefLabel) {
    Container.call(this, itemElem, itemClass);

    this.data = itemData || 'menu-item'; // data-item = itemData || 'menu-item'
    this.href = itemHref || '#';
    this.label = itemHrefLabel || '';
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function () {
    var elem = document.createElement(this.elem);
    elem.classList.add(this.className);
    elem.dataset.item = this.data;

    var a = document.createElement('a');
    a.href = this.href;
    a.textContent = this.label;

    elem.appendChild(a);

    return elem;
};


// Use
window.onload = function () {
    var content = document.querySelector('.content');
    var divContainer = new Container('div', 'content-id', 'content-class');
    var div = divContainer.render();
    div.innerHTML = '<h3>div element</h3>';

    for (var key in divContainer) {
        div.innerHTML += '<p>' + key + ' = ' + divContainer[key] + '</p>';
    }

    console.dir(div);



    content.appendChild(div);
};