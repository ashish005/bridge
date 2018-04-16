"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var utils_1 = require("../utils");
var renderedRow_1 = require("./renderedRow");
var events_1 = require("../events");
var constants_1 = require("../constants");
var context_1 = require("../context/context");
var gridCell_1 = require("../entities/gridCell");
var RowRenderer = (function () {
    function RowRenderer() {
        // map of row ids to row objects. keeps track of which elements
        // are rendered for which rows in the dom.
        this.renderedRows = {};
        this.renderedTopFloatingRows = [];
        this.renderedBottomFloatingRows = [];
    }
    RowRenderer.prototype.agWire = function (loggerFactory) {
        this.logger = this.loggerFactory.create('RowRenderer');
        this.logger = loggerFactory.create('BalancedColumnTreeBuilder');
    };
    RowRenderer.prototype.init = function () {
        this.getContainersFromGridPanel();
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_GROUP_OPENED, this.onColumnEvent.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_VISIBLE, this.onColumnEvent.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_RESIZED, this.onColumnEvent.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_PINNED, this.onColumnEvent.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_ROW_GROUP_CHANGED, this.onColumnEvent.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_MODEL_UPDATED, this.refreshView.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_FLOATING_ROW_DATA_CHANGED, this.refreshView.bind(this, null));
        //this.eventService.addEventListener(Events.EVENT_COLUMN_VALUE_CHANGE, this.refreshView.bind(this, null));
        //this.eventService.addEventListener(Events.EVENT_COLUMN_EVERYTHING_CHANGED, this.refreshView.bind(this, null));
        //this.eventService.addEventListener(Events.EVENT_COLUMN_ROW_GROUP_CHANGE, this.refreshView.bind(this, null));
        this.refreshView();
    };
    RowRenderer.prototype.onColumnEvent = function (event) {
        if (event.isContainerWidthImpacted()) {
            this.setMainRowWidths();
        }
    };
    RowRenderer.prototype.getContainersFromGridPanel = function () {
        this.eBodyContainer = this.gridPanel.getBodyContainer();
        this.ePinnedLeftColsContainer = this.gridPanel.getPinnedLeftColsContainer();
        this.ePinnedRightColsContainer = this.gridPanel.getPinnedRightColsContainer();
        this.eFloatingTopContainer = this.gridPanel.getFloatingTopContainer();
        this.eFloatingTopPinnedLeftContainer = this.gridPanel.getPinnedLeftFloatingTop();
        this.eFloatingTopPinnedRightContainer = this.gridPanel.getPinnedRightFloatingTop();
        this.eFloatingBottomContainer = this.gridPanel.getFloatingBottomContainer();
        this.eFloatingBottomPinnedLeftContainer = this.gridPanel.getPinnedLeftFloatingBottom();
        this.eFloatingBottomPinnedRightContainer = this.gridPanel.getPinnedRightFloatingBottom();
        this.eBodyViewport = this.gridPanel.getBodyViewport();
        this.eAllBodyContainers = [this.eBodyContainer, this.eFloatingBottomContainer,
            this.eFloatingTopContainer];
        this.eAllPinnedLeftContainers = [
            this.ePinnedLeftColsContainer,
            this.eFloatingBottomPinnedLeftContainer,
            this.eFloatingTopPinnedLeftContainer
        ];
        this.eAllPinnedRightContainers = [
            this.ePinnedRightColsContainer,
            this.eFloatingBottomPinnedRightContainer,
            this.eFloatingTopPinnedRightContainer
        ];
    };
    RowRenderer.prototype.setRowModel = function (rowModel) {
        this.rowModel = rowModel;
    };
    RowRenderer.prototype.getAllCellsForColumn = function (column) {
        var eCells = [];
        utils_1.Utils.iterateObject(this.renderedRows, callback);
        utils_1.Utils.iterateObject(this.renderedBottomFloatingRows, callback);
        utils_1.Utils.iterateObject(this.renderedBottomFloatingRows, callback);
        function callback(key, renderedRow) {
            var eCell = renderedRow.getCellForCol(column);
            if (eCell) {
                eCells.push(eCell);
            }
        }
        return eCells;
    };
    RowRenderer.prototype.setMainRowWidths = function () {
        var mainRowWidth = this.columnController.getBodyContainerWidth() + "px";
        this.eAllBodyContainers.forEach(function (container) {
            var unpinnedRows = container.querySelectorAll(".ag-row");
            for (var i = 0; i < unpinnedRows.length; i++) {
                unpinnedRows[i].style.width = mainRowWidth;
            }
        });
    };
    RowRenderer.prototype.refreshAllFloatingRows = function () {
        this.refreshFloatingRows(this.renderedTopFloatingRows, this.floatingRowModel.getFloatingTopRowData(), this.eFloatingTopPinnedLeftContainer, this.eFloatingTopPinnedRightContainer, this.eFloatingTopContainer);
        this.refreshFloatingRows(this.renderedBottomFloatingRows, this.floatingRowModel.getFloatingBottomRowData(), this.eFloatingBottomPinnedLeftContainer, this.eFloatingBottomPinnedRightContainer, this.eFloatingBottomContainer);
    };
    RowRenderer.prototype.refreshFloatingRows = function (renderedRows, rowNodes, pinnedLeftContainer, pinnedRightContainer, bodyContainer) {
        var _this = this;
        renderedRows.forEach(function (row) {
            row.destroy();
        });
        renderedRows.length = 0;
        // if no cols, don't draw row - can we get rid of this???
        var columns = this.columnController.getAllDisplayedColumns();
        if (!columns || columns.length == 0) {
            return;
        }
        if (rowNodes) {
            rowNodes.forEach(function (node, rowIndex) {
                var renderedRow = new renderedRow_1.RenderedRow(_this.$scope, _this, bodyContainer, pinnedLeftContainer, pinnedRightContainer, node, rowIndex);
                _this.context.wireBean(renderedRow);
                renderedRows.push(renderedRow);
            });
        }
    };
    RowRenderer.prototype.refreshView = function (refreshEvent) {
        this.logger.log('refreshView');
        var focusedCell = this.focusedCellController.getFocusCellIfBrowserFocused();
        this.focusedCellController.getFocusedCell();
        var refreshFromIndex = refreshEvent ? refreshEvent.fromIndex : null;
        if (!this.gridOptionsWrapper.isForPrint()) {
            var containerHeight = this.rowModel.getRowCombinedHeight();
            this.eBodyContainer.style.height = containerHeight + "px";
            this.ePinnedLeftColsContainer.style.height = containerHeight + "px";
            this.ePinnedRightColsContainer.style.height = containerHeight + "px";
        }
        this.refreshAllVirtualRows(refreshFromIndex);
        this.refreshAllFloatingRows();
        this.restoreFocusedCell(focusedCell);
    };
    // sets the focus to the provided cell, if the cell is provided. this way, the user can call refresh without
    // worry about the focus been lost. this is important when the user is using keyboard navigation to do edits
    // and the cellEditor is calling 'refresh' to get other cells to update (as other cells might depend on the
    // edited cell).
    RowRenderer.prototype.restoreFocusedCell = function (gridCell) {
        if (gridCell) {
            this.focusedCellController.setFocusedCell(gridCell.rowIndex, gridCell.column, gridCell.floating, true);
        }
    };
    RowRenderer.prototype.softRefreshView = function () {
        var focusedCell = this.focusedCellController.getFocusCellIfBrowserFocused();
        this.forEachRenderedCell(function (renderedCell) {
            if (renderedCell.isVolatile()) {
                renderedCell.refreshCell();
            }
        });
        this.restoreFocusedCell(focusedCell);
    };
    RowRenderer.prototype.stopEditing = function (cancel) {
        if (cancel === void 0) { cancel = false; }
        this.forEachRenderedCell(function (renderedCell) {
            renderedCell.stopEditing(cancel);
        });
    };
    RowRenderer.prototype.forEachRenderedCell = function (callback) {
        utils_1.Utils.iterateObject(this.renderedRows, function (key, renderedRow) {
            renderedRow.forEachRenderedCell(callback);
        });
    };
    RowRenderer.prototype.addRenderedRowListener = function (eventName, rowIndex, callback) {
        var renderedRow = this.renderedRows[rowIndex];
        renderedRow.addEventListener(eventName, callback);
    };
    RowRenderer.prototype.refreshRows = function (rowNodes) {
        if (!rowNodes || rowNodes.length == 0) {
            return;
        }
        var focusedCell = this.focusedCellController.getFocusCellIfBrowserFocused();
        // we only need to be worried about rendered rows, as this method is
        // called to whats rendered. if the row isn't rendered, we don't care
        var indexesToRemove = [];
        utils_1.Utils.iterateObject(this.renderedRows, function (key, renderedRow) {
            var rowNode = renderedRow.getRowNode();
            if (rowNodes.indexOf(rowNode) >= 0) {
                indexesToRemove.push(key);
            }
        });
        // remove the rows
        this.removeVirtualRow(indexesToRemove);
        // add draw them again
        this.drawVirtualRows();
        this.restoreFocusedCell(focusedCell);
    };
    RowRenderer.prototype.refreshCells = function (rowNodes, colIds, animate) {
        if (animate === void 0) { animate = false; }
        if (!rowNodes || rowNodes.length == 0) {
            return;
        }
        // we only need to be worried about rendered rows, as this method is
        // called to whats rendered. if the row isn't rendered, we don't care
        utils_1.Utils.iterateObject(this.renderedRows, function (key, renderedRow) {
            var rowNode = renderedRow.getRowNode();
            if (rowNodes.indexOf(rowNode) >= 0) {
                renderedRow.refreshCells(colIds, animate);
            }
        });
    };
    RowRenderer.prototype.rowDataChanged = function (rows) {
        // we only need to be worried about rendered rows, as this method is
        // called to whats rendered. if the row isn't rendered, we don't care
        var indexesToRemove = [];
        var renderedRows = this.renderedRows;
        Object.keys(renderedRows).forEach(function (key) {
            var renderedRow = renderedRows[key];
            // see if the rendered row is in the list of rows we have to update
            if (renderedRow.isDataInList(rows)) {
                indexesToRemove.push(key);
            }
        });
        // remove the rows
        this.removeVirtualRow(indexesToRemove);
        // add draw them again
        this.drawVirtualRows();
    };
    RowRenderer.prototype.destroy = function () {
        var rowsToRemove = Object.keys(this.renderedRows);
        this.removeVirtualRow(rowsToRemove);
    };
    RowRenderer.prototype.refreshAllVirtualRows = function (fromIndex) {
        // remove all current virtual rows, as they have old data
        var rowsToRemove = Object.keys(this.renderedRows);
        this.removeVirtualRow(rowsToRemove, fromIndex);
        // add in new rows
        this.drawVirtualRows();
    };
    // public - removes the group rows and then redraws them again
    RowRenderer.prototype.refreshGroupRows = function () {
        // find all the group rows
        var rowsToRemove = [];
        var that = this;
        Object.keys(this.renderedRows).forEach(function (key) {
            var renderedRow = that.renderedRows[key];
            if (renderedRow.isGroup()) {
                rowsToRemove.push(key);
            }
        });
        // remove the rows
        this.removeVirtualRow(rowsToRemove);
        // and draw them back again
        this.ensureRowsRendered();
    };
    // takes array of row indexes
    RowRenderer.prototype.removeVirtualRow = function (rowsToRemove, fromIndex) {
        var that = this;
        // if no fromIndex then set to -1, which will refresh everything
        var realFromIndex = (typeof fromIndex === 'number') ? fromIndex : -1;
        rowsToRemove.forEach(function (indexToRemove) {
            if (indexToRemove >= realFromIndex) {
                that.unbindVirtualRow(indexToRemove);
            }
        });
    };
    RowRenderer.prototype.unbindVirtualRow = function (indexToRemove) {
        var renderedRow = this.renderedRows[indexToRemove];
        renderedRow.destroy();
        var event = { node: renderedRow.getRowNode(), rowIndex: indexToRemove };
        this.eventService.dispatchEvent(events_1.Events.EVENT_VIRTUAL_ROW_REMOVED, event);
        delete this.renderedRows[indexToRemove];
    };
    RowRenderer.prototype.drawVirtualRows = function () {
        this.workOutFirstAndLastRowsToRender();
        this.ensureRowsRendered();
    };
    RowRenderer.prototype.workOutFirstAndLastRowsToRender = function () {
        var newFirst;
        var newLast;
        if (!this.rowModel.isRowsToRender()) {
            newFirst = 0;
            newLast = -1; // setting to -1 means nothing in range
        }
        else {
            var rowCount = this.rowModel.getRowCount();
            if (this.gridOptionsWrapper.isForPrint()) {
                newFirst = 0;
                newLast = rowCount;
            }
            else {
                var topPixel = this.eBodyViewport.scrollTop;
                var bottomPixel = topPixel + this.eBodyViewport.offsetHeight;
                var first = this.rowModel.getRowIndexAtPixel(topPixel);
                var last = this.rowModel.getRowIndexAtPixel(bottomPixel);
                //add in buffer
                var buffer = this.gridOptionsWrapper.getRowBuffer();
                first = first - buffer;
                last = last + buffer;
                // adjust, in case buffer extended actual size
                if (first < 0) {
                    first = 0;
                }
                if (last > rowCount - 1) {
                    last = rowCount - 1;
                }
                newFirst = first;
                newLast = last;
            }
        }
        var firstDiffers = newFirst !== this.firstRenderedRow;
        var lastDiffers = newLast !== this.lastRenderedRow;
        if (firstDiffers || lastDiffers) {
            this.firstRenderedRow = newFirst;
            this.lastRenderedRow = newLast;
            var event = { firstRow: newFirst, lastRow: newLast };
            this.eventService.dispatchEvent(events_1.Events.EVENT_VIEWPORT_CHANGED, event);
        }
    };
    RowRenderer.prototype.getFirstVirtualRenderedRow = function () {
        return this.firstRenderedRow;
    };
    RowRenderer.prototype.getLastVirtualRenderedRow = function () {
        return this.lastRenderedRow;
    };
    RowRenderer.prototype.ensureRowsRendered = function () {
        //var start = new Date().getTime();
        var _this = this;
        // at the end, this array will contain the items we need to remove
        var rowsToRemove = Object.keys(this.renderedRows);
        // add in new rows
        for (var rowIndex = this.firstRenderedRow; rowIndex <= this.lastRenderedRow; rowIndex++) {
            // see if item already there, and if yes, take it out of the 'to remove' array
            if (rowsToRemove.indexOf(rowIndex.toString()) >= 0) {
                rowsToRemove.splice(rowsToRemove.indexOf(rowIndex.toString()), 1);
                continue;
            }
            // check this row actually exists (in case overflow buffer window exceeds real data)
            var node = this.rowModel.getRow(rowIndex);
            if (node) {
                this.insertRow(node, rowIndex);
            }
        }
        // at this point, everything in our 'rowsToRemove' . . .
        this.removeVirtualRow(rowsToRemove);
        // if we are doing angular compiling, then do digest the scope here
        if (this.gridOptionsWrapper.isAngularCompileRows()) {
            // we do it in a timeout, in case we are already in an apply
            setTimeout(function () { _this.$scope.$apply(); }, 0);
        }
        //var end = new Date().getTime();
        //console.log(end-start);
    };
    RowRenderer.prototype.onMouseEvent = function (eventName, mouseEvent, eventSource, cell) {
        var renderedRow;
        switch (cell.floating) {
            case constants_1.Constants.FLOATING_TOP:
                renderedRow = this.renderedTopFloatingRows[cell.rowIndex];
                break;
            case constants_1.Constants.FLOATING_BOTTOM:
                renderedRow = this.renderedBottomFloatingRows[cell.rowIndex];
                break;
            default:
                renderedRow = this.renderedRows[cell.rowIndex];
                break;
        }
        if (renderedRow) {
            renderedRow.onMouseEvent(eventName, mouseEvent, eventSource, cell);
        }
    };
    RowRenderer.prototype.insertRow = function (node, rowIndex) {
        var columns = this.columnController.getAllDisplayedColumns();
        // if no cols, don't draw row
        if (!columns || columns.length == 0) {
            return;
        }
        var renderedRow = new renderedRow_1.RenderedRow(this.$scope, this, this.eBodyContainer, this.ePinnedLeftColsContainer, this.ePinnedRightColsContainer, node, rowIndex);
        this.context.wireBean(renderedRow);
        this.renderedRows[rowIndex] = renderedRow;
    };
    RowRenderer.prototype.getRenderedNodes = function () {
        var renderedRows = this.renderedRows;
        return Object.keys(renderedRows).map(function (key) {
            return renderedRows[key].getRowNode();
        });
    };
    // we use index for rows, but column object for columns, as the next column (by index) might not
    // be visible (header grouping) so it's not reliable, so using the column object instead.
    RowRenderer.prototype.navigateToNextCell = function (key, rowIndex, column, floating) {
        var nextCell = new gridCell_1.GridCell(rowIndex, floating, column);
        // we keep searching for a next cell until we find one. this is how the group rows get skipped
        while (true) {
            nextCell = this.cellNavigationService.getNextCellToFocus(key, nextCell);
            if (utils_1.Utils.missing(nextCell)) {
                break;
            }
            var skipGroupRows = this.gridOptionsWrapper.isGroupUseEntireRow();
            if (skipGroupRows) {
                var rowNode = this.rowModel.getRow(nextCell.rowIndex);
                if (!rowNode.group) {
                    break;
                }
            }
            else {
                break;
            }
        }
        // no next cell means we have reached a grid boundary, eg left, right, top or bottom of grid
        if (!nextCell) {
            return;
        }
        // this scrolls the row into view
        if (utils_1.Utils.missing(nextCell.floating)) {
            this.gridPanel.ensureIndexVisible(nextCell.rowIndex);
        }
        if (!nextCell.column.isPinned()) {
            this.gridPanel.ensureColumnVisible(nextCell.column);
        }
        // need to nudge the scrolls for the floating items. otherwise when we set focus on a non-visible
        // floating cell, the scrolls get out of sync
        this.gridPanel.horizontallyScrollHeaderCenterAndFloatingCenter();
        this.focusedCellController.setFocusedCell(nextCell.rowIndex, nextCell.column, nextCell.floating, true);
        if (this.rangeController) {
            this.rangeController.setRangeToCell(new gridCell_1.GridCell(nextCell.rowIndex, nextCell.floating, nextCell.column));
        }
    };
    RowRenderer.prototype.getComponentForCell = function (gridCell) {
        var rowComponent;
        switch (gridCell.floating) {
            case constants_1.Constants.FLOATING_TOP:
                rowComponent = this.renderedTopFloatingRows[gridCell.rowIndex];
                break;
            case constants_1.Constants.FLOATING_BOTTOM:
                rowComponent = this.renderedBottomFloatingRows[gridCell.rowIndex];
                break;
            default:
                rowComponent = this.renderedRows[gridCell.rowIndex];
                break;
        }
        if (!rowComponent) {
            return null;
        }
        var cellComponent = rowComponent.getRenderedCellForColumn(gridCell.column);
        return cellComponent;
    };
    // called by the cell, when tab is pressed while editing.
    // @return: true when navigation successful, otherwise false
    RowRenderer.prototype.moveFocusToNextCell = function (rowIndex, column, floating, shiftKey, startEditing) {
        var nextCell = new gridCell_1.GridCell(rowIndex, floating, column);
        while (true) {
            nextCell = this.cellNavigationService.getNextTabbedCell(nextCell, shiftKey);
            // if no 'next cell', means we have got to last cell of grid, so nothing to move to,
            // so bottom right cell going forwards, or top left going backwards
            if (!nextCell) {
                return false;
            }
            var nextRenderedCell = this.getComponentForCell(nextCell);
            // if editing, but cell not editable, skip cell
            if (startEditing && !nextRenderedCell.isCellEditable()) {
                continue;
            }
            // this scrolls the row into view
            var cellIsNotFloating = utils_1.Utils.missing(nextCell.floating);
            if (cellIsNotFloating) {
                this.gridPanel.ensureIndexVisible(nextCell.rowIndex);
            }
            this.gridPanel.ensureColumnVisible(nextCell.column);
            // need to nudge the scrolls for the floating items. otherwise when we set focus on a non-visible
            // floating cell, the scrolls get out of sync
            this.gridPanel.horizontallyScrollHeaderCenterAndFloatingCenter();
            if (startEditing) {
                nextRenderedCell.startEditingIfEnabled();
                nextRenderedCell.focusCell(false);
            }
            else {
                nextRenderedCell.focusCell(true);
            }
            // by default, when we click a cell, it gets selected into a range, so to keep keyboard navigation
            // consistent, we set into range here also.
            if (this.rangeController) {
                this.rangeController.setRangeToCell(new gridCell_1.GridCell(nextCell.rowIndex, nextCell.floating, nextCell.column));
            }
            // we successfully tabbed onto a grid cell, so return true
            return true;
        }
    };
    __decorate([
        context_1.Autowired('columnController')
    ], RowRenderer.prototype, "columnController");
    __decorate([
        context_1.Autowired('gridOptionsWrapper')
    ], RowRenderer.prototype, "gridOptionsWrapper");
    __decorate([
        context_1.Autowired('gridCore')
    ], RowRenderer.prototype, "gridCore");
    __decorate([
        context_1.Autowired('gridPanel')
    ], RowRenderer.prototype, "gridPanel");
    __decorate([
        context_1.Autowired('$compile')
    ], RowRenderer.prototype, "$compile");
    __decorate([
        context_1.Autowired('$scope')
    ], RowRenderer.prototype, "$scope");
    __decorate([
        context_1.Autowired('expressionService')
    ], RowRenderer.prototype, "expressionService");
    __decorate([
        context_1.Autowired('templateService')
    ], RowRenderer.prototype, "templateService");
    __decorate([
        context_1.Autowired('valueService')
    ], RowRenderer.prototype, "valueService");
    __decorate([
        context_1.Autowired('eventService')
    ], RowRenderer.prototype, "eventService");
    __decorate([
        context_1.Autowired('floatingRowModel')
    ], RowRenderer.prototype, "floatingRowModel");
    __decorate([
        context_1.Autowired('context')
    ], RowRenderer.prototype, "context");
    __decorate([
        context_1.Autowired('loggerFactory')
    ], RowRenderer.prototype, "loggerFactory");
    __decorate([
        context_1.Autowired('rowModel')
    ], RowRenderer.prototype, "rowModel");
    __decorate([
        context_1.Autowired('focusedCellController')
    ], RowRenderer.prototype, "focusedCellController");
    __decorate([
        context_1.Optional('rangeController')
    ], RowRenderer.prototype, "rangeController");
    __decorate([
        context_1.Autowired('cellNavigationService')
    ], RowRenderer.prototype, "cellNavigationService");
    __decorate([
        __param(0, context_1.Qualifier('loggerFactory'))
    ], RowRenderer.prototype, "agWire");
    __decorate([
        context_1.PostConstruct
    ], RowRenderer.prototype, "init");
    __decorate([
        context_1.PreDestroy
    ], RowRenderer.prototype, "destroy");
    RowRenderer = __decorate([
        context_1.Bean('rowRenderer')
    ], RowRenderer);
    return RowRenderer;
}());
exports.RowRenderer = RowRenderer;
//# sourceMappingURL=rowRenderer.js.map