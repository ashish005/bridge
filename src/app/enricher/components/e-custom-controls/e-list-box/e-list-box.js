'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var eListBoxControl = (function () {
    function eListBoxControl() {
        this.apiList = [];
    }
    eListBoxControl.prototype.ngOnInit = function () {
        this.apiList = [
            { "id": 19, "method": "Post", "name": "api3" },
            { "id": 35, "method": "Get", "name": "asdasd" },
            {
                "id": 36,
                "method": "Get",
                "name": "sfd"
            },
            { "id": 37, "method": "Get", "name": "asda" },
            { "id": 38, "method": "Get", "name": "new" },
            {
                "id": 39,
                "method": "Delete",
                "name": "ass"
            },
            { "id": 40, "method": "Get", "name": "hammad-1" },
            { "id": 41, "method": "Get", "name": "new-api" }, {
                "id": 42,
                "method": "Get",
                "name": "sandu-1"
            }, { "id": 43, "method": "Get", "name": "sandu-2" }, { "id": 44, "method": "Post", "name": "sandu-3" }, {
                "id": 45,
                "method": "Get",
                "name": "mayank-1"
            }
        ];
    };
    eListBoxControl = __decorate([
        core_1.Component({
            selector: '[e-list-box]',
            templateUrl: './e-list-box.html'
        })
    ], eListBoxControl);
    return eListBoxControl;
}());
exports.eListBoxControl = eListBoxControl;
//# sourceMappingURL=e-list-box.js.map