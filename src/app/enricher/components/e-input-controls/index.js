'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var e_button_1 = require("./e-button/e-button");
var e_calendar_1 = require("./e-calendar/e-calendar");
var e_checkbox_1 = require("./e-checkbox/e-checkbox");
var e_radio_1 = require("./e-radio/e-radio");
var e_textarea_1 = require("./e-textarea/e-textarea");
var e_text_1 = require("./e-text/e-text");
var e_dropdown_1 = require("./e-dropdown/e-dropdown");
function inputComponentFactory(options) {
    var mapComp = {
        'button': e_button_1.eButton,
        'calendar': e_calendar_1.eCalendar,
        'radio': e_radio_1.eRadio,
        'checkbox': e_checkbox_1.eCheckbox,
        'dropdown': e_dropdown_1.eDropdown,
        'text': e_text_1.eText,
        'textarea': e_textarea_1.eTextarea,
        'editor': null
    };
    return mapComp[options.cType];
}
exports.inputComponentFactory = inputComponentFactory;
var eNoInputControl = (function () {
    function eNoInputControl() {
    }
    eNoInputControl = __decorate([
        core_1.Component({
            template: '<div>No Input Control Found</div>',
            encapsulation: core_1.ViewEncapsulation.Native
        })
    ], eNoInputControl);
    return eNoInputControl;
}());
exports.eNoInputControl = eNoInputControl;
exports.INPUT_CONTROLS_COMPONENTS = [eNoInputControl, e_dropdown_1.eDropdown, e_text_1.eText, e_textarea_1.eTextarea, e_checkbox_1.eCheckbox, e_radio_1.eRadio, e_button_1.eButton, e_calendar_1.eCalendar];
//# sourceMappingURL=index.js.map