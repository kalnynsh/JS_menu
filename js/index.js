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
    elem.dataset.item = this.data || '';

    var a = document.createElement('a');
    a.href = this.href;
    a.textContent = this.label;

    elem.appendChild(a);

    return elem;
};

// 1 level Menu
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


// 2 level Menu2Levels
function Menu2Levels(menuElem, menuClass, menuId, menuItemsLevel1, menuItemsLevel2) {
    Container.call(this, menuElem, menuClass, menuId);

    this.items1 = menuItemsLevel1;
    this.items2 = menuItemsLevel2;
}

Menu2Levels.prototype = Object.create(Container.prototype);
Menu2Levels.prototype.constructor = Menu2Levels;

Menu2Levels.prototype.render = function () {
    var elemName = this.elem || "ul";
    var elem = document.createElement(elemName);
    var ul2 = document.createElement("ul");
    var liL1;

    if (this.id) elem.id = this.id;
    if (this.className) elem.classList.add(this.className);

    for (var i = 0; i < this.items1.length; i++) {
        if (this.items1[i] instanceof MenuItem) {
            liL1 = this.items1[i].render();
        }

        if (this.items2[i].length > 0) {
            for (var j = 0; j < this.items2[i].length; j++) {
                if (this.items2[i][j] instanceof MenuItem) {
                    ul2.appendChild(this.items2[i][j].render());
                }
            }
            liL1.appendChild(ul2);

            elem.appendChild(liL1);
        }
    }

    return elem;
};


// Use
window.onload = function () {
    var content = document.querySelector('.content');

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

    // 1 level Menu test begin
    var itemA1 = new MenuItem('li', 'menu1__item', 'home', '/', 'Главная');
    var itemA2 = new MenuItem('li', 'menu1__item', 'catalog', '/catalog', 'Каталог');
    var itemA3 = new MenuItem('li', 'menu1__item', 'about', '/about', 'О нас');
    var itemArrayA = [itemA1, itemA2, itemA3];
    var menu1 = new Menu('ul', 'menu1', '', itemArrayA);

    content.append(menu1.render());

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

    var itemB1 = new MenuItem('li', 'breadcrumbs__item', 'home', '/', 'Главная');
    var itemB2 = new MenuItem('li', 'breadcrumbs__item', 'catalog', '/catalog', 'Каталог');
    var itemB3 = new MenuItem('li', 'breadcrumbs__item', 'about', '/about', 'О нас');

    var itemArray = [itemB1, itemB2, itemB3];
    var menuBreadcrumbs = new Menu('ul', 'breadcrumbs', '', itemArray);

    content.append(menuBreadcrumbs.render());
    // 1 level Menu test end

    // Menu2Levels test
    var menuL1ItemsArray = [
        [],
        []
    ];
    var itemL1n1 = new MenuItem('li', 'kitchen-menu__item1', 'russian', '#', 'Русская кухня');
    var itemL1n2 = new MenuItem('li', 'kitchen-menu__item1', 'ukrainian', '#', 'Украинская кухня');
    menuL1ItemsArray.concat(itemL1n1, itemL1n2);

    var menuL2ItemsArray = [];
    // [0][i]
    var itemL2n11 = new MenuItem('li', 'kitchen-menu__item2', 'foodstuff_11', '#', 'Бефстроганов');
    menuL2ItemsArray[0][0] = itemL2n11;

    var itemL2n12 = new MenuItem('li', 'kitchen-menu__item2', 'foodstuff_12', '#', 'Гусь с яблоками');
    menuL2ItemsArray[0][1] = itemL2n12;

    var itemL2n13 = new MenuItem('li', 'kitchen-menu__item2', 'foodstuff_13', '#', 'Крупеник новгородский');
    menuL2ItemsArray[0][2] = itemL2n13;

    var itemL2n14 = new MenuItem('li', 'kitchen-menu__item2', 'foodstuff_14', '#', 'Раки по-русски');
    menuL2ItemsArray[0][3] = itemL2n14;

    // [1][i] 
    var itemL2n21 = new MenuItem('li', 'kitchen-menu__item2', 'foodstuff_21', '#', 'Вареники');
    menuL2ItemsArray[1][0] = itemL2n21;

    var itemL2n22 = new MenuItem('li', 'kitchen-menu__item2', 'foodstuff_22', '#', 'Жаркое по-харьковски');
    menuL2ItemsArray[1][1] = itemL2n22;

    var itemL2n23 = new MenuItem('li', 'kitchen-menu__item2', 'foodstuff_23', '#', 'Капустняк черниговский');
    menuL2ItemsArray[1][2] = itemL2n23;

    var itemL2n24 = new MenuItem('li', 'kitchen-menu__item2', 'foodstuff_24', '#', 'Потапцы с помидорами');
    menuL2ItemsArray[1][3] = itemL2n24;

    // for (var i = 0; i < menuL2ItemsArray.length; i++) {
    //     for (var j = 0; i < menuL2ItemsArray[i].length; j++) {
    //         menuL2ItemsArray[i][j] = 
    //     }
    // }

    var muneKitchens = new Menu2Levels(
        'ul', 'kitchen-menu', 'kitchen-menu-id', menuL1ItemsArray, menuL2ItemsArray);

    content.append(muneKitchens.render());

};