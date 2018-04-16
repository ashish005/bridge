import {
    NgModule, Component, Input, OnInit, ViewChild, ViewContainerRef, OnChanges, ChangeDetectionStrategy,
    ElementRef
} from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'e-dynamic-form',
    templateUrl: './e-dynamic-form.html',
    /*providers: [InputFormControlService],*/
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class eDynamicFormControl implements OnInit, OnChanges {
    @ViewChild('elementRef', {read: ViewContainerRef}) viewContainerRef: any;
    @Input() control: any;
    @Input() isCreatorView = false;
    form: FormGroup;
    formData: Array<any> = [];
    payLoad = '';

    /*constructor(private ifcService: InputFormControlService,
                private _config: Configuration) {}*/

    ngOnInit() {
      debugger
        let ObjType = Object.prototype.toString.call(this.control);
        let _model: any = (ObjType !== '[object Object]') ? this.control[0] : this.control;
        this.formData = _model['children'];
        //this.form = this.ifcService.toFormGroup(this.formData);

        //this._config.updateViewId(this.viewContainerRef.element.nativeElement, this.eOptions);
    }

    ngOnChanges() {
    }

    onSubmit() {
        console.log('panal Id : ' + this.control['id']);
        this.viewContainerRef.element.nativeElement['id'] = this.control['id'];

        this.payLoad = JSON.stringify(this.form.value);
    }
}
