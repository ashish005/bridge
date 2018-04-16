"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var utils_1 = require("../utils");
var textFilter_1 = require("./textFilter");
var numberFilter_1 = require("./numberFilter");
var context_1 = require("../context/context");
var events_1 = require("../events");
var FilterManager = (function () {
    function FilterManager() {
        this.allFilters = {};
        this.quickFilter = null;
        this.availableFilters = {
            'text': textFilter_1.TextFilter,
            'number': numberFilter_1.NumberFilter
        };
    }
    FilterManager.prototype.init = function () {
        this.eventService.addEventListener(events_1.Events.EVENT_ROW_DATA_CHANGED, this.onNewRowsLoaded.bind(this));
        this.eventService.addEventListener(events_1.Events.EVENT_NEW_COLUMNS_LOADED, this.onNewColumnsLoaded.bind(this));
        this.quickFilter = this.parseQuickFilter(this.gridOptionsWrapper.getQuickFilterText());
    };
    FilterManager.prototype.registerFilter = function (key, Filter) {
        this.availableFilters[key] = Filter;
    };
    FilterManager.prototype.setFilterModel = function (model) {
        var _this = this;
        if (model) {
            // mark the filters as we set them, so any active filters left over we stop
            var modelKeys = Object.keys(model);
            utils_1.Utils.iterateObject(this.allFilters, function (colId, filterWrapper) {
                utils_1.Utils.removeFromArray(modelKeys, colId);
                var newModel = model[colId];
                _this.setModelOnFilterWrapper(filterWrapper.filter, newModel);
            });
            // at this point, processedFields contains data for which we don't have a filter working yet
            utils_1.Utils.iterateArray(modelKeys, function (colId) {
                var column = _this.columnController.getOriginalColumn(colId);
                if (!column) {
                    console.warn('Warning ag-grid setFilterModel - no column found for colId ' + colId);
                    return;
                }
                var filterWrapper = _this.getOrCreateFilterWrapper(column);
                _this.setModelOnFilterWrapper(filterWrapper.filter, model[colId]);
            });
        }
        else {
            utils_1.Utils.iterateObject(this.allFilters, function (key, filterWrapper) {
                _this.setModelOnFilterWrapper(filterWrapper.filter, null);
            });
        }
        this.onFilterChanged();
    };
    FilterManager.prototype.setModelOnFilterWrapper = function (filter, newModel) {
        // because user can provide filters, we provide useful error checking and messages
        if (typeof filter.getApi !== 'function') {
            console.warn('Warning ag-grid - filter missing getApi method, which is needed for getFilterModel');
            return;
        }
        var filterApi = filter.getApi();
        if (typeof filterApi.setModel !== 'function') {
            console.warn('Warning ag-grid - filter API missing setModel method, which is needed for setFilterModel');
            return;
        }
        filterApi.setModel(newModel);
    };
    FilterManager.prototype.getFilterModel = function () {
        var result = {};
        utils_1.Utils.iterateObject(this.allFilters, function (key, filterWrapper) {
            // because user can provide filters, we provide useful error checking and messages
            if (typeof filterWrapper.filter.getApi !== 'function') {
                console.warn('Warning ag-grid - filter missing getApi method, which is needed for getFilterModel');
                return;
            }
            var filterApi = filterWrapper.filter.getApi();
            if (typeof filterApi.getModel !== 'function') {
                console.warn('Warning ag-grid - filter API missing getModel method, which is needed for getFilterModel');
                return;
            }
            var model = filterApi.getModel();
            if (utils_1.Utils.exists(model)) {
                result[key] = model;
            }
        });
        return result;
    };
    // returns true if any advanced filter (ie not quick filter) active
    FilterManager.prototype.isAdvancedFilterPresent = function () {
        var atLeastOneActive = false;
        utils_1.Utils.iterateObject(this.allFilters, function (key, filterWrapper) {
            if (!filterWrapper.filter.isFilterActive) {
                console.error('Filter is missing method isFilterActive');
            }
            if (filterWrapper.filter.isFilterActive()) {
                atLeastOneActive = true;
                filterWrapper.column.setFilterActive(true);
            }
            else {
                filterWrapper.column.setFilterActive(false);
            }
        });
        return atLeastOneActive;
    };
    // returns true if quickFilter or advancedFilter
    FilterManager.prototype.isAnyFilterPresent = function () {
        return this.isQuickFilterPresent() || this.advancedFilterPresent || this.externalFilterPresent;
    };
    FilterManager.prototype.doesFilterPass = function (node, filterToSkip) {
        var data = node.data;
        var colKeys = Object.keys(this.allFilters);
        for (var i = 0, l = colKeys.length; i < l; i++) {
            var colId = colKeys[i];
            var filterWrapper = this.allFilters[colId];
            // if no filter, always pass
            if (filterWrapper === undefined) {
                continue;
            }
            if (filterWrapper.filter === filterToSkip) {
                continue;
            }
            // don't bother with filters that are not active
            if (!filterWrapper.filter.isFilterActive()) {
                continue;
            }
            if (!filterWrapper.filter.doesFilterPass) {
                console.error('Filter is missing method doesFilterPass');
            }
            var params = {
                node: node,
                data: data
            };
            if (!filterWrapper.filter.doesFilterPass(params)) {
                return false;
            }
        }
        // all filters passed
        return true;
    };
    FilterManager.prototype.parseQuickFilter = function (newFilter) {
        if (utils_1.Utils.missing(newFilter) || newFilter === "") {
            return null;
        }
        if (this.gridOptionsWrapper.isRowModelVirtual()) {
            console.warn('ag-grid: cannot do quick filtering when doing virtual paging');
            return null;
        }
        return newFilter.toUpperCase();
    };
    // returns true if it has changed (not just same value again)
    FilterManager.prototype.setQuickFilter = function (newFilter) {
        var parsedFilter = this.parseQuickFilter(newFilter);
        if (this.quickFilter !== parsedFilter) {
            this.quickFilter = parsedFilter;
            this.onFilterChanged();
        }
    };
    FilterManager.prototype.onFilterChanged = function () {
        this.eventService.dispatchEvent(events_1.Events.EVENT_BEFORE_FILTER_CHANGED);
        this.advancedFilterPresent = this.isAdvancedFilterPresent();
        this.externalFilterPresent = this.gridOptionsWrapper.isExternalFilterPresent();
        utils_1.Utils.iterateObject(this.allFilters, function (key, filterWrapper) {
            if (filterWrapper.filter.onAnyFilterChanged) {
                filterWrapper.filter.onAnyFilterChanged();
            }
        });
        this.eventService.dispatchEvent(events_1.Events.EVENT_FILTER_CHANGED);
        this.eventService.dispatchEvent(events_1.Events.EVENT_AFTER_FILTER_CHANGED);
    };
    FilterManager.prototype.isQuickFilterPresent = function () {
        return this.quickFilter !== null;
    };
    FilterManager.prototype.doesRowPassOtherFilters = function (filterToSkip, node) {
        return this.doesRowPassFilter(node, filterToSkip);
    };
    FilterManager.prototype.doesRowPassFilter = function (node, filterToSkip) {
        //first up, check quick filter
        if (this.isQuickFilterPresent()) {
            if (!node.quickFilterAggregateText) {
                this.aggregateRowForQuickFilter(node);
            }
            if (node.quickFilterAggregateText.indexOf(this.quickFilter) < 0) {
                //quick filter fails, so skip item
                return false;
            }
        }
        //secondly, give the client a chance to reject this row
        if (this.externalFilterPresent) {
            if (!this.gridOptionsWrapper.doesExternalFilterPass(node)) {
                return false;
            }
        }
        //lastly, check our internal advanced filter
        if (this.advancedFilterPresent) {
            if (!this.doesFilterPass(node, filterToSkip)) {
                return false;
            }
        }
        //got this far, all filters pass
        return true;
    };
    FilterManager.prototype.aggregateRowForQuickFilter = function (node) {
        var aggregatedText = '';
        var that = this;
        this.columnController.getAllOriginalColumns().forEach(function (column) {
            var value = that.valueService.getValue(column, node);
            if (value && value !== '') {
                aggregatedText = aggregatedText + value.toString().toUpperCase() + "_";
            }
        });
        node.quickFilterAggregateText = aggregatedText;
    };
    FilterManager.prototype.onNewRowsLoaded = function () {
        var that = this;
        Object.keys(this.allFilters).forEach(function (field) {
            var filter = that.allFilters[field].filter;
            if (filter.onNewRowsLoaded) {
                filter.onNewRowsLoaded();
            }
        });
    };
    FilterManager.prototype.createValueGetter = function (column) {
        var that = this;
        return function valueGetter(node) {
            return that.valueService.getValue(column, node);
        };
    };
    FilterManager.prototype.getFilterApi = function (column) {
        var filterWrapper = this.getOrCreateFilterWrapper(column);
        if (filterWrapper) {
            if (typeof filterWrapper.filter.getApi === 'function') {
                return filterWrapper.filter.getApi();
            }
        }
    };
    FilterManager.prototype.getOrCreateFilterWrapper = function (column) {
        var filterWrapper = this.allFilters[column.getColId()];
        if (!filterWrapper) {
            filterWrapper = this.createFilterWrapper(column);
            this.allFilters[column.getColId()] = filterWrapper;
        }
        return filterWrapper;
    };
    // destroys the filter, so it not longer takes par
    FilterManager.prototype.destroyFilter = function (column) {
        var filterWrapper = this.allFilters[column.getColId()];
        if (filterWrapper) {
            if (filterWrapper.destroy) {
                filterWrapper.destroy();
            }
            delete this.allFilters[column.getColId()];
            this.onFilterChanged();
            filterWrapper.column.setFilterActive(false);
        }
    };
    FilterManager.prototype.createFilterWrapper = function (column) {
        var _this = this;
        var colDef = column.getColDef();
        var filterWrapper = {
            column: column,
            filter: null,
            scope: null,
            gui: null
        };
        if (typeof colDef.filter === 'function') {
            // if user provided a filter, just use it
            // first up, create child scope if needed
            if (this.gridOptionsWrapper.isAngularCompileFilters()) {
                filterWrapper.scope = this.$scope.$new();
                filterWrapper.scope.context = this.gridOptionsWrapper.getContext();
            }
            // now create filter (had to cast to any to get 'new' working)
            this.assertMethodHasNoParameters(colDef.filter);
            filterWrapper.filter = new colDef.filter();
        }
        else if (utils_1.Utils.missing(colDef.filter) || typeof colDef.filter === 'string') {
            var Filter = this.getFilterFromCache(colDef.filter);
            filterWrapper.filter = new Filter();
        }
        else {
            console.error('ag-Grid: colDef.filter should be function or a string');
        }
        this.context.wireBean(filterWrapper.filter);
        var filterChangedCallback = this.onFilterChanged.bind(this);
        var filterModifiedCallback = function () { return _this.eventService.dispatchEvent(events_1.Events.EVENT_FILTER_MODIFIED); };
        var doesRowPassOtherFilters = this.doesRowPassOtherFilters.bind(this, filterWrapper.filter);
        var filterParams = colDef.filterParams;
        var params = {
            column: column,
            colDef: colDef,
            rowModel: this.rowModel,
            filterChangedCallback: filterChangedCallback,
            filterModifiedCallback: filterModifiedCallback,
            filterParams: filterParams,
            localeTextFunc: this.gridOptionsWrapper.getLocaleTextFunc(),
            valueGetter: this.createValueGetter(column),
            doesRowPassOtherFilter: doesRowPassOtherFilters,
            context: this.gridOptionsWrapper.getContext(),
            $scope: filterWrapper.scope
        };
        if (!filterWrapper.filter.init) {
            throw 'Filter is missing method init';
        }
        filterWrapper.filter.init(params);
        if (!filterWrapper.filter.getGui) {
            throw 'Filter is missing method getGui';
        }
        var eFilterGui = document.createElement('div');
        eFilterGui.className = 'ag-filter';
        var guiFromFilter = filterWrapper.filter.getGui();
        if (utils_1.Utils.isNodeOrElement(guiFromFilter)) {
            //a dom node or element was returned, so add child
            eFilterGui.appendChild(guiFromFilter);
        }
        else {
            //otherwise assume it was html, so just insert
            var eTextSpan = document.createElement('span');
            eTextSpan.innerHTML = guiFromFilter;
            eFilterGui.appendChild(eTextSpan);
        }
        if (filterWrapper.scope) {
            filterWrapper.gui = this.$compile(eFilterGui)(filterWrapper.scope)[0];
        }
        else {
            filterWrapper.gui = eFilterGui;
        }
        return filterWrapper;
    };
    FilterManager.prototype.getFilterFromCache = function (filterType) {
        var defaultFilterType = this.enterprise ? 'set' : 'text';
        var defaultFilter = this.availableFilters[defaultFilterType];
        if (utils_1.Utils.missing(filterType)) {
            return defaultFilter;
        }
        if (!this.enterprise && filterType === 'set') {
            console.warn('ag-Grid: Set filter is only available in Enterprise ag-Grid');
            filterType = 'text';
        }
        if (this.availableFilters[filterType]) {
            return this.availableFilters[filterType];
        }
        else {
            console.error('ag-Grid: Could not find filter type ' + filterType);
            return this.availableFilters[defaultFilter];
        }
    };
    FilterManager.prototype.onNewColumnsLoaded = function () {
        this.destroy();
    };
    FilterManager.prototype.destroy = function () {
        utils_1.Utils.iterateObject(this.allFilters, function (key, filterWrapper) {
            if (filterWrapper.filter.destroy) {
                filterWrapper.filter.destroy();
                filterWrapper.column.setFilterActive(false);
            }
        });
        this.allFilters = {};
    };
    FilterManager.prototype.assertMethodHasNoParameters = function (theMethod) {
        var getRowsParams = utils_1.Utils.getFunctionParameters(theMethod);
        if (getRowsParams.length > 0) {
            console.warn('ag-grid: It looks like your filter is of the old type and expecting parameters in the constructor.');
            console.warn('ag-grid: From ag-grid 1.14, the constructor should take no parameters and init() used instead.');
        }
    };
    __decorate([
        context_1.Autowired('$compile')
    ], FilterManager.prototype, "$compile");
    __decorate([
        context_1.Autowired('$scope')
    ], FilterManager.prototype, "$scope");
    __decorate([
        context_1.Autowired('gridOptionsWrapper')
    ], FilterManager.prototype, "gridOptionsWrapper");
    __decorate([
        context_1.Autowired('gridCore')
    ], FilterManager.prototype, "gridCore");
    __decorate([
        context_1.Autowired('popupService')
    ], FilterManager.prototype, "popupService");
    __decorate([
        context_1.Autowired('valueService')
    ], FilterManager.prototype, "valueService");
    __decorate([
        context_1.Autowired('columnController')
    ], FilterManager.prototype, "columnController");
    __decorate([
        context_1.Autowired('rowModel')
    ], FilterManager.prototype, "rowModel");
    __decorate([
        context_1.Autowired('eventService')
    ], FilterManager.prototype, "eventService");
    __decorate([
        context_1.Autowired('enterprise')
    ], FilterManager.prototype, "enterprise");
    __decorate([
        context_1.Autowired('context')
    ], FilterManager.prototype, "context");
    __decorate([
        context_1.PostConstruct
    ], FilterManager.prototype, "init");
    __decorate([
        context_1.PreDestroy
    ], FilterManager.prototype, "destroy");
    FilterManager = __decorate([
        context_1.Bean('filterManager')
    ], FilterManager);
    return FilterManager;
}());
exports.FilterManager = FilterManager;
//# sourceMappingURL=filterManager.js.map