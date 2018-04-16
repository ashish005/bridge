"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var utils_1 = require("../utils");
var context_1 = require("../context/context");
/** Class to use a cellRenderer. */
var CellRendererService = (function () {
    function CellRendererService() {
    }
    /** Uses a cellRenderer, and returns the cellRenderer object if it is a class implementing ICellRenderer.
     * @cellRendererKey: The cellRenderer to use. Can be: a) a class that we call 'new' on b) a function we call
     *                   or c) a string that we use to look up the cellRenderer.
     * @params: The params to pass to the cell renderer if it's a function or a class.
     * @eTarget: The DOM element we will put the results of the html element into *
     * @return: If options a, it returns the created class instance */
    CellRendererService.prototype.useCellRenderer = function (cellRendererKey, eTarget, params) {
        var cellRenderer = this.lookUpCellRenderer(cellRendererKey);
        if (utils_1.Utils.missing(cellRenderer)) {
            // this is a bug in users config, they specified a cellRenderer that doesn't exist,
            // the factory already printed to console, so here we just skip
            return;
        }
        var resultFromRenderer;
        var iCellRendererInstance = null;
        this.checkForDeprecatedItems(cellRenderer);
        // we check if the class has the 'getGui' method to know if it's a component
        var rendererIsAComponent = this.doesImplementICellRenderer(cellRenderer);
        // if it's a component, we create and initialise it
        if (rendererIsAComponent) {
            var CellRendererClass = cellRenderer;
            iCellRendererInstance = new CellRendererClass();
            this.context.wireBean(iCellRendererInstance);
            if (iCellRendererInstance.init) {
                iCellRendererInstance.init(params);
            }
            resultFromRenderer = iCellRendererInstance.getGui();
        }
        else {
            // otherwise it's a function, so we just use it
            var cellRendererFunc = cellRenderer;
            resultFromRenderer = cellRendererFunc(params);
        }
        if (resultFromRenderer === null || resultFromRenderer === '') {
            return;
        }
        if (utils_1.Utils.isNodeOrElement(resultFromRenderer)) {
            // a dom node or element was returned, so add child
            eTarget.appendChild(resultFromRenderer);
        }
        else {
            // otherwise assume it was html, so just insert
            eTarget.innerHTML = resultFromRenderer;
        }
        return iCellRendererInstance;
    };
    CellRendererService.prototype.checkForDeprecatedItems = function (cellRenderer) {
        if (cellRenderer && cellRenderer.renderer) {
            console.warn('ag-grid: colDef.cellRenderer should not be an object, it should be a string, function or class. this ' +
                'changed in v4.1.x, please check the documentation on Cell Rendering, or if you are doing grouping, look at the grouping examples.');
        }
    };
    CellRendererService.prototype.doesImplementICellRenderer = function (cellRenderer) {
        // see if the class has a prototype that defines a getGui method. this is very rough,
        // but javascript doesn't have types, so is the only way!
        return cellRenderer.prototype && 'getGui' in cellRenderer.prototype;
    };
    CellRendererService.prototype.lookUpCellRenderer = function (cellRendererKey) {
        if (typeof cellRendererKey === 'string') {
            return this.cellRendererFactory.getCellRenderer(cellRendererKey);
        }
        else {
            return cellRendererKey;
        }
    };
    __decorate([
        context_1.Autowired('cellRendererFactory')
    ], CellRendererService.prototype, "cellRendererFactory");
    __decorate([
        context_1.Autowired('context')
    ], CellRendererService.prototype, "context");
    CellRendererService = __decorate([
        context_1.Bean('cellRendererService')
    ], CellRendererService);
    return CellRendererService;
}());
exports.CellRendererService = CellRendererService;
//# sourceMappingURL=cellRendererService.js.map