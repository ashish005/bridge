'use strict';
import { eBoxControl, ePanelControl, eBootstrapControl } from './e-view-extender';
import {eGridControl, EGridDynamicEditPopupComponent, EGridTableDescriptionComponent} from './e-grid/e-grid';
import { eTabControl } from './e-view-extender/e-tab/e-tab';
import { eBoxToolsControl } from './e-box-tools/ebox-tools';
import { eListBoxControl } from './e-list-box/e-list-box';
import { eDynamicFormControl } from './e-dynamic-form/e-dynamic-form';
import { eListTogglerControl } from './e-list-toggler/e-list-toggler';
import {eBoxWrapperControl} from './e-box-wrapper/e-box-wrapper';
import {eColorControl} from './e-color/e-color';
import {eTimelineControl} from './e-timeline/e-timeline';
import {eProductControl} from './e-product/e-product';
import {ECodeEditorComponent} from './e-editor/e-editor';
import {eDefaultControl} from './e-default-control';
import {ePopupComponent} from "./e-popup/epopup";

export function customComponentFactory(options: any) {
    let mapComp: any = {
        'row': eBootstrapControl,
        'e-box': eBoxControl,
        'e-panel': ePanelControl,
        'e-grid': eGridControl,
        'e-tab': eTabControl,
        'e-dynamic-form': eDynamicFormControl,
        'e-list-box': eListBoxControl,
        'e-list-toggler': eListTogglerControl,
        'e-box-wrapper': eBoxWrapperControl,
        'e-color': eColorControl,
        'e-timeline': eTimelineControl,
        'e-product': eProductControl,
        'e-colors': eColorControl,
        'e-default': eDefaultControl,
        'e-code-editor': ECodeEditorComponent,
        'e-popup': ePopupComponent
    };
    return mapComp[options.cType];
}

export const CUSTOM_CONTROLS_COMPONENTS = [
    eBoxControl,
    ePanelControl,
    eBootstrapControl,
    eGridControl,
    eTabControl,
    eBoxToolsControl,
    eListBoxControl,
    eDynamicFormControl,
    eListTogglerControl,
    eBoxWrapperControl,
    eColorControl,
    eTimelineControl,
    eProductControl,
    eDefaultControl,
    ePopupComponent,
    ECodeEditorComponent, EGridDynamicEditPopupComponent, EGridTableDescriptionComponent
];
