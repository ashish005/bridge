"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var context_1 = require("./context/context");
var events_1 = require("./events");
var utils_1 = require("./utils");
var gridCell_1 = require("./entities/gridCell");
var constants_1 = require("./constants");
var FocusedCellController = (function () {
    function FocusedCellController() {
    }
    FocusedCellController.prototype.init = function () {
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_EVERYTHING_CHANGED, this.clearFocusedCell.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_GROUP_OPENED, this.clearFocusedCell.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_MOVED, this.clearFocusedCell.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_PINNED, this.clearFocusedCell.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_ROW_GROUP_CHANGED, this.clearFocusedCell.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_VISIBLE, this.clearFocusedCell.bind(this));
        //this.eventService.addEventListener(Events.EVENT_COLUMN_VISIBLE, this.clearFocusedCell.bind(this));
    };
    FocusedCellController.prototype.clearFocusedCell = function () {
        this.focusedCell = null;
        this.onCellFocused(false);
    };
    FocusedCellController.prototype.getFocusedCell = function () {
        return this.focusedCell;
    };
    // we check if the browser is focusing something, and if it is, and
    // it's the cell we think is focused, then return the cell. so this
    // methods returns the cell if a) we think it has focus and b) the
    // browser thinks it has focus. this then returns nothign if we
    // first focus a cell, then second click outside the grid, as then the
    // grid cell will still be focused as far as the grid is conerned,
    // however the browser focus will have moved somewhere else.
    FocusedCellController.prototype.getFocusCellIfBrowserFocused = function () {
        if (!this.focusedCell) {
            return null;
        }
        var browserFocusedCell = this.getGridCellForDomElement(document.activeElement);
        if (!browserFocusedCell) {
            return null;
        }
        var gridFocusId = this.focusedCell.createId();
        var browserFocusId = browserFocusedCell.createId();
        if (gridFocusId === browserFocusId) {
            return this.focusedCell;
        }
        else {
            return null;
        }
    };
    FocusedCellController.prototype.getGridCellForDomElement = function (eBrowserCell) {
        if (!eBrowserCell) {
            return null;
        }
        var column = null;
        var row = null;
        var floating = null;
        var that = this;
        while (eBrowserCell) {
            checkRow(eBrowserCell);
            checkColumn(eBrowserCell);
            eBrowserCell = eBrowserCell.parentNode;
        }
        if (utils_1.Utils.exists(column) && utils_1.Utils.exists(row)) {
            var gridCell = new gridCell_1.GridCell(row, floating, column);
            return gridCell;
        }
        else {
            return null;
        }
        function checkRow(eTarget) {
            // match the column by checking a) it has a valid colId and b) it has the 'ag-cell' class
            var rowId = utils_1.Utils.getElementAttribute(eTarget, 'row');
            if (utils_1.Utils.exists(rowId) && utils_1.Utils.containsClass(eTarget, 'ag-row')) {
                if (rowId.indexOf('ft') === 0) {
                    floating = constants_1.Constants.FLOATING_TOP;
                    rowId = rowId.substr(3);
                }
                else if (rowId.indexOf('fb') === 0) {
                    floating = constants_1.Constants.FLOATING_BOTTOM;
                    rowId = rowId.substr(3);
                }
                else {
                    floating = null;
                }
                row = parseInt(rowId);
            }
        }
        function checkColumn(eTarget) {
            // match the column by checking a) it has a valid colId and b) it has the 'ag-cell' class
            var colId = utils_1.Utils.getElementAttribute(eTarget, 'colid');
            if (utils_1.Utils.exists(colId) && utils_1.Utils.containsClass(eTarget, 'ag-cell')) {
                var foundColumn = that.columnController.getOriginalColumn(colId);
                if (foundColumn) {
                    column = foundColumn;
                }
            }
        }
    };
    FocusedCellController.prototype.setFocusedCell = function (rowIndex, colKey, floating, forceBrowserFocus) {
        if (forceBrowserFocus === void 0) { forceBrowserFocus = false; }
        if (this.gridOptionsWrapper.isSuppressCellSelection()) {
            return;
        }
        var column = utils_1.Utils.makeNull(this.columnController.getOriginalColumn(colKey));
        this.focusedCell = new gridCell_1.GridCell(rowIndex, utils_1.Utils.makeNull(floating), column);
        this.onCellFocused(forceBrowserFocus);
    };
    FocusedCellController.prototype.isCellFocused = function (gridCell) {
        if (utils_1.Utils.missing(this.focusedCell)) {
            return false;
        }
        return this.focusedCell.column === gridCell.column && this.isRowFocused(gridCell.rowIndex, gridCell.floating);
    };
    FocusedCellController.prototype.isRowFocused = function (rowIndex, floating) {
        if (utils_1.Utils.missing(this.focusedCell)) {
            return false;
        }
        var floatingOrNull = utils_1.Utils.makeNull(floating);
        return this.focusedCell.rowIndex === rowIndex && this.focusedCell.floating === floatingOrNull;
    };
    FocusedCellController.prototype.onCellFocused = function (forceBrowserFocus) {
        var event = {
            rowIndex: null,
            column: null,
            floating: null,
            forceBrowserFocus: forceBrowserFocus
        };
        if (this.focusedCell) {
            event.rowIndex = this.focusedCell.rowIndex;
            event.column = this.focusedCell.column;
            event.floating = this.focusedCell.floating;
        }
        this.eventService.dispatchEvent(events_1.Events.EVENT_CELL_FOCUSED, event);
    };
    __decorate([
        context_1.Autowired('eventService')
    ], FocusedCellController.prototype, "eventService");
    __decorate([
        context_1.Autowired('gridOptionsWrapper')
    ], FocusedCellController.prototype, "gridOptionsWrapper");
    __decorate([
        context_1.Autowired('columnController')
    ], FocusedCellController.prototype, "columnController");
    __decorate([
        context_1.PostConstruct
    ], FocusedCellController.prototype, "init");
    FocusedCellController = __decorate([
        context_1.Bean('focusedCellController')
    ], FocusedCellController);
    return FocusedCellController;
}());
exports.FocusedCellController = FocusedCellController;
//# sourceMappingURL=focusedCellController.js.map