"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var context_1 = require("../context/context");
var ValueFormatterService = (function () {
    function ValueFormatterService() {
    }
    ValueFormatterService.prototype.formatValue = function (column, rowNode, $scope, rowIndex, value) {
        var formatter;
        var colDef = column.getColDef();
        // if floating, give preference to the floating formatter
        if (rowNode.floating) {
            formatter = colDef.floatingCellFormatter ? colDef.floatingCellFormatter : colDef.cellFormatter;
        }
        else {
            formatter = colDef.cellFormatter;
        }
        var result = null;
        if (formatter) {
            var params = {
                value: value,
                node: rowNode,
                column: column,
                $scope: $scope,
                rowIndex: rowIndex,
                api: this.gridOptionsWrapper.getApi(),
                context: this.gridOptionsWrapper.getContext()
            };
            result = formatter(params);
        }
        return result;
    };
    __decorate([
        context_1.Autowired('gridOptionsWrapper')
    ], ValueFormatterService.prototype, "gridOptionsWrapper");
    ValueFormatterService = __decorate([
        context_1.Bean('valueFormatterService')
    ], ValueFormatterService);
    return ValueFormatterService;
}());
exports.ValueFormatterService = ValueFormatterService;
//# sourceMappingURL=valueFormatterService.js.map