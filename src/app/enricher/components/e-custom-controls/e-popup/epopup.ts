import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {InputControlService} from "../../../services/input-control.service";
import {ModalPopup} from "../../../util/modal-popup.service";

@Component({
    templateUrl: './popup.html'
})
@ModalPopup()
export class ePopupComponent implements OnInit {
    data: any;
    info: any;
    infoData: any;
    @Input() eOptions: any;
    @Input() isCreatorView = false;

    ok: Function;
    destroy: Function;
    closeModal: Function;

    constructor(private icService: InputControlService) {}

    ngOnInit() {
        this.infoData = Object.assign({}, this.eOptions);
        this.tabSwitch('Data');
        //this.data = this.icService.getQuestions(this.eOptions);
    }

    tabSwitch(option: string) {
        let _data = null;
        if ('Options' === option) {
            _data = this.infoData['action']['xhr'];
        } else {
            _data = this.infoData;
        }
        this.info = _data;
        this.data = this.icService.getControlByActiveTab(option, this.eOptions);
    }

    onCancel(): void {
        this.closeModal();
        this.destroy();
    }

    onOk(): void {
        this.closeModal();
        this.destroy();
        this.ok({
            eOptions: this.infoData,
            isCreatorView: this.isCreatorView,
            type: this.eOptions.type
        });
    }
}
