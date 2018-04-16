import {DynamicViewLoader, EDynamicViewComponent, EnricherComponent} from './enricher.component';

//import util services
import {CreateComponentService} from './util/index';

//export util services
export {CreateComponentService} from './util/index';

export const ENRICHER_UTIL_COMPONENTS = [ EnricherComponent, EDynamicViewComponent, DynamicViewLoader];
export const ENRICHER_ENTRY_COMPONENTS = [ EDynamicViewComponent ];

export const ENRICHER_UTIL = [
  CreateComponentService
];
