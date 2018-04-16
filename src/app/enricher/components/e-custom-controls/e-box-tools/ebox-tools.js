'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var popup_options_1 = require("../e-popup/epopup");
var index_1 = require("../../../../dynamic-views/index");
var eBoxToolsControl = (function () {
    function eBoxToolsControl(elt, modalPopupService, icService) {
        this.elt = elt;
        this.modalPopupService = modalPopupService;
        this.icService = icService;
        this.isCreatorView = false;
    }
    eBoxToolsControl.prototype.ngOnInit = function () {
    };
    eBoxToolsControl.prototype.showhide = function () {
        var currentElem = this.elt.nativeElement;
        var nextSibling = currentElem.parentElement.lastElementChild;
        nextSibling.style.display = (nextSibling.style.display === "none") ? "block" : "none";
    };
    // Function for close ibox
    eBoxToolsControl.prototype.closebox = function () {
        var elem = this.elt.nativeElement;
        var ibox = elem.closest('div.ibox');
        ibox.remove();
    };
    eBoxToolsControl.prototype.openModal = function () {
        /*let model = this.renderItem;
         let configs = model.ref().comp.prototype.getConfigs(model.cType);*/
        /*let configs = model.ref().comp.prototype.getConfigs(model.cType);*/
        if (this.eOptions) {
            var _model = {
                tabs: ['Data', 'Events', 'Options'],
                questions: this.icService.getQuestions(this.eOptions),
                data: this.eOptions,
                configs: this.eOptions,
                isCreatorView: this.isCreatorView,
                /*data: model,
                 configs: configs,
                 keys:Object.keys(configs),*/
                type: this.eOptions.type,
                ok: function (data) {
                    console.log(data);
                    alert('check eBox tool');
                }
            };
            this.showPopup(_model);
        }
    };
    eBoxToolsControl.prototype.closeModal = function () {
        var _model = {
            type: 'e-delete',
            text: 'Are you sure you wanna Delete this..?',
            ok: function (data) {
                console.log(data);
                alert('check eBox tool');
            }
        };
        this.showPopup(_model);
    };
    eBoxToolsControl.prototype.showPopup = function (options) {
        var modal$ = this.modalPopupService.create(index_1.DynamicModule, popup_options_1.PopupComponent, options);
        modal$.subscribe(function (ref) { });
    };
    __decorate([
        core_1.Input()
    ], eBoxToolsControl.prototype, "eOptions");
    __decorate([
        core_1.Input()
    ], eBoxToolsControl.prototype, "isCreatorView");
    eBoxToolsControl = __decorate([
        core_1.Component({
            selector: 'ebox-tools',
            templateUrl: './ebox-tools.html',
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], eBoxToolsControl);
    return eBoxToolsControl;
}());
exports.eBoxToolsControl = eBoxToolsControl;
//# sourceMappingURL=e-box-tools.js.map
