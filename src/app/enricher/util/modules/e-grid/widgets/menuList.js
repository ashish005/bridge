"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var component_1 = require("./component");
var context_1 = require("../context/context");
var utils_1 = require("../utils");
var menuItemComponent_1 = require("./menuItemComponent");
var MenuList = (function (_super) {
    __extends(MenuList, _super);
    function MenuList() {
        var _this = _super.call(this, MenuList.TEMPLATE) || this;
        _this.timerCount = 0;
        return _this;
    }
    MenuList.prototype.clearActiveItem = function () {
        this.removeActiveItem();
        this.removeOldChildPopup();
    };
    MenuList.prototype.addMenuItems = function (menuItems, defaultMenuItems) {
        var _this = this;
        if (utils_1.Utils.missing(menuItems)) {
            return;
        }
        menuItems.forEach(function (listItem) {
            if (listItem === 'separator') {
                _this.addSeparator();
            }
            else {
                var menuItem;
                if (typeof listItem === 'string') {
                    menuItem = defaultMenuItems[listItem];
                }
                else {
                    menuItem = listItem;
                }
                _this.addItem(menuItem);
            }
        });
    };
    MenuList.prototype.addItem = function (params) {
        var _this = this;
        var cMenuItem = new menuItemComponent_1.MenuItemComponent(params);
        this.context.wireBean(cMenuItem);
        this.getGui().appendChild(cMenuItem.getGui());
        cMenuItem.addEventListener(menuItemComponent_1.MenuItemComponent.EVENT_ITEM_SELECTED, function (event) {
            if (params.childMenu) {
                _this.showChildMenu(params, cMenuItem);
            }
            else {
                _this.dispatchEvent(menuItemComponent_1.MenuItemComponent.EVENT_ITEM_SELECTED, event);
            }
        });
        cMenuItem.addGuiEventListener('mouseenter', this.mouseEnterItem.bind(this, params, cMenuItem));
        cMenuItem.addGuiEventListener('mouseleave', function () { return _this.timerCount++; });
        if (params.childMenu) {
            this.addDestroyFunc(function () { return params.childMenu.destroy(); });
        }
    };
    MenuList.prototype.mouseEnterItem = function (menuItemParams, menuItem) {
        if (menuItemParams.disabled) {
            return;
        }
        if (this.activeMenuItemParams !== menuItemParams) {
            this.removeOldChildPopup();
        }
        this.removeActiveItem();
        this.activeMenuItemParams = menuItemParams;
        this.activeMenuItem = menuItem;
        utils_1.Utils.addCssClass(this.activeMenuItem.getGui(), 'ag-menu-option-active');
        if (menuItemParams.childMenu) {
            this.addHoverForChildPopup(menuItemParams, menuItem);
        }
    };
    MenuList.prototype.removeActiveItem = function () {
        if (this.activeMenuItem) {
            utils_1.Utils.removeCssClass(this.activeMenuItem.getGui(), 'ag-menu-option-active');
            this.activeMenuItem = null;
            this.activeMenuItemParams = null;
        }
    };
    MenuList.prototype.addHoverForChildPopup = function (menuItemParams, menuItem) {
        var _this = this;
        var timerCountCopy = this.timerCount;
        setTimeout(function () {
            var shouldShow = timerCountCopy === _this.timerCount;
            var showingThisMenu = _this.showingChildMenu === menuItemParams.childMenu;
            if (shouldShow && !showingThisMenu) {
                _this.showChildMenu(menuItemParams, menuItem);
            }
        }, 500);
    };
    MenuList.prototype.showChildMenu = function (menuItemParams, menuItem) {
        this.removeOldChildPopup();
        var ePopup = utils_1.Utils.loadTemplate('<div class="ag-menu"></div>');
        ePopup.appendChild(menuItemParams.childMenu.getGui());
        this.childPopupRemoveFunc = this.popupService.addAsModalPopup(ePopup, true);
        this.popupService.positionPopupForMenu({
            eventSource: menuItem.getGui(),
            ePopup: ePopup
        });
        this.showingChildMenu = menuItemParams.childMenu;
    };
    MenuList.prototype.addSeparator = function () {
        this.getGui().appendChild(utils_1.Utils.loadTemplate(MenuList.SEPARATOR_TEMPLATE));
    };
    MenuList.prototype.removeOldChildPopup = function () {
        if (this.childPopupRemoveFunc) {
            this.showingChildMenu.clearActiveItem();
            this.childPopupRemoveFunc();
            this.childPopupRemoveFunc = null;
            this.showingChildMenu = null;
        }
    };
    MenuList.prototype.destroy = function () {
        this.removeOldChildPopup();
        _super.prototype.destroy.call(this);
    };
    MenuList.TEMPLATE = '<div class="ag-menu-list"></div>';
    MenuList.SEPARATOR_TEMPLATE = '<div class="ag-menu-separator">' +
        '  <span class="ag-menu-separator-cell"></span>' +
        '  <span class="ag-menu-separator-cell"></span>' +
        '  <span class="ag-menu-separator-cell"></span>' +
        '  <span class="ag-menu-separator-cell"></span>' +
        '</div>';
    __decorate([
        context_1.Autowired('context')
    ], MenuList.prototype, "context");
    __decorate([
        context_1.Autowired('popupService')
    ], MenuList.prototype, "popupService");
    return MenuList;
}(component_1.Component));
exports.MenuList = MenuList;
//# sourceMappingURL=menuList.js.map