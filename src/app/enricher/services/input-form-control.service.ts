import { Injectable } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import {
    ButtonModel,
    CalendarModel,
    CheckBoxModel,
    DropdownModel,
    FileModel,
    InputBase,
    RadioModel,
    TextAreaModel,
    TextModel
} from '../models/control.model';

@Injectable()
export class InputFormControlService {
    _eformGroup: FormGroup;
    group: any = {};
    model: Array<any> = [];
    constructor() {}

    get eformGroup(){
        return this._eformGroup;
    }

    getInputControlByType(cType: string) {
        let ControlType: any = null;
        switch (cType) {
            case 'dropdown': {
                ControlType = DropdownModel;
                break;
            }
            case 'text': {
                ControlType = TextModel;
                break;
            }
            case 'textarea': {
                ControlType = TextAreaModel;
                break;
            }
            case 'button': {
                ControlType = ButtonModel;
                break;
            }
            case 'checkbox': {
                ControlType = CheckBoxModel;
                break;
            }
            case 'radio': {
                ControlType = RadioModel;
                break;
            }
            case 'calendar': {
                ControlType = CalendarModel;
                break;
            }
            case 'file': {
                ControlType = FileModel;
                break;
            }
            default: {
                ControlType = InputBase;
                break;
            }
        };
        return ControlType;
    }

    toFormGroup(questions: Array<any>): FormGroup {
        if (!questions) {
            return this._eformGroup = new FormGroup({});
        };

        questions.forEach((questionInfo: any) => {
            let ControlType: any = this.getInputControlByType(questionInfo.cType);
            let question = new ControlType(questionInfo);
            this.model.push(<any>question);
            this.group[question.id] = question.required ? new FormControl(question.value || '', Validators.required)
                : new FormControl(question.value || '');
            if ('dropdown' === question['cType']
                && question
                && question.options
                && question.options[0]) {
                (<FormControl>this.group[question.id]).setValue(question.options[0], { onlySelf: true });
            }
        });
        this._eformGroup = new FormGroup(this.group);
        return this._eformGroup;
    }

    updateFormGroup(eOptions: any): FormGroup {
        let ControlType: any = this.getInputControlByType(eOptions.cType);
        let question = new ControlType(eOptions);
        this.group[question.id] = question.required ? new FormControl(question.value || '', Validators.required)
            : new FormControl(question.value || '', Validators.required);

        if (!this._eformGroup) {
            this._eformGroup = new FormGroup(this.group);
        }
        this._eformGroup.controls[question.id] = this.group[question.id];

        let index = this.model.findIndex(function (a: any) {
            return (a.id === eOptions.id);
        })
        this.model.splice(index, 1, eOptions);
        return this._eformGroup;
    }

    checkAndUpdateFormGroupById(eOptions: any, form: any, id: string) {
        if (!form.controls[id]) {
            form = this.updateFormGroup(eOptions);
        }
    }

    validateForm(form: any, id: string) {
        if (form && form.controls && form.controls[id]) {
            return form.controls[id].valid;
        }
        return false;
    }

    createModel(formValue: any, eOptions: any) {
        let modelData: any = {};
        this.model.forEach(function (item: any) {
            let id = item['id'];
           if(eOptions.id !== id) {
               modelData[item['key']] = formValue[id];
           }
        });
        return modelData;
    }
}
