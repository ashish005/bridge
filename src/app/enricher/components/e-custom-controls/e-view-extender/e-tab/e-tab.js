'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var toolkit_option_model_1 = require("../../../../../models/toolkit-option.model");
var eTabControl = (function () {
    function eTabControl(cdr, toolkitModelGenerator) {
        this.cdr = cdr;
        this.toolkitModelGenerator = toolkitModelGenerator;
        this.isCreatorView = false;
        this._temp = [1, 2];
        this.tabs = [];
        this.activeIndex = 0;
    }
    eTabControl.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Box Id : ' + this.eOptions['id']);
        this.viewContainerRef.element.nativeElement['id'] = this.parentId = this.eOptions['id'];
        setTimeout(function () { _this.initialize(); }, 0);
    };
    eTabControl.prototype.initialize = function () {
        var _this = this;
        if (!this.eOptions['children']) {
            this.eOptions['children'] = [];
            this._temp.forEach(function (item, index) {
                var _data = { index: index, name: "Tab " + item, canClone: true, isDraggable: true, isEditable: true, canBeDeleted: false, canBeApplied: false };
                _this.tabs.push(_data);
                _data.parentRef = _this.parentId;
                _data['children'] = (0 === index) ? [] : [];
                //this.eOptions['children'].push(_tabItem);
                _this.toolkitModelGenerator.setViewOption(_this.parentId, new toolkit_option_model_1.ToolkitControlModel(_data));
            });
        }
        else {
            this.tabs = this.eOptions['children'];
        }
        this.setActiveTab();
    };
    eTabControl.prototype.ngOnChanges = function () {
        if (this.eOptions['children']) {
            debugger;
            this.tabs = this.eOptions['children'];
            this.activeComp = this.tabs[this.activeIndex];
            this.toolkitModelGenerator.setViewOption(this.eOptions.parentRef, this.tabs);
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        }
    };
    eTabControl.prototype.ngOnDestroy = function () { };
    eTabControl.prototype.ngAfterViewInit = function () { };
    eTabControl.prototype.setActiveTab = function () {
        this.activeComp = this.eOptions['children'][this.activeIndex];
        this.activeTabElementRef.element.nativeElement['id'] = this.activeComp['id'];
        this.cdr.markForCheck();
        this.cdr.detectChanges();
    };
    eTabControl.prototype.OpenTabContainer = function (tab, index) {
        this.activeIndex = index;
        this.setActiveTab();
    };
    __decorate([
        core_1.ViewChild("boxElementRef", { read: core_1.ViewContainerRef })
    ], eTabControl.prototype, "viewContainerRef");
    __decorate([
        core_1.ViewChild("activeTabElementRef", { read: core_1.ViewContainerRef })
    ], eTabControl.prototype, "activeTabElementRef");
    __decorate([
        core_1.Input()
    ], eTabControl.prototype, "eOptions");
    __decorate([
        core_1.Input()
    ], eTabControl.prototype, "isCreatorView");
    eTabControl = __decorate([
        core_1.Component({
            selector: 'e-tab',
            templateUrl: './e-tab.html',
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], eTabControl);
    return eTabControl;
}());
exports.eTabControl = eTabControl;
//# sourceMappingURL=e-tab.js.map