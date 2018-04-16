'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var eBoxControl = (function () {
    function eBoxControl(el) {
        this.el = el;
        this.isCreatorView = false;
        this.data = [];
        this.controlOptions = [];
    }
    eBoxControl.prototype.ngOnInit = function () {
        console.log('Box Id : ' + this.eOptions['id']);
        this.viewContainerRef.element.nativeElement['id'] = this.eOptions['id'];
    };
    eBoxControl.prototype.ngOnChanges = function () {
        if (!this.eOptions)
            return;
        this.controlOptions = this.eOptions['children'];
    };
    __decorate([
        core_1.ViewChild("boxElementRef", { read: core_1.ViewContainerRef })
    ], eBoxControl.prototype, "viewContainerRef");
    __decorate([
        core_1.Input()
    ], eBoxControl.prototype, "eOptions");
    __decorate([
        core_1.Input()
    ], eBoxControl.prototype, "isCreatorView");
    eBoxControl = __decorate([
        core_1.Component({
            selector: '[e-box]',
            templateUrl: './e-box.html',
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], eBoxControl);
    return eBoxControl;
}());
exports.eBoxControl = eBoxControl;
//# sourceMappingURL=e-box.js.map