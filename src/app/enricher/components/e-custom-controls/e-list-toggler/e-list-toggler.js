'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var eListTogglerControl = (function () {
    function eListTogglerControl(elistTogglerService) {
        var _this = this;
        this.elistTogglerService = elistTogglerService;
        this.data = [];
        this.callback = function (_type, data) {
            _this.elistTogglerService.callback.emit({ changeType: _type, data: data });
        };
    }
    eListTogglerControl.prototype.ngOnInit = function () {
        if (!this.data)
            return;
    };
    eListTogglerControl.prototype.ngOnChanges = function (changes) {
        if (!this.data)
            return;
    };
    eListTogglerControl.prototype.scrollElem = function (index, dataItem) {
        dataItem.height = (dataItem.height > 0) ? 0 : (dataItem.children.length * 44);
        dataItem["class"] = (dataItem.height > 0) ? "fa fa-chevron-down" : "fa fa-chevron-right";
    };
    __decorate([
        core_1.Input()
    ], eListTogglerControl.prototype, "data");
    eListTogglerControl = __decorate([
        core_1.Component({
            selector: 'e-list-toggler',
            templateUrl: './e-list-toggler.html',
            styleUrls: ['./e-list-toggler.css'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], eListTogglerControl);
    return eListTogglerControl;
}());
exports.eListTogglerControl = eListTogglerControl;
//# sourceMappingURL=e-list-toggler.js.map