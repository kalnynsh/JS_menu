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

Container.prototype.remove = function () {
    var elem;
    if (this.id) {
        elem = document.getElementById(this.id);
        elem.remove();
        return true;
    } else if (this.className) {
        elem = document.querySelector("." + this.className);
        elem.remove();
        return true;
    }
    console.log('For remove element must have id or class name');
    return false;
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


function Menu(menuElem, menuClass, menuId, menuItems) {
    Container.call(this, menuElem, menuClass, menuId);

    this.items = menuItems;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function () {
    var elemName = this.elem || 'ul';
    var elem = document.createElement(elemName);

    if (this.id) elem.id = this.id;
    if (this.className) elem.classList.add(this.className);

    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i] instanceof MenuItem) {
            elem.appendChild(this.items[i].render());
        }
    }

    return elem;
};


// Use
window.onload = function () {
    var content = document.querySelector('.content');

    var item1 = new MenuItem('li', 'main-menu__item', 'home', '/', 'Главная');
    var item2 = new MenuItem('li', 'main-menu__item', 'catalog', '/catalog', 'Каталог');
    var item3 = new MenuItem('li', 'main-menu__item', 'about', '/about', 'О нас');

    var menu = new Menu('ul', 'main-menu', 'menu-id', [
        item1, item2, item3
    ]);

    content.appendChild(menu.render());
    // For MenuItems only remove first query selected element by class
    // setTimeout(function () {
    //     item2.remove();
    // }, 2000);


    // Container test - begin
    // var divContainer = new Container('div', 'property', 'div-id');
    // var div = divContainer.render();

    // for (var key in divContainer) {
    //     div.innerHTML += '<p>' + key + ' = ' + divContainer[key] + '</p>';
    // }
    // content.appendChild(div);

    // console.dir(divContainer);
    // setTimeout(function () {
    //     divContainer.remove();
    // }, 2000);
    // Container test - end

};