import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
/*import 'brace/theme/monokai';
import 'brace/mode/javascript';
import 'brace/mode/sql';*/
/*var ace = require('brace');
require('brace/mode/javascript');
require('brace/mode/javascript');
require('brace/theme/monokai');*/
//import 'brace/index';

/*@Component({
    template: `
        <ace-editor
             [text]="text"
             [mode]="'javascript'"
             [theme]="'clouds'"
             [options]="options"
             [readOnly]="false"
             [autoUpdateContent]="true"
        (textChanged)="onChange($event)"
        style="min-height: 300px; width:100%; overflow: auto;"></ace-editor>
    `
})*/
@Component({
  template: `<div>editor</div>`
   /* template: `<div ace-editor [(text)]="text" #editor
                    [options]="options"
                    [mode]="'javascript'"
                    [readOnly]="false"
                    [autoUpdateContent]="true"
                    [durationBeforeCallback]="1000"
                    (textChanged)="onChange($event)"
                    style="min-height: 200px; width:100%; overflow: auto;"></div>`*/
})
export class ECodeEditorComponent implements OnInit {
    options: any = { maxLines: 1000, printMargin: false };
    text = '';
    @ViewChild('editor') private editor: any;

    constructor() {}

    ngOnInit() {}

    onChange(code: any) {
        console.log('new code', JSON.stringify(code));
    }
}
