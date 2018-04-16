import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'default-control',
    template: `<div class="ibox"><div class="ibox-content"> Nothing requested..</div></div>`,
    encapsulation: ViewEncapsulation.None
})
export class eDefaultControl {
    constructor() {}
}
