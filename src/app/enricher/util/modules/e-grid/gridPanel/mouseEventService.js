"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var context_1 = require("../context/context");
var context_2 = require("../context/context");
var column_1 = require("../entities/column");
var constants_1 = require("../constants");
var utils_1 = require("../utils");
var gridCell_1 = require("../entities/gridCell");
var MouseEventService = (function () {
    function MouseEventService() {
    }
    MouseEventService.prototype.getCellForMouseEvent = function (mouseEvent) {
        var floating = this.getFloating(mouseEvent);
        var rowIndex = this.getRowIndex(mouseEvent, floating);
        var column = this.getColumn(mouseEvent);
        if (rowIndex >= 0 && utils_1.Utils.exists(column)) {
            return new gridCell_1.GridCell(rowIndex, floating, column);
        }
        else {
            return null;
        }
    };
    MouseEventService.prototype.getFloating = function (mouseEvent) {
        var floatingTopRect = this.gridPanel.getFloatingTopClientRect();
        var floatingBottomRect = this.gridPanel.getFloatingBottomClientRect();
        var floatingTopRowsExist = !this.floatingRowModel.isEmpty(constants_1.Constants.FLOATING_TOP);
        var floatingBottomRowsExist = !this.floatingRowModel.isEmpty(constants_1.Constants.FLOATING_BOTTOM);
        if (floatingTopRowsExist && floatingTopRect.bottom >= mouseEvent.clientY) {
            return constants_1.Constants.FLOATING_TOP;
        }
        else if (floatingBottomRowsExist && floatingBottomRect.top <= mouseEvent.clientY) {
            return constants_1.Constants.FLOATING_BOTTOM;
        }
        else {
            return null;
        }
    };
    MouseEventService.prototype.getFloatingRowIndex = function (mouseEvent, floating) {
        var clientRect;
        switch (floating) {
            case constants_1.Constants.FLOATING_TOP:
                clientRect = this.gridPanel.getFloatingTopClientRect();
                break;
            case constants_1.Constants.FLOATING_BOTTOM:
                clientRect = this.gridPanel.getFloatingBottomClientRect();
                break;
        }
        var bodyY = mouseEvent.clientY - clientRect.top;
        var rowIndex = this.floatingRowModel.getRowAtPixel(bodyY, floating);
        return rowIndex;
    };
    MouseEventService.prototype.getRowIndex = function (mouseEvent, floating) {
        switch (floating) {
            case constants_1.Constants.FLOATING_TOP:
            case constants_1.Constants.FLOATING_BOTTOM:
                return this.getFloatingRowIndex(mouseEvent, floating);
            default: return this.getBodyRowIndex(mouseEvent);
        }
    };
    MouseEventService.prototype.getBodyRowIndex = function (mouseEvent) {
        var clientRect = this.gridPanel.getBodyViewportClientRect();
        var scrollY = this.gridPanel.getVerticalScrollPosition();
        var bodyY = mouseEvent.clientY - clientRect.top + scrollY;
        var rowIndex = this.rowModel.getRowIndexAtPixel(bodyY);
        return rowIndex;
    };
    MouseEventService.prototype.getContainer = function (mouseEvent) {
        var centerRect = this.gridPanel.getBodyViewportClientRect();
        var mouseX = mouseEvent.clientX;
        if (mouseX < centerRect.left && this.columnController.isPinningLeft()) {
            return column_1.Column.PINNED_LEFT;
        }
        else if (mouseX > centerRect.right && this.columnController.isPinningRight()) {
            return column_1.Column.PINNED_RIGHT;
        }
        else {
            return null;
        }
    };
    MouseEventService.prototype.getColumn = function (mouseEvent) {
        if (this.columnController.isEmpty()) {
            return null;
        }
        var container = this.getContainer(mouseEvent);
        var columns = this.getColumnsForContainer(container);
        var containerX = this.getXForContainer(container, mouseEvent);
        var hoveringColumn;
        if (containerX < 0) {
            hoveringColumn = columns[0];
        }
        columns.forEach(function (column) {
            var afterLeft = containerX >= column.getLeft();
            var beforeRight = containerX <= column.getRight();
            if (afterLeft && beforeRight) {
                hoveringColumn = column;
            }
        });
        if (!hoveringColumn) {
            hoveringColumn = columns[columns.length - 1];
        }
        return hoveringColumn;
    };
    MouseEventService.prototype.getColumnsForContainer = function (container) {
        switch (container) {
            case column_1.Column.PINNED_LEFT: return this.columnController.getDisplayedLeftColumns();
            case column_1.Column.PINNED_RIGHT: return this.columnController.getDisplayedRightColumns();
            default: return this.columnController.getDisplayedCenterColumns();
        }
    };
    MouseEventService.prototype.getXForContainer = function (container, mouseEvent) {
        var containerX;
        switch (container) {
            case column_1.Column.PINNED_LEFT:
                containerX = this.gridPanel.getPinnedLeftColsViewportClientRect().left;
                break;
            case column_1.Column.PINNED_RIGHT:
                containerX = this.gridPanel.getPinnedRightColsViewportClientRect().left;
                break;
            default:
                var centerRect = this.gridPanel.getBodyViewportClientRect();
                var centerScroll = this.gridPanel.getHorizontalScrollPosition();
                containerX = centerRect.left - centerScroll;
        }
        var result = mouseEvent.clientX - containerX;
        return result;
    };
    __decorate([
        context_2.Autowired('gridPanel')
    ], MouseEventService.prototype, "gridPanel");
    __decorate([
        context_2.Autowired('columnController')
    ], MouseEventService.prototype, "columnController");
    __decorate([
        context_2.Autowired('rowModel')
    ], MouseEventService.prototype, "rowModel");
    __decorate([
        context_2.Autowired('floatingRowModel')
    ], MouseEventService.prototype, "floatingRowModel");
    __decorate([
        context_2.Autowired('gridOptionsWrapper')
    ], MouseEventService.prototype, "gridOptionsWrapper");
    MouseEventService = __decorate([
        context_1.Bean('mouseEventService')
    ], MouseEventService);
    return MouseEventService;
}());
exports.MouseEventService = MouseEventService;
//# sourceMappingURL=mouseEventService.js.map