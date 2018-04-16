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
var constants_1 = require("./constants");
var events_1 = require("./events");
var borderLayout_1 = require("./layout/borderLayout");
var context_1 = require("./context/context");
var GridCore = (function () {
    function GridCore(loggerFactory) {
        this.logger = loggerFactory.create('GridCore');
    }
    GridCore.prototype.init = function () {
        var _this = this;
        // and the last bean, done in it's own section, as it's optional
        var toolPanelGui;
        var eSouthPanel = this.createSouthPanel();
        if (this.toolPanel && !this.gridOptionsWrapper.isForPrint()) {
            toolPanelGui = this.toolPanel.getGui();
        }
        var rowGroupGui;
        if (this.rowGroupCompFactory) {
            this.rowGroupComp = this.rowGroupCompFactory.create();
            rowGroupGui = this.rowGroupComp.getGui();
        }
        this.eRootPanel = new borderLayout_1.BorderLayout({
            center: this.gridPanel.getLayout(),
            east: toolPanelGui,
            north: rowGroupGui,
            south: eSouthPanel,
            dontFill: this.gridOptionsWrapper.isForPrint(),
            name: 'eRootPanel'
        });
        // see what the grid options are for default of toolbar
        this.showToolPanel(this.gridOptionsWrapper.isShowToolPanel());
        this.eGridDiv.appendChild(this.eRootPanel.getGui());
        // if using angular, watch for quickFilter changes
        if (this.$scope) {
            this.$scope.$watch(this.quickFilterOnScope, function (newFilter) { return _this.filterManager.setQuickFilter(newFilter); });
        }
        if (!this.gridOptionsWrapper.isForPrint()) {
            this.addWindowResizeListener();
        }
        this.doLayout();
        this.finished = false;
        this.periodicallyDoLayout();
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_ROW_GROUP_CHANGED, this.onRowGroupChanged.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_COLUMN_EVERYTHING_CHANGED, this.onRowGroupChanged.bind(this));
        this.onRowGroupChanged();
        this.logger.log('ready');
    };
    GridCore.prototype.getRootGui = function () {
        return this.eRootPanel.getGui();
    };
    GridCore.prototype.createSouthPanel = function () {
        if (!this.statusBar && this.gridOptionsWrapper.isEnableStatusBar()) {
            console.warn('ag-Grid: status bar is only available in ag-Grid-Enterprise');
        }
        var statusBarEnabled = this.statusBar && this.gridOptionsWrapper.isEnableStatusBar();
        var paginationPanelEnabled = this.gridOptionsWrapper.isRowModelPagination() && !this.gridOptionsWrapper.isForPrint();
        if (!statusBarEnabled && !paginationPanelEnabled) {
            return null;
        }
        var eSouthPanel = document.createElement('div');
        if (statusBarEnabled) {
            eSouthPanel.appendChild(this.statusBar.getGui());
        }
        if (paginationPanelEnabled) {
            eSouthPanel.appendChild(this.paginationController.getGui());
        }
        return eSouthPanel;
    };
    GridCore.prototype.onRowGroupChanged = function () {
        if (!this.rowGroupComp) {
            return;
        }
        var rowGroupPanelShow = this.gridOptionsWrapper.getRowGroupPanelShow();
        if (rowGroupPanelShow === constants_1.Constants.ALWAYS) {
            this.eRootPanel.setNorthVisible(true);
        }
        else if (rowGroupPanelShow === constants_1.Constants.ONLY_WHEN_GROUPING) {
            var grouping = !this.columnController.isRowGroupEmpty();
            this.eRootPanel.setNorthVisible(grouping);
        }
        else {
            this.eRootPanel.setNorthVisible(false);
        }
    };
    GridCore.prototype.addWindowResizeListener = function () {
        var that = this;
        // putting this into a function, so when we remove the function,
        // we are sure we are removing the exact same function (i'm not
        // sure what 'bind' does to the function reference, if it's safe
        // the result from 'bind').
        this.windowResizeListener = function resizeListener() {
            that.doLayout();
        };
        window.addEventListener('resize', this.windowResizeListener);
    };
    GridCore.prototype.periodicallyDoLayout = function () {
        if (!this.finished) {
            var that = this;
            setTimeout(function () {
                that.doLayout();
                that.gridPanel.periodicallyCheck();
                that.periodicallyDoLayout();
            }, 500);
        }
    };
    GridCore.prototype.showToolPanel = function (show) {
        if (show && !this.toolPanel) {
            console.warn('ag-Grid: toolPanel is only available in ag-Grid Enterprise');
            this.toolPanelShowing = false;
            return;
        }
        this.toolPanelShowing = show;
        this.eRootPanel.setEastVisible(show);
    };
    GridCore.prototype.isToolPanelShowing = function () {
        return this.toolPanelShowing;
    };
    GridCore.prototype.destroy = function () {
        if (this.windowResizeListener) {
            window.removeEventListener('resize', this.windowResizeListener);
            this.logger.log('Removing windowResizeListener');
        }
        this.finished = true;
        this.eGridDiv.removeChild(this.eRootPanel.getGui());
        this.logger.log('Grid DOM removed');
    };
    GridCore.prototype.ensureNodeVisible = function (comparator) {
        if (this.doingVirtualPaging) {
            throw 'Cannot use ensureNodeVisible when doing virtual paging, as we cannot check rows that are not in memory';
        }
        // look for the node index we want to display
        var rowCount = this.rowModel.getRowCount();
        var comparatorIsAFunction = typeof comparator === 'function';
        var indexToSelect = -1;
        // go through all the nodes, find the one we want to show
        for (var i = 0; i < rowCount; i++) {
            var node = this.rowModel.getRow(i);
            if (comparatorIsAFunction) {
                if (comparator(node)) {
                    indexToSelect = i;
                    break;
                }
            }
            else {
                // check object equality against node and data
                if (comparator === node || comparator === node.data) {
                    indexToSelect = i;
                    break;
                }
            }
        }
        if (indexToSelect >= 0) {
            this.gridPanel.ensureIndexVisible(indexToSelect);
        }
    };
    GridCore.prototype.doLayout = function () {
        // need to do layout first, as drawVirtualRows and setPinnedColHeight
        // need to know the result of the resizing of the panels.
        var sizeChanged = this.eRootPanel.doLayout();
        // both of the two below should be done in gridPanel, the gridPanel should register 'resize' to the panel
        if (sizeChanged) {
            this.rowRenderer.drawVirtualRows();
            var event = {
                clientWidth: this.eRootPanel.getGui().clientWidth,
                clientHeight: this.eRootPanel.getGui().clientHeight
            };
            this.eventService.dispatchEvent(events_1.Events.EVENT_GRID_SIZE_CHANGED, event);
        }
    };
    __decorate([
        context_1.Autowired('gridOptions')
    ], GridCore.prototype, "gridOptions");
    __decorate([
        context_1.Autowired('gridOptionsWrapper')
    ], GridCore.prototype, "gridOptionsWrapper");
    __decorate([
        context_1.Autowired('paginationController')
    ], GridCore.prototype, "paginationController");
    __decorate([
        context_1.Autowired('rowModel')
    ], GridCore.prototype, "rowModel");
    __decorate([
        context_1.Autowired('columnController')
    ], GridCore.prototype, "columnController");
    __decorate([
        context_1.Autowired('rowRenderer')
    ], GridCore.prototype, "rowRenderer");
    __decorate([
        context_1.Autowired('filterManager')
    ], GridCore.prototype, "filterManager");
    __decorate([
        context_1.Autowired('eventService')
    ], GridCore.prototype, "eventService");
    __decorate([
        context_1.Autowired('gridPanel')
    ], GridCore.prototype, "gridPanel");
    __decorate([
        context_1.Autowired('eGridDiv')
    ], GridCore.prototype, "eGridDiv");
    __decorate([
        context_1.Autowired('$scope')
    ], GridCore.prototype, "$scope");
    __decorate([
        context_1.Autowired('quickFilterOnScope')
    ], GridCore.prototype, "quickFilterOnScope");
    __decorate([
        context_1.Autowired('popupService')
    ], GridCore.prototype, "popupService");
    __decorate([
        context_1.Autowired('focusedCellController')
    ], GridCore.prototype, "focusedCellController");
    __decorate([
        context_1.Optional('rowGroupCompFactory')
    ], GridCore.prototype, "rowGroupCompFactory");
    __decorate([
        context_1.Optional('toolPanel')
    ], GridCore.prototype, "toolPanel");
    __decorate([
        context_1.Optional('statusBar')
    ], GridCore.prototype, "statusBar");
    __decorate([
        context_1.PostConstruct
    ], GridCore.prototype, "init");
    __decorate([
        context_1.PreDestroy
    ], GridCore.prototype, "destroy");
    GridCore = __decorate([
        context_1.Bean('gridCore'),
        __param(0, context_1.Qualifier('loggerFactory'))
    ], GridCore);
    return GridCore;
}());
exports.GridCore = GridCore;
//# sourceMappingURL=gridCore.js.map