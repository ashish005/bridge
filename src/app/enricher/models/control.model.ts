import {ActionOperations} from './toolkit-option.model';

export interface IHtmlControls {
    id: string;
    type: string;
    value: string;
    key: string;
    label?: string;
    required: boolean;
    order: number;
    placeholder?: string;
    class?: string;
    helpText?: string;
}

export class InputBase<T> {
    id?: string;
    type: string;
    value?: string;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    placeholder?: string;
    helpText?: string;
    class?: string;
    constructor(options: IHtmlControls = {} as IHtmlControls) {
        this.type = 'input';
        this.id = options.id || '' + new Date().valueOf() + Math.random().toString(16).slice(2);
        this.value = options.value || '';
        this.key = options.key || '';
        this.label = options.label || 'Nothing';
        this.required = options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.placeholder = options.placeholder || '';
        this.class = options.class || '';
        this.helpText = options.helpText || '';
    }
}

export class TextModel extends InputBase<string> {
    cType = 'text';
    action?: any;

    constructor(options: any = {}) {
        super(options);
        this.action = new ActionOperations(options['action']);
    }
}

export class TextAreaModel extends InputBase<string> {
    cType = 'textarea';
    length?: any = {
        min: 0,
        max: 50
    };
    rows?: number;
    action?: any;

    constructor(options: any = {}) {
        super(options);
        this.rows = 3;
        this.action = new ActionOperations(options['action']);
    }
}

export class ButtonModel extends InputBase<string> {
    cType = 'button';
    action?: any;

    constructor(options: any = {}) {
        super(options);
        this.action = new ActionOperations(options['action']);
    }
}
export class CheckBoxModel extends InputBase<string> {
    cType = 'checkbox';
    options: { key: string, value: string }[] = [];
    action?: any;

    constructor(options: any = {}) {
        super(options);
        this.options = options['options'] || [];
        this.action = new ActionOperations(options['action']);
    }
}
export class RadioModel extends InputBase<string> {
    cType = 'radio';
    options: { key: string, value: string }[] = [];
    action?: any;

    constructor(options: any = {}) {
        super(options);
        this.options = options['options'] || [];
        this.action = new ActionOperations(options['action']);
    }
}

export class DropdownModel extends InputBase<string> {
    cType = 'dropdown';
    options: { key: string, value: string }[] = [];
    action?: any;

    constructor(options: any = {}) {
        super(options);
        this.options = options['options'] || [];
        this.action = new ActionOperations(options['action']);
    }
}

export class CalendarModel extends InputBase<string> {
    cType = 'calendar';
    action?: any;

    constructor(options: any = {}) {
        super(options);
        this.action = new ActionOperations(options['action']);
    }
}

export class FileModel extends InputBase<string> {
    cType = 'file';
    multiple: boolean;
    action?: any;

    constructor(options: any = {}) {
        super(options);
        this.multiple = false;
        this.action = new ActionOperations(options['action']);
    }
}
