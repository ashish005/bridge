'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var eBootstrapControl = (function () {
    function eBootstrapControl(el) {
        this.el = el;
        this.isCreatorView = false;
        this.controlOptions = [];
    }
    eBootstrapControl.prototype.ngOnInit = function () {
        console.log('Bootstrap Id : ' + this.eOptions['id']);
        this.el.nativeElement['id'] = this.eOptions['id'];
    };
    eBootstrapControl.prototype.ngOnChanges = function () {
        this.controlOptions = this.eOptions['children'];
    };
    __decorate([
        core_1.Input()
    ], eBootstrapControl.prototype, "eOptions");
    __decorate([
        core_1.Input()
    ], eBootstrapControl.prototype, "isCreatorView");
    eBootstrapControl = __decorate([
        core_1.Component({
            selector: '[e-bootstrap]',
            template: '<div class="clear" enricher [data]="eOptions?.children" [isCreatorView]="isCreatorView"></div>',
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], eBootstrapControl);
    return eBootstrapControl;
}());
exports.eBootstrapControl = eBootstrapControl;
//# sourceMappingURL=e-bootstrap.js.map
