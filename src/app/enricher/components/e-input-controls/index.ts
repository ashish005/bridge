'use strict';
import { Component, Injectable, ViewEncapsulation } from '@angular/core';
import { eButton } from './e-button/e-button';
import { eCalendar } from './e-calendar/e-calendar';
import { eCheckbox } from './e-checkbox/e-checkbox';
import { eRadio } from './e-radio/e-radio';
import { eTextarea } from './e-textarea/e-textarea';
import { eText } from './e-text/e-text';
import { eDropdown } from './e-dropdown/e-dropdown';
import {eFile} from './e-file/e-file';

@Component({
    template: '<div>No Input Control Found</div>',
    encapsulation: ViewEncapsulation.Native
})
export class eNoInputControl {
    constructor(){}
}


export function inputComponentFactory(options:any){
    let mapComp : any = {
        'button': eButton,
        'calendar': eCalendar,
        'radio': eRadio,
        'checkbox': eCheckbox,
        'dropdown': eDropdown,
        'text': eText,
        'textarea': eTextarea,
        'file': eFile,
        'editor': null
    };
    return mapComp[options.cType];
}

export const INPUT_CONTROLS_COMPONENTS = [ eNoInputControl, eDropdown, eText, eTextarea, eCheckbox, eRadio, eButton, eCalendar, eFile];
