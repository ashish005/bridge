"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var context_1 = require("./context/context");
var constants_1 = require("./constants");
var LINE_SEPARATOR = '\r\n';
var CsvCreator = (function () {
    function CsvCreator() {
    }
    CsvCreator.prototype.exportDataAsCsv = function (params) {
        var csvString = this.getDataAsCsv(params);
        var fileNamePresent = params && params.fileName && params.fileName.length !== 0;
        var fileName = fileNamePresent ? params.fileName : 'export.csv';
        // for Excel, we need \ufeff at the start
        // http://stackoverflow.com/questions/17879198/adding-utf-8-bom-to-string-blob
        var blobObject = new Blob(["\ufeff", csvString], {
            type: "text/csv;charset=utf-8;"
        });
        // Internet Explorer
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blobObject, fileName);
        }
        else {
            // Chrome
            var downloadLink = document.createElement("a");
            downloadLink.href = window.URL.createObjectURL(blobObject);
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };
    CsvCreator.prototype.getDataAsCsv = function (params) {
        var _this = this;
        if (this.rowModel.getType() !== constants_1.Constants.ROW_MODEL_TYPE_NORMAL) {
            console.log('ag-Grid: getDataAsCsv is only available for standard row model');
            return '';
        }
        var inMemoryRowModel = this.rowModel;
        var result = '';
        var skipGroups = params && params.skipGroups;
        var skipHeader = params && params.skipHeader;
        var skipFooters = params && params.skipFooters;
        var includeCustomHeader = params && params.customHeader;
        var includeCustomFooter = params && params.customFooter;
        var allColumns = params && params.allColumns;
        var onlySelected = params && params.onlySelected;
        var columnSeparator = (params && params.columnSeparator) || ',';
        var suppressQuotes = params && params.suppressQuotes;
        var processCellCallback = params && params.processCellCallback;
        var columnsToExport;
        if (allColumns) {
            columnsToExport = this.columnController.getAllOriginalColumns();
        }
        else {
            columnsToExport = this.columnController.getAllDisplayedColumns();
        }
        if (!columnsToExport || columnsToExport.length === 0) {
            return '';
        }
        if (includeCustomHeader) {
            result += params.customHeader;
        }
        // first pass, put in the header names of the cols
        if (!skipHeader) {
            columnsToExport.forEach(function (column, index) {
                var nameForCol = _this.getHeaderName(params.processHeaderCallback, column);
                if (nameForCol === null || nameForCol === undefined) {
                    nameForCol = '';
                }
                if (index != 0) {
                    result += columnSeparator;
                }
                result += _this.putInQuotes(nameForCol, suppressQuotes);
            });
            result += LINE_SEPARATOR;
        }
        inMemoryRowModel.forEachNodeAfterFilterAndSort(function (node) {
            if (skipGroups && node.group) {
                return;
            }
            if (skipFooters && node.footer) {
                return;
            }
            if (onlySelected && !node.isSelected()) {
                return;
            }
            columnsToExport.forEach(function (column, index) {
                var valueForCell;
                if (node.group && index === 0) {
                    valueForCell = _this.createValueForGroupNode(node);
                }
                else {
                    valueForCell = _this.valueService.getValue(column, node);
                }
                valueForCell = _this.processCell(node, column, valueForCell, processCellCallback);
                if (valueForCell === null || valueForCell === undefined) {
                    valueForCell = '';
                }
                if (index != 0) {
                    result += columnSeparator;
                }
                result += _this.putInQuotes(valueForCell, suppressQuotes);
            });
            result += LINE_SEPARATOR;
        });
        if (includeCustomFooter) {
            result += params.customFooter;
        }
        return result;
    };
    CsvCreator.prototype.getHeaderName = function (callback, column) {
        if (callback) {
            return callback({
                column: column,
                api: this.gridOptionsWrapper.getApi(),
                columnApi: this.gridOptionsWrapper.getColumnApi(),
                context: this.gridOptionsWrapper.getContext()
            });
        }
        else {
            return this.columnController.getDisplayNameForCol(column);
        }
    };
    CsvCreator.prototype.processCell = function (rowNode, column, value, processCellCallback) {
        if (processCellCallback) {
            return processCellCallback({
                column: column,
                node: rowNode,
                value: value,
                api: this.gridOptionsWrapper.getApi(),
                columnApi: this.gridOptionsWrapper.getColumnApi(),
                context: this.gridOptionsWrapper.getContext()
            });
        }
        else {
            return value;
        }
    };
    CsvCreator.prototype.createValueForGroupNode = function (node) {
        var keys = [node.key];
        while (node.parent) {
            node = node.parent;
            keys.push(node.key);
        }
        return keys.reverse().join(' -> ');
    };
    CsvCreator.prototype.putInQuotes = function (value, suppressQuotes) {
        if (suppressQuotes) {
            return value;
        }
        if (value === null || value === undefined) {
            return '""';
        }
        var stringValue;
        if (typeof value === 'string') {
            stringValue = value;
        }
        else if (typeof value.toString === 'function') {
            stringValue = value.toString();
        }
        else {
            console.warn('unknown value type during csv conversion');
            stringValue = '';
        }
        // replace each " with "" (ie two sets of double quotes is how to do double quotes in csv)
        var valueEscaped = stringValue.replace(/"/g, "\"\"");
        return '"' + valueEscaped + '"';
    };
    __decorate([
        context_1.Autowired('rowModel')
    ], CsvCreator.prototype, "rowModel");
    __decorate([
        context_1.Autowired('columnController')
    ], CsvCreator.prototype, "columnController");
    __decorate([
        context_1.Autowired('valueService')
    ], CsvCreator.prototype, "valueService");
    __decorate([
        context_1.Autowired('gridOptionsWrapper')
    ], CsvCreator.prototype, "gridOptionsWrapper");
    CsvCreator = __decorate([
        context_1.Bean('csvCreator')
    ], CsvCreator);
    return CsvCreator;
}());
exports.CsvCreator = CsvCreator;
//# sourceMappingURL=csvCreator.js.map