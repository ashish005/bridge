'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ePanelControl = (function () {
    function ePanelControl(el) {
        this.el = el;
        this.isCreatorView = false;
        this.data = [];
        this.controlOptions = [];
    }
    ePanelControl.prototype.ngOnInit = function () {
        console.log('panal Id : ' + this.eOptions['id']);
        this.viewContainerRef.element.nativeElement['id'] = this.eOptions['id'];
    };
    ePanelControl.prototype.ngOnChanges = function () {
        this.controlOptions = this.eOptions['children'];
    };
    __decorate([
        core_1.ViewChild("elementRef", { read: core_1.ViewContainerRef })
    ], ePanelControl.prototype, "viewContainerRef");
    __decorate([
        core_1.Input()
    ], ePanelControl.prototype, "eOptions");
    __decorate([
        core_1.Input()
    ], ePanelControl.prototype, "isCreatorView");
    ePanelControl = __decorate([
        core_1.Component({
            selector: 'e-panel',
            templateUrl: './e-panel.html',
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], ePanelControl);
    return ePanelControl;
}());
exports.ePanelControl = ePanelControl;
//# sourceMappingURL=e-panel.js.map