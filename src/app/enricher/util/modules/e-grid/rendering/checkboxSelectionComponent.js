"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var component_1 = require("../widgets/component");
var rowNode_1 = require("../entities/rowNode");
var utils_1 = require("../utils");
var context_1 = require("../context/context");
var svgFactory_1 = require("../svgFactory");
var svgFactory = svgFactory_1.SvgFactory.getInstance();
var CheckboxSelectionComponent = (function (_super) {
    __extends(CheckboxSelectionComponent, _super);
    function CheckboxSelectionComponent() {
        return _super.call(this, "<span class=\"ag-selection-checkbox\"/>") || this;
    }
    CheckboxSelectionComponent.prototype.createAndAddIcons = function () {
        this.eCheckedIcon = utils_1.Utils.createIconNoSpan('checkboxChecked', this.gridOptionsWrapper, null, svgFactory.createCheckboxCheckedIcon);
        this.eUncheckedIcon = utils_1.Utils.createIconNoSpan('checkboxUnchecked', this.gridOptionsWrapper, null, svgFactory.createCheckboxUncheckedIcon);
        this.eIndeterminateIcon = utils_1.Utils.createIconNoSpan('checkboxIndeterminate', this.gridOptionsWrapper, null, svgFactory.createCheckboxIndeterminateIcon);
        var eGui = this.getGui();
        eGui.appendChild(this.eCheckedIcon);
        eGui.appendChild(this.eUncheckedIcon);
        eGui.appendChild(this.eIndeterminateIcon);
    };
    CheckboxSelectionComponent.prototype.onSelectionChanged = function () {
        var state = this.rowNode.isSelected();
        utils_1.Utils.setVisible(this.eCheckedIcon, state === true);
        utils_1.Utils.setVisible(this.eUncheckedIcon, state === false);
        utils_1.Utils.setVisible(this.eIndeterminateIcon, typeof state !== 'boolean');
    };
    CheckboxSelectionComponent.prototype.onCheckedClicked = function () {
        this.rowNode.setSelected(false);
    };
    CheckboxSelectionComponent.prototype.onUncheckedClicked = function (event) {
        this.rowNode.setSelectedParams({ newValue: true, rangeSelect: event.shiftKey });
    };
    CheckboxSelectionComponent.prototype.onIndeterminateClicked = function (event) {
        this.rowNode.setSelectedParams({ newValue: true, rangeSelect: event.shiftKey });
    };
    CheckboxSelectionComponent.prototype.init = function (params) {
        this.createAndAddIcons();
        this.rowNode = params.rowNode;
        this.onSelectionChanged();
        // we don't want the row clicked event to fire when selecting the checkbox, otherwise the row
        // would possibly get selected twice
        this.addGuiEventListener('click', function (event) { return event.stopPropagation(); });
        // likewise we don't want double click on this icon to open a group
        this.addGuiEventListener('dblclick', function (event) { return event.stopPropagation(); });
        this.addDestroyableEventListener(this.eCheckedIcon, 'click', this.onCheckedClicked.bind(this));
        this.addDestroyableEventListener(this.eUncheckedIcon, 'click', this.onUncheckedClicked.bind(this));
        this.addDestroyableEventListener(this.eIndeterminateIcon, 'click', this.onIndeterminateClicked.bind(this));
        this.addDestroyableEventListener(this.rowNode, rowNode_1.RowNode.EVENT_ROW_SELECTED, this.onSelectionChanged.bind(this));
    };
    __decorate([
        context_1.Autowired('gridOptionsWrapper')
    ], CheckboxSelectionComponent.prototype, "gridOptionsWrapper");
    return CheckboxSelectionComponent;
}(component_1.Component));
exports.CheckboxSelectionComponent = CheckboxSelectionComponent;
//# sourceMappingURL=checkboxSelectionComponent.js.map