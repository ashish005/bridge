"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var context_1 = require("../context/context");
var utils_1 = require("../utils");
var context_2 = require("../context/context");
var StandardMenuFactory = (function () {
    function StandardMenuFactory() {
    }
    StandardMenuFactory.prototype.showMenuAfterMouseEvent = function (column, mouseEvent) {
        var _this = this;
        this.showPopup(column, function (eMenu) {
            _this.popupService.positionPopupUnderMouseEvent({
                mouseEvent: mouseEvent,
                ePopup: eMenu
            });
        });
    };
    StandardMenuFactory.prototype.showMenuAfterButtonClick = function (column, eventSource) {
        var _this = this;
        this.showPopup(column, function (eMenu) {
            _this.popupService.positionPopupUnderComponent({ eventSource: eventSource, ePopup: eMenu, keepWithinBounds: true });
        });
    };
    StandardMenuFactory.prototype.showPopup = function (column, positionCallback) {
        var filterWrapper = this.filterManager.getOrCreateFilterWrapper(column);
        var eMenu = document.createElement('div');
        utils_1.Utils.addCssClass(eMenu, 'ag-menu');
        eMenu.appendChild(filterWrapper.gui);
        // need to show filter before positioning, as only after filter
        // is visible can we find out what the width of it is
        var hidePopup = this.popupService.addAsModalPopup(eMenu, true);
        positionCallback(eMenu);
        if (filterWrapper.filter.afterGuiAttached) {
            var params = {
                hidePopup: hidePopup
            };
            filterWrapper.filter.afterGuiAttached(params);
        }
    };
    StandardMenuFactory.prototype.isMenuEnabled = function (column) {
        // for standard, we show menu if filter is enabled, and he menu is not suppressed
        return this.gridOptionsWrapper.isEnableFilter();
    };
    __decorate([
        context_2.Autowired('filterManager')
    ], StandardMenuFactory.prototype, "filterManager");
    __decorate([
        context_2.Autowired('popupService')
    ], StandardMenuFactory.prototype, "popupService");
    __decorate([
        context_2.Autowired('gridOptionsWrapper')
    ], StandardMenuFactory.prototype, "gridOptionsWrapper");
    StandardMenuFactory = __decorate([
        context_1.Bean('menuFactory')
    ], StandardMenuFactory);
    return StandardMenuFactory;
}());
exports.StandardMenuFactory = StandardMenuFactory;
//# sourceMappingURL=standardMenu.js.map