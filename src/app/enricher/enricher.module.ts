import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ModalPopupModule} from "./util/modal-popup.service";
import {ENRICHER_SERVICES} from "./services/index";
import {ENRICHER_ENTRY_COMPONENTS, ENRICHER_UTIL, ENRICHER_UTIL_COMPONENTS} from "./index";

import {ENRICHER_COMPONENTS } from "./components/index";
import {EnricherComponent} from "./enricher.component";
import {EGridModule} from "./util/index";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ENRICHER_UTIL_COMPONENTS, ENRICHER_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalPopupModule,
    EGridModule
  ],
  entryComponents: [ENRICHER_ENTRY_COMPONENTS, ENRICHER_COMPONENTS],
  exports: [EnricherComponent],
  providers: [
    ENRICHER_UTIL, ENRICHER_SERVICES
  ]
})
export class EnricherModule {
  constructor() {
    console.log('called EnricherModule');
  }
}
