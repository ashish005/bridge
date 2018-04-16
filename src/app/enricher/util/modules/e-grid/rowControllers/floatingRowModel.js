"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var rowNode_1 = require("../entities/rowNode");
var context_1 = require("../context/context");
var context_2 = require("../context/context");
var events_1 = require("../events");
var context_3 = require("../context/context");
var constants_1 = require("../constants");
var utils_1 = require("../utils");
var FloatingRowModel = (function () {
    function FloatingRowModel() {
    }
    FloatingRowModel.prototype.init = function () {
        this.setFloatingTopRowData(this.gridOptionsWrapper.getFloatingTopRowData());
        this.setFloatingBottomRowData(this.gridOptionsWrapper.getFloatingBottomRowData());
    };
    FloatingRowModel.prototype.isEmpty = function (floating) {
        var rows = floating === constants_1.Constants.FLOATING_TOP ? this.floatingTopRows : this.floatingBottomRows;
        return utils_1.Utils.missingOrEmpty(rows);
    };
    FloatingRowModel.prototype.isRowsToRender = function (floating) {
        return !this.isEmpty(floating);
    };
    FloatingRowModel.prototype.getRowAtPixel = function (pixel, floating) {
        var rows = floating === constants_1.Constants.FLOATING_TOP ? this.floatingTopRows : this.floatingBottomRows;
        if (utils_1.Utils.missingOrEmpty(rows)) {
            return 0; // this should never happen, just in case, 0 is graceful failure
        }
        for (var i = 0; i < rows.length; i++) {
            var rowNode = rows[i];
            var rowTopPixel = rowNode.rowTop + rowNode.rowHeight - 1;
            // only need to range check against the top pixel, as we are going through the list
            // in order, first row to hit the pixel wins
            if (rowTopPixel >= pixel) {
                return i;
            }
        }
        return rows.length - 1;
    };
    FloatingRowModel.prototype.setFloatingTopRowData = function (rowData) {
        this.floatingTopRows = this.createNodesFromData(rowData, true);
        this.eventService.dispatchEvent(events_1.Events.EVENT_FLOATING_ROW_DATA_CHANGED);
    };
    FloatingRowModel.prototype.setFloatingBottomRowData = function (rowData) {
        this.floatingBottomRows = this.createNodesFromData(rowData, false);
        this.eventService.dispatchEvent(events_1.Events.EVENT_FLOATING_ROW_DATA_CHANGED);
    };
    FloatingRowModel.prototype.createNodesFromData = function (allData, isTop) {
        var _this = this;
        var rowNodes = [];
        if (allData) {
            var nextRowTop = 0;
            allData.forEach(function (dataItem) {
                var rowNode = new rowNode_1.RowNode();
                _this.context.wireBean(rowNode);
                rowNode.data = dataItem;
                rowNode.floating = isTop ? constants_1.Constants.FLOATING_TOP : constants_1.Constants.FLOATING_BOTTOM;
                rowNode.rowTop = nextRowTop;
                rowNode.rowHeight = _this.gridOptionsWrapper.getRowHeightForNode(rowNode);
                nextRowTop += rowNode.rowHeight;
                rowNodes.push(rowNode);
            });
        }
        return rowNodes;
    };
    FloatingRowModel.prototype.getFloatingTopRowData = function () {
        return this.floatingTopRows;
    };
    FloatingRowModel.prototype.getFloatingBottomRowData = function () {
        return this.floatingBottomRows;
    };
    FloatingRowModel.prototype.getFloatingTopTotalHeight = function () {
        return this.getTotalHeight(this.floatingTopRows);
    };
    FloatingRowModel.prototype.getFloatingBottomTotalHeight = function () {
        return this.getTotalHeight(this.floatingBottomRows);
    };
    FloatingRowModel.prototype.getTotalHeight = function (rowNodes) {
        if (!rowNodes || rowNodes.length === 0) {
            return 0;
        }
        else {
            var lastNode = rowNodes[rowNodes.length - 1];
            return lastNode.rowTop + lastNode.rowHeight;
        }
    };
    __decorate([
        context_2.Autowired('gridOptionsWrapper')
    ], FloatingRowModel.prototype, "gridOptionsWrapper");
    __decorate([
        context_2.Autowired('eventService')
    ], FloatingRowModel.prototype, "eventService");
    __decorate([
        context_2.Autowired('context')
    ], FloatingRowModel.prototype, "context");
    __decorate([
        context_3.PostConstruct
    ], FloatingRowModel.prototype, "init");
    FloatingRowModel = __decorate([
        context_1.Bean('floatingRowModel')
    ], FloatingRowModel);
    return FloatingRowModel;
}());
exports.FloatingRowModel = FloatingRowModel;
//# sourceMappingURL=floatingRowModel.js.map