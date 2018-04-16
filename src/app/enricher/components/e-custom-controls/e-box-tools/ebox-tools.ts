'use strict';
import {Component, Input, OnInit, ElementRef, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import { ePopupComponent } from '../e-popup/epopup';
import {ModalPopupService} from "../../../util/modal-popup.service";

@Component({
    selector: '[e-box-tools]',
    templateUrl: './ebox-tools.html',
    encapsulation: ViewEncapsulation.None
})
export class eBoxToolsControl implements OnInit {
    @Input() eOptions:any;
    @Input() isCreatorView:boolean = false;
    @Output() update : EventEmitter<any>= new EventEmitter<any>();

    constructor(private elt: ElementRef,
                private modalPopupService: ModalPopupService) {
    }

    ngOnInit(): void {}

    showhide(){
        let currentElem = this.elt.nativeElement;
        let nextSibling = currentElem.parentElement.lastElementChild;
        nextSibling.style.display = (nextSibling.style.display==="none")?"block":"none";
    }
    // Function for close ibox
    closebox() {
        let currentElem = this.elt.nativeElement;
        let nextSibling = currentElem.parentElement.lastElementChild;
        setTimeout(()=>{
            nextSibling.remove();
            currentElem.remove();
        }, 0)
    }

    openModal(){
        if(this.eOptions) {
            let _model = {
                eOptions: this.eOptions,
                isCreatorView : false,
                type: this.eOptions.type,
                ok: (data:any) => {
                    this.update.emit(data.eOptions);
                    console.log('check eBox tool' + JSON.stringify(data));
                }
            };
            this.showPopup(_model);
        }
    }

    closeModal(){
        let _model = {
            type:'e-delete',
            text:'Are you sure you wanna Delete this..?',
            ok: (data:any) => {
                console.log(data);
                alert('check eBox tool');
            }
        };
        this.showPopup(_model);
    }

    showPopup(options:any){
        let modal$ = this.modalPopupService.create(ePopupComponent, options);
        modal$.subscribe((ref) => {})
    }
}
