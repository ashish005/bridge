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
var eButton = (function (_super) {
    __extends(eButton, _super);
    function eButton(elementRef, renderer, ifcService, _enricherService) {
        var _this = _super.call(this) || this;
        _this.ifcService = ifcService;
        _this._enricherService = _enricherService;
        var _self = _this;
        // Listen to click events in the component
        renderer.listen(elementRef.nativeElement, 'click', function (event) {
            // Do something with 'event'
            _enricherService.dataEmitter(_self.form.value);
        });
        return _this;
    }
    eButton.prototype.ngOnInit = function () {
        this.getProps();
        this.createNewControl();
    };
    eButton.prototype.createNewControl = function () {
        if (!this.form.controls[this.key]) {
            this.form = this.ifcService.updateFormGroup();
        }
    };
    eButton.prototype.ngOnChanges = function () {
    };
    eButton.prototype.getProps = function () {
        var _data = new control_model_1.ButtonModel(this.eOptions['data']); // <ButtonModel>(this.eOptions['data']|| {});
        var _self = this;
        Object.keys(_data).forEach(function (item, i) {
            _self[item] = _data[item];
        });
    };
    __decorate([
        core_1.Input()
    ], eButton.prototype, "eOptions");
    __decorate([
        core_1.Input()
    ], eButton.prototype, "form");
    eButton = __decorate([
        core_1.Component({
            selector: '[e-button]',
            styleUrls: ['./e-button.css'],
            templateUrl: './e-button.html',
            encapsulation: core_1.ViewEncapsulation.Native
        })
    ], eButton);
    return eButton;
}(control_model_1.ButtonModel));
exports.eButton = eButton;
//# sourceMappingURL=e-button.js.map