"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var context_1 = require("../../context/context");
var rowNode_1 = require("../../entities/rowNode");
var utils_1 = require("../../utils");
var FlattenStage = (function () {
    function FlattenStage() {
    }
    FlattenStage.prototype.execute = function (rootNode) {
        // even if not doing grouping, we do the mapping, as the client might
        // of passed in data that already has a grouping in it somewhere
        var result = [];
        // putting value into a wrapper so it's passed by reference
        var nextRowTop = { value: 0 };
        // if we are reducing, and not grouping, then we want to show the root node, as that
        // is where the pivot values are
        var showRootNode = this.columnController.isReduce() && rootNode.leafGroup;
        var topList = showRootNode ? [rootNode] : rootNode.childrenAfterSort;
        this.recursivelyAddToRowsToDisplay(topList, result, nextRowTop);
        return result;
    };
    FlattenStage.prototype.recursivelyAddToRowsToDisplay = function (rowsToFlatten, result, nextRowTop) {
        if (utils_1.Utils.missingOrEmpty(rowsToFlatten)) {
            return;
        }
        var groupSuppressRow = this.gridOptionsWrapper.isGroupSuppressRow();
        for (var i = 0; i < rowsToFlatten.length; i++) {
            var rowNode = rowsToFlatten[i];
            var skipGroupNode = groupSuppressRow && rowNode.group;
            if (!skipGroupNode) {
                this.addRowNodeToRowsToDisplay(rowNode, result, nextRowTop);
            }
            if (rowNode.group && rowNode.expanded) {
                this.recursivelyAddToRowsToDisplay(rowNode.childrenAfterSort, result, nextRowTop);
                // put a footer in if user is looking for it
                if (this.gridOptionsWrapper.isGroupIncludeFooter()) {
                    var footerNode = this.createFooterNode(rowNode);
                    this.addRowNodeToRowsToDisplay(footerNode, result, nextRowTop);
                }
            }
        }
    };
    // duplicated method, it's also in floatingRowModel
    FlattenStage.prototype.addRowNodeToRowsToDisplay = function (rowNode, result, nextRowTop) {
        result.push(rowNode);
        rowNode.rowHeight = this.gridOptionsWrapper.getRowHeightForNode(rowNode);
        rowNode.rowTop = nextRowTop.value;
        nextRowTop.value += rowNode.rowHeight;
    };
    FlattenStage.prototype.createFooterNode = function (groupNode) {
        var footerNode = new rowNode_1.RowNode();
        this.context.wireBean(footerNode);
        Object.keys(groupNode).forEach(function (key) {
            footerNode[key] = groupNode[key];
        });
        footerNode.footer = true;
        // get both header and footer to reference each other as siblings. this is never undone,
        // only overwritten. so if a group is expanded, then contracted, it will have a ghost
        // sibling - but that's fine, as we can ignore this if the header is contracted.
        footerNode.sibling = groupNode;
        groupNode.sibling = footerNode;
        return footerNode;
    };
    __decorate([
        context_1.Autowired('gridOptionsWrapper')
    ], FlattenStage.prototype, "gridOptionsWrapper");
    __decorate([
        context_1.Autowired('selectionController')
    ], FlattenStage.prototype, "selectionController");
    __decorate([
        context_1.Autowired('eventService')
    ], FlattenStage.prototype, "eventService");
    __decorate([
        context_1.Autowired('context')
    ], FlattenStage.prototype, "context");
    __decorate([
        context_1.Autowired('columnController')
    ], FlattenStage.prototype, "columnController");
    FlattenStage = __decorate([
        context_1.Bean('flattenStage')
    ], FlattenStage);
    return FlattenStage;
}());
exports.FlattenStage = FlattenStage;
//# sourceMappingURL=flattenStage.js.map