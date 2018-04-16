'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var e_view_extender_1 = require("./e-view-extender");
var e_grid_1 = require("./e-grid/e-grid");
var e_tab_1 = require("./e-view-extender/e-tab/e-tab");
var ebox_tools_1 = require("./e-box-tools/ebox-tools");
var e_list_box_1 = require("./e-list-box/e-list-box");
var e_dynamic_form_1 = require("./e-dynamic-form/e-dynamic-form");
var e_list_toggler_1 = require("./e-list-toggler/e-list-toggler");
var e_box_wrapper_1 = require("./e-box-wrapper/e-box-wrapper");
var e_color_1 = require("./e-color/e-color");
var e_timeline_1 = require("./e-timeline/e-timeline");
var e_product_1 = require("./e-product/e-product");
function customComponentFactory(options) {
    var mapComp = {
        'row': e_view_extender_1.eBootstrapControl,
        'e-box': e_view_extender_1.eBoxControl,
        'e-panel': e_view_extender_1.ePanelControl,
        'e-grid': e_grid_1.eGridControl,
        'e-tab': e_tab_1.eTabControl,
        'e-dynamic-form': e_dynamic_form_1.eDynamicFormControl,
        'e-list-box': e_list_box_1.eListBoxControl,
        'e-list-toggler': e_list_toggler_1.eListTogglerControl,
        'e-box-wrapper': e_box_wrapper_1.eBoxWrapperControl,
        'e-color': e_color_1.eColorControl,
        'e-timeline': e_timeline_1.eTimelineControl,
        'e-product': e_product_1.eProductControl,
        'e-colors': e_color_1.eColorControl
    };
    return mapComp[options.cType];
}
exports.customComponentFactory = customComponentFactory;
var DefaultControl = (function () {
    function DefaultControl() {
    }
    DefaultControl.prototype.ngOnInit = function () {
    };
    DefaultControl = __decorate([
        core_1.Component({
            selector: 'default-control',
            template: "<div class=\"ibox\"><div class=\"ibox-content\"> Nothing requested..</div></div>",
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], DefaultControl);
    return DefaultControl;
}());
exports.DefaultControl = DefaultControl;
exports.CUSTOM_CONTROLS_COMPONENTS = [
    e_view_extender_1.eBoxControl,
    e_view_extender_1.ePanelControl,
    e_view_extender_1.eBootstrapControl,
    e_grid_1.eGridControl,
    e_tab_1.eTabControl,
    ebox_tools_1.eBoxToolsControl,
    e_list_box_1.eListBoxControl,
    e_dynamic_form_1.eDynamicFormControl,
    e_list_toggler_1.eListTogglerControl,
    e_box_wrapper_1.eBoxWrapperControl,
    e_color_1.eColorControl,
    e_timeline_1.eTimelineControl,
    e_product_1.eProductControl,
    DefaultControl
];
//# sourceMappingURL=index.js.map
