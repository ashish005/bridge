"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var services_1 = require("../../../services");
var eDynamicFormControl = (function () {
    function eDynamicFormControl(ifcService) {
        this.ifcService = ifcService;
        this.isCreatorView = false;
        this.formData = [];
        this.payLoad = '';
    }
    eDynamicFormControl.prototype.ngOnInit = function () {
        var ObjType = Object.prototype.toString.call(this.eOptions);
        var _model = (ObjType !== "[object Object]") ? this.eOptions[0] : this.eOptions;
        this.formData = _model['children'];
        this.form = this.ifcService.toFormGroup(this.formData);
        this.viewContainerRef.element.nativeElement['id'] = this.eOptions['id'];
    };
    eDynamicFormControl.prototype.ngOnChanges = function () {
    };
    eDynamicFormControl.prototype.onSubmit = function () {
        console.log('panal Id : ' + this.eOptions['id']);
        this.viewContainerRef.element.nativeElement['id'] = this.eOptions['id'];
        this.payLoad = JSON.stringify(this.form.value);
    };
    __decorate([
        core_1.ViewChild("elementRef", { read: core_1.ViewContainerRef })
    ], eDynamicFormControl.prototype, "viewContainerRef");
    __decorate([
        core_1.Input()
    ], eDynamicFormControl.prototype, "eOptions");
    __decorate([
        core_1.Input()
    ], eDynamicFormControl.prototype, "isCreatorView");
    eDynamicFormControl = __decorate([
        core_1.Component({
            selector: 'e-dynamic-form',
            templateUrl: './e-dynamic-form.html',
            providers: [services_1.InputFormControlService],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], eDynamicFormControl);
    return eDynamicFormControl;
}());
exports.eDynamicFormControl = eDynamicFormControl;
//# sourceMappingURL=e-dynamic-form.js.map