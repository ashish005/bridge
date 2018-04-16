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
var PivotService = (function () {
    function PivotService() {
    }
    PivotService.prototype.mapRowNode = function (rowNode) {
        var pivotColumns = this.columnController.getPivotColumns();
        if (pivotColumns.length === 0) {
            rowNode.childrenMapped = null;
            return;
        }
        rowNode.childrenMapped = this.mapChildren(rowNode.childrenAfterFilter, pivotColumns, 0, this.uniqueValues);
    };
    PivotService.prototype.getUniqueValues = function () {
        return this.uniqueValues;
    };
    PivotService.prototype.mapChildren = function (children, pivotColumns, pivotIndex, uniqueValues) {
        var _this = this;
        var mappedChildren = {};
        var pivotColumn = pivotColumns[pivotIndex];
        // map the children out based on the pivot column
        children.forEach(function (child) {
            var key = _this.valueService.getValue(pivotColumn, child);
            if (utils_1.Utils.missing(key)) {
                key = '';
            }
            if (!uniqueValues[key]) {
                uniqueValues[key] = {};
            }
            if (!mappedChildren[key]) {
                mappedChildren[key] = [];
            }
            mappedChildren[key].push(child);
        });
        // if it's the last pivot column, return as is, otherwise go one level further in the map
        if (pivotIndex === pivotColumns.length - 1) {
            return mappedChildren;
        }
        else {
            var result = {};
            utils_1.Utils.iterateObject(mappedChildren, function (key, value) {
                result[key] = _this.mapChildren(value, pivotColumns, pivotIndex + 1, uniqueValues[key]);
            });
            return result;
        }
    };
    PivotService.prototype.execute = function (rootNode) {
        this.uniqueValues = {};
        var that = this;
        function findLeafGroups(rowNode) {
            if (rowNode.leafGroup) {
                that.mapRowNode(rowNode);
            }
            else {
                rowNode.childrenAfterFilter.forEach(function (child) {
                    findLeafGroups(child);
                });
            }
        }
        findLeafGroups(rootNode);
        this.createPivotColumnDefs();
        this.columnController.onPivotValueChanged();
    };
    PivotService.prototype.getPivotColumnGroupDefs = function () {
        return this.pivotColumnGroupDefs;
    };
    PivotService.prototype.getPivotColumnDefs = function () {
        return this.pivotColumnDefs;
    };
    PivotService.prototype.createPivotColumnDefs = function () {
        this.pivotColumnGroupDefs = [];
        this.pivotColumnDefs = [];
        var that = this;
        var pivotColumns = this.columnController.getPivotColumns();
        var levelsDeep = pivotColumns.length;
        var columnIdSequence = 0;
        recursivelyAddGroup(this.pivotColumnGroupDefs, 1, this.uniqueValues, []);
        function recursivelyAddGroup(parentChildren, index, uniqueValues, keys) {
            // var column = pivotColumns[index];
            utils_1.Utils.iterateObject(uniqueValues, function (key, value) {
                var newKeys = keys.slice(0);
                newKeys.push(key);
                var createGroup = index !== levelsDeep;
                if (createGroup) {
                    var groupDef = {
                        children: [],
                        headerName: key
                    };
                    parentChildren.push(groupDef);
                    recursivelyAddGroup(groupDef.children, index + 1, value, newKeys);
                }
                else {
                    var valueColumns = that.columnController.getValueColumns();
                    if (valueColumns.length === 1) {
                        var colDef = createColDef(valueColumns[0], key, newKeys);
                        parentChildren.push(colDef);
                        that.pivotColumnDefs.push(colDef);
                    }
                    else {
                        var valueGroup = {
                            children: [],
                            headerName: key
                        };
                        parentChildren.push(valueGroup);
                        valueColumns.forEach(function (valueColumn) {
                            var colDef = createColDef(valueColumn, valueColumn.getColDef().headerName, newKeys);
                            valueGroup.children.push(colDef);
                            that.pivotColumnDefs.push(colDef);
                        });
                    }
                }
            });
        }
        function createColDef(valueColumn, headerName, pivotKeys) {
            var colDef = {};
            if (valueColumn) {
                var colDefToCopy = valueColumn.getColDef();
                utils_1.Utils.assign(colDef, colDefToCopy);
            }
            colDef.valueGetter = null;
            colDef.headerName = headerName;
            colDef.colId = 'pivot_' + columnIdSequence++;
            colDef.keys = pivotKeys;
            colDef.valueColumn = valueColumn;
            return colDef;
        }
    };
    __decorate([
        context_1.Autowired('rowModel')
    ], PivotService.prototype, "rowModel");
    __decorate([
        context_1.Autowired('valueService')
    ], PivotService.prototype, "valueService");
    __decorate([
        context_1.Autowired('columnController')
    ], PivotService.prototype, "columnController");
    __decorate([
        context_1.Autowired('eventService')
    ], PivotService.prototype, "eventService");
    PivotService = __decorate([
        context_1.Bean('pivotService')
    ], PivotService);
    return PivotService;
}());
exports.PivotService = PivotService;
//# sourceMappingURL=pivotService.js.map