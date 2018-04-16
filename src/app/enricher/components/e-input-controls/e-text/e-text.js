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
var eText = (function (_super) {
    __extends(eText, _super);
    function eText(ifcService) {
        var _this = _super.call(this) || this;
        _this.ifcService = ifcService;
        return _this;
    }
    eText.prototype.ngOnInit = function () {
        this.getProps();
        this.createNewControl();
    };
    eText.prototype.createNewControl = function () {
        if (!this.form.controls[this.key]) {
            this.form = this.ifcService.updateFormGroup();
        }
    };
    eText.prototype.ngOnChanges = function () {
    };
    Object.defineProperty(eText.prototype, "isValid", {
        get: function () {
            /*if(!this.form.controls[this.key]){
                this.form = this.ifcService.updateFormGroup();
                return;
            }*/
            if (this.form && this.form.controls && this.form.controls[this.key]) {
                return this.form.controls[this.key].valid;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ;
    eText.prototype.getProps = function () {
        var _data = new control_model_1.TextModel(this.eOptions['data']); // <TextModel>(this.eOptions['data']|| {});
        var _self = this;
        Object.keys(_data).forEach(function (item, i) {
            _self[item] = _data[item];
        });
    };
    __decorate([
        core_1.Input()
    ], eText.prototype, "eOptions");
    __decorate([
        core_1.Input()
    ], eText.prototype, "form");
    eText = __decorate([
        core_1.Component({
            selector: 'e-text',
            styleUrls: ['./e-text.css'],
            templateUrl: './e-text.html',
            encapsulation: core_1.ViewEncapsulation.Native
        })
    ], eText);
    return eText;
}(control_model_1.TextModel));
exports.eText = eText;
//# sourceMappingURL=e-text.js.map