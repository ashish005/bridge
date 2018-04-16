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
var textCellEditor_1 = require("./cellEditors/textCellEditor");
var selectCellEditor_1 = require("./cellEditors/selectCellEditor");
var popupEditorWrapper_1 = require("./cellEditors/popupEditorWrapper");
var popupTextCellEditor_1 = require("./cellEditors/popupTextCellEditor");
var popupSelectCellEditor_1 = require("./cellEditors/popupSelectCellEditor");
var dateCellEditor_1 = require("./cellEditors/dateCellEditor");
var CellEditorFactory = (function () {
    function CellEditorFactory() {
        this.cellEditorMap = {};
    }
    CellEditorFactory_1 = CellEditorFactory;
    CellEditorFactory.prototype.init = function () {
        this.cellEditorMap[CellEditorFactory_1.TEXT] = textCellEditor_1.TextCellEditor;
        this.cellEditorMap[CellEditorFactory_1.SELECT] = selectCellEditor_1.SelectCellEditor;
        this.cellEditorMap[CellEditorFactory_1.POPUP_TEXT] = popupTextCellEditor_1.PopupTextCellEditor;
        this.cellEditorMap[CellEditorFactory_1.POPUP_SELECT] = popupSelectCellEditor_1.PopupSelectCellEditor;
        this.cellEditorMap[CellEditorFactory_1.DATE] = dateCellEditor_1.DateCellEditor;
    };
    CellEditorFactory.prototype.addCellEditor = function (key, cellEditor) {
        this.cellEditorMap[key] = cellEditor;
    };
    // private registerEditorsFromGridOptions(): void {
    //     var userProvidedCellEditors = this.gridOptionsWrapper.getCellEditors();
    //     _.iterateObject(userProvidedCellEditors, (key: string, cellEditor: {new(): ICellEditor})=> {
    //         this.addCellEditor(key, cellEditor);
    //     });
    // }
    CellEditorFactory.prototype.createCellEditor = function (key) {
        var CellEditorClass;
        if (utils_1.Utils.missing(key)) {
            CellEditorClass = this.cellEditorMap[CellEditorFactory_1.TEXT];
        }
        else if (typeof key === 'string') {
            CellEditorClass = this.cellEditorMap[key];
            if (utils_1.Utils.missing(CellEditorClass)) {
                console.warn('ag-Grid: unable to find cellEditor for key ' + key);
                CellEditorClass = this.cellEditorMap[CellEditorFactory_1.TEXT];
            }
        }
        else {
            CellEditorClass = key;
        }
        var cellEditor = new CellEditorClass();
        this.context.wireBean(cellEditor);
        if (cellEditor.isPopup && cellEditor.isPopup()) {
            cellEditor = new popupEditorWrapper_1.PopupEditorWrapper(cellEditor);
        }
        return cellEditor;
    };
    CellEditorFactory.TEXT = 'text';
    CellEditorFactory.SELECT = 'select';
    CellEditorFactory.DATE = 'date';
    CellEditorFactory.POPUP_TEXT = 'popupText';
    CellEditorFactory.POPUP_SELECT = 'popupSelect';
    __decorate([
        context_1.Autowired('context')
    ], CellEditorFactory.prototype, "context");
    __decorate([
        context_1.Autowired('gridOptionsWrapper')
    ], CellEditorFactory.prototype, "gridOptionsWrapper");
    __decorate([
        context_1.PostConstruct
    ], CellEditorFactory.prototype, "init");
    CellEditorFactory = CellEditorFactory_1 = __decorate([
        context_1.Bean('cellEditorFactory')
    ], CellEditorFactory);
    return CellEditorFactory;
    var CellEditorFactory_1;
}());
exports.CellEditorFactory = CellEditorFactory;
//# sourceMappingURL=cellEditorFactory.js.map