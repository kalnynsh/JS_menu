"use strict";

function Container(containerElem, containerId, containerClassName) {

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

// Use
window.onload = function () {
    var content = document.querySelector('.content');
    var div = new Container('div', 'content-id', 'content-class');
    div = div.render();
    div.innerHTML = '<p>New dir element</p>';
    console.dir(div);


    content.appendChild(div);
};