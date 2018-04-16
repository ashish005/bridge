'use strict';
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
var core_1 = require("@angular/core");
var control_model_1 = require("../../../models/control.model");
var eDropdown = (function (_super) {
    __extends(eDropdown, _super);
    function eDropdown(ifcService) {
        var _this = _super.call(this) || this;
        _this.ifcService = ifcService;
        return _this;
    }
    eDropdown.prototype.ngOnInit = function () {
        this.getProps();
        this.createNewControl();
    };
    eDropdown.prototype.createNewControl = function () {
        if (!this.form.controls[this.key]) {
            this.form = this.ifcService.updateFormGroup();
        }
    };
    eDropdown.prototype.ngOnChanges = function () {
    };
    Object.defineProperty(eDropdown.prototype, "isValid", {
        get: function () {
            if (this.form && this.form.controls && this.form.controls[this.key]) {
                return this.form.controls[this.key].valid;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ;
    eDropdown.prototype.getProps = function () {
        var _data = new control_model_1.DropdownModel(this.eOptions['data']); // <DropdownModel>(this.eOptions['data']|| {});
        var _self = this;
        Object.keys(_data).forEach(function (item, i) {
            _self[item] = _data[item];
        });
    };
    __decorate([
        core_1.Input()
    ], eDropdown.prototype, "eOptions");
    __decorate([
        core_1.Input()
    ], eDropdown.prototype, "form");
    eDropdown = __decorate([
        core_1.Component({
            selector: 'e-dropdown',
            styleUrls: ['./e-dropdown.css'],
            templateUrl: './e-dropdown.html',
            encapsulation: core_1.ViewEncapsulation.Native
        })
    ], eDropdown);
    return eDropdown;
}(control_model_1.DropdownModel));
exports.eDropdown = eDropdown;
//# sourceMappingURL=e-dropdown.js.map