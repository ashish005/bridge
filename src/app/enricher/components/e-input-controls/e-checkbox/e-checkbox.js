'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var eCheckbox = (function () {
    function eCheckbox() {
    }
    eCheckbox.prototype.ngOnInit = function () { };
    eCheckbox.prototype.ngOnChanges = function () { };
    __decorate([
        core_1.Input()
    ], eCheckbox.prototype, "options");
    eCheckbox = __decorate([
        core_1.Component({
            selector: '[e-checkbox]',
            styleUrls: ['./e-checkbox.css'],
            templateUrl: './e-checkbox.html',
            encapsulation: core_1.ViewEncapsulation.Native
        })
    ], eCheckbox);
    return eCheckbox;
}());
exports.eCheckbox = eCheckbox;
//# sourceMappingURL=e-checkbox.js.map