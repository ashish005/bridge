export class ToolkitMenuOptionsModel {
    name: string;
    class: string;
    iconClass: string;
    type: string;
    action?: ActionOperations;
    constructor(model: {
        name?: string,
        class?: string,
        iconClass?: string,
        type?: string,
        action?: any
    } = {}) {
        this.name = model.name;
        this.class = model.class;
        this.iconClass = model.iconClass;
        this.type = model.type;
        this.action = new ActionOperations(model['action']);
    }
}

export class XhrModel {
    host: string;
    url: string;
    method: string;
    data: any;
    modelMapping: any;

    constructor(item: {
        host?: string,
        url?: string,
        method?: string,
        data?: any,
        modelMapping?: any
    } = {}) {
        this.host = item.host;
        this.url = item.url;
        this.method = item.method;
        this.data = item.data;
        this.modelMapping = item.modelMapping;
    }
}

export interface IEvent {
    init?: string,
    click?: string,
    mouseover?: string,
    mouseout?: string,
    change?: string
};

export interface IOperations extends IEvent {
    xhr?: XhrModel,
    data?: any,
    exec?: Function;
    events?: Array<string>;
};

export class EventsToPerformOperation {
    init?: string;
    click: string;
    mouseover: string;
    mouseout: string;
    change: string;
    constructor(item: IEvent = {} as IEvent) {
        this.init = item.init || '';
        this.click = item.click || '';
        this.mouseover = item.mouseover || '';
        this.mouseout = item.mouseout || '';
        this.change = item.change || '';
    }
}

export class ActionOperations extends EventsToPerformOperation {
    xhr: XhrModel;
    exec: Function;
    data: any;
    events: Array<string>;
    constructor(item: IOperations = {} as IOperations) {
        super(item);
        this.events = ['click'];
        this.xhr = new XhrModel(item['xhr']);
        this.data = item.data || null;
        this.exec = item.exec;
    }
}
export interface IControlOperations {
    isDraggable?: boolean,
    isEditable?: boolean,
    canBeDeleted?: boolean,
    canBeApplied?: boolean,
    canClone?: boolean
}

export interface IToolkitControlModel extends IControlOperations{
    template?: string;
    id?: string;
    controlId?: string;
    name: string;
    type: string;
    cType: string;
    getDataFrom: string;
    children?: Array<IToolkitControlModel>;
    ref?: any;
    parentRef: string;
    data?: any;
    action: ActionOperations;
}

export class ToolkitControlModel {
    template?: string;
    id?: string;
    controlId?: string;
    name: string;
    type: string;
    cType: string;
    value: string;
    label?: string;
    class?: string;
    getDataFrom: string;
    children?: Array<any>;
    ref?: any;
    parentRef: string;
    data?: any;
    isDraggable: boolean;
    isEditable: boolean;
    canBeDeleted: boolean;
    canBeApplied: boolean;
    canClone: boolean;
    action: ActionOperations;

    constructor(data: {
        template?: string,
        id?: string,
        controlId?: string,
        name?: string,
        type?: string,
        cType?: string,
        value?: string;
        label?: string;
        class?: string;
        getDataFrom?: string,
        children?: Array<any>,
        ref?: any,
        parentRef?: string,
        data?: any,
        isDraggable?: boolean,
        isEditable?: boolean,
        canBeDeleted?: boolean,
        canBeApplied?: boolean,
        canClone?: boolean,
        action?: ActionOperations
    } = {}) {
        this.id = data.id || '' + new Date().valueOf() + Math.random().toString(16).slice(2);
        this.controlId = data.controlId;
        this.name = data.name;
        this.type = data.type;
        this.cType = data.cType;
        this.value = data.value;
        this.label = data.label;
        this.class = data.class;
        this.children = data.children;
        this.isDraggable = (data.isDraggable);
        this.ref = (data.ref);
        this.parentRef = data.parentRef;
        this.data = data.data;
        this.isEditable = data.isEditable || false;
        this.canBeDeleted = data.canBeDeleted || false;
        this.canBeApplied = data.canBeApplied || false;
        this.canClone = data.canClone || false;
        this.getDataFrom = data.getDataFrom;
        this.action = new ActionOperations(data['action']);
    }
}

export interface IControl extends IControlOperations {
    id?: string,
    name?: string,
    type: string;
    cType?: string,
    controlId?: string,
    style?: string;
    class?: string;
    label?: string;
    parentRef?: string,
    getDataFrom?: boolean,
    children?: Array<any>;
    action?: ActionOperations;
}

export class ControlsOperations {
    private isDraggable?: boolean;
    private isEditable?: boolean;
    private canBeDeleted?: boolean;
    private canBeApplied?: boolean;
    private canClone?: boolean;

    constructor(data: IControlOperations = {} as IControlOperations) {
        this.isDraggable = data.isDraggable || false;
        this.isEditable = data.isEditable || false;
        this.canBeDeleted = data.canBeDeleted || false;
        this.canBeApplied = data.canBeApplied || false;
        this.canClone = data.canClone || false;
    }
}

export class ControlWrapper extends ControlsOperations {
    id?: string;
    name: string;
    type: string;
    cType: string;
    controlId?: string;
    label?: string;
    style?: string;
    class?: string;
    parentRef: string;
    children?: Array<any>;
    getDataFromServer: boolean;
    constructor(data: IControl = {} as IControl) {
        super(data);
        this.id = data.id || null;
        this.name = data.name || '';
        this.type = data.type || '';
        this.controlId = data.controlId;
        this.cType = data.cType;
        this.style = data.style;
        this.class = data.class;
        this.label = data.label;
        this.children = data.children || null;
        this.parentRef = data.parentRef;
        this.getDataFromServer = data.getDataFrom || false;
    }
    generateId() {
        this.id = new Date().valueOf() + Math.random().toString(16).slice(2);
    }
    clearId() {
        this.id = null;
    }
}

export class InputControlWrapper extends ControlWrapper {
    ref?: any;
    action?: ActionOperations;
    dropZones?: Array<string> = ['dynamicForm'];
    constructor(data: any = {}) {
        super(data);
        this.id = null;
        this.type = 'input';
        this.ref = data['custom'];
        this.action = new ActionOperations(data['action']);
    }
}

export class CustomControlWrapper extends ControlWrapper {
    ref?: any;
    action?: ActionOperations;
    dropZones?: Array<string> = [];
    constructor(data: any = {}) {
        super(data);
        this.id = null;
        this.type = 'custom';
        this.ref = data['custom'];
        this.action = new ActionOperations(data['action']);
    }
}

export class ChartControlWrapper extends ControlWrapper {
    ref?: any;
    action?: ActionOperations;
    dropZones?: Array<string> = [];
    constructor(data: any = {}) {
        super(data);
        this.id = null;
        this.type = 'charts';
        this.ref = data['charts'];
        this.action = new ActionOperations(data['action']);
    }
}

export class DBControlWrapper extends ControlWrapper {
    action?: ActionOperations;
    constructor(data: any = {}) {
        super(data);
        this.id = null;
        this.type = 'db';
        this.action = new ActionOperations(data['action']);
        this.getDataFromServer = true;
    }
}

export class PagesControlWrapper extends ControlWrapper {
    action?: ActionOperations;
    constructor(data: any = {}) {
        super(data);
        this.id = null;
        this.type = 'pages';
        this.action = new ActionOperations(data['action']);
        this.getDataFromServer = true;
    }
}

export class ComponentsControlWrapper extends ControlWrapper {
    action?: ActionOperations;
    constructor(data: any = {}) {
        super(data);
        this.id = null;
        this.type = 'components';
        this.action = new ActionOperations(data['action']);
        this.getDataFromServer = true;
    }
}
