'use strict';
import { Component, Input, OnInit, OnChanges, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: '[e-list-box]',
    templateUrl: './e-list-box.html'
})
export class eListBoxControl implements OnInit{
    public apiList: Array<Object> = [];

    constructor() {}
    ngOnInit() {
        this.apiList = [
            {"id": 19, "method": "Post", "name": "api3"},
            {"id": 35, "method": "Get", "name": "asdasd"},
            {
                "id": 36,
                "method": "Get",
                "name": "sfd"
            },
            {"id": 37, "method": "Get", "name": "asda"},
            {"id": 38, "method": "Get", "name": "new"},
            {
                "id": 39,
                "method": "Delete",
                "name": "ass"
            },
            {"id": 40, "method": "Get", "name": "hammad-1"},
            {"id": 41, "method": "Get", "name": "new-api"}, {
                "id": 42,
                "method": "Get",
                "name": "sandu-1"
            }, {"id": 43, "method": "Get", "name": "sandu-2"}, {"id": 44, "method": "Post", "name": "sandu-3"}, {
                "id": 45,
                "method": "Get",
                "name": "mayank-1"
            }];
    }
}