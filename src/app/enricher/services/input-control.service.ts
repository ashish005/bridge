import { Injectable } from '@angular/core';
import {DropdownModel, TextModel} from '../models/control.model';

const _custom: any = {
    'e-grid': {
        data: [
            {
                'name': 'Tab',
                'type': 'custom',
                'cType': 'e-tab',
                'children': [
                    {
                        'name': 'Data',
                        'children': [
                            {
                                'name': 'e-dynamic-form',
                                'type': 'custom',
                                'cType': 'e-dynamic-form',
                                'children': [
                                    {
                                        'name': '',
                                        'type': 'input',
                                        'cType': 'text',
                                        class: 'col-lg-6',
                                        data: new TextModel({
                                            key: 'lblName',
                                            label: 'Label',
                                            value: '',
                                            placeholder: 'Please provide Label Name',
                                            required: false,
                                            order: 1
                                        }),
                                        'isDraggable': false,
                                        'action': {
                                            'xhr': {}
                                        }
                                    },
                                    {
                                        'name': '',
                                        'type': 'input',
                                        'cType': 'dropdown',
                                        'isDraggable': false,
                                        class: 'col-lg-6',
                                        data: new DropdownModel({
                                            key: 'typeKey',
                                            label: 'Type',
                                            options: [
                                                {key: 'button', value: 'Button'},
                                                {key: 'submit', value: 'Submit'},
                                                {key: 'reset', value: 'Reset'}
                                            ],
                                            order: 2
                                        })
                                    },
                                    {
                                        'name': '',
                                        'type': 'input',
                                        'cType': 'text',
                                        class: 'col-lg-6',
                                        data: new TextModel({
                                            key: 'styleKey',
                                            label: 'Style',
                                            value: '',
                                            placeholder: 'CSS styles',
                                            required: false,
                                            class: '',
                                            order: 3
                                        }),
                                        'isDraggable': false
                                    },
                                    {
                                        'name': '',
                                        'type': 'input',
                                        'cType': 'text',
                                        class: 'col-lg-6',
                                        data: new TextModel({
                                            key: 'classKey',
                                            label: 'Class',
                                            value: '',
                                            placeholder: 'CSS Class Name',
                                            required: false,
                                            class: '',
                                            order: 4
                                        }),
                                        'isDraggable': false
                                    },
                                    {
                                        'name': '',
                                        'type': 'input',
                                        'cType': 'text',
                                        class: 'col-lg-6',
                                        data: new TextModel({
                                            key: 'nameKey',
                                            label: 'Name',
                                            value: '',
                                            placeholder: 'Please Provide Name',
                                            required: false,
                                            class: '',
                                            order: 5
                                        }),
                                        'isDraggable': false
                                    },
                                    {
                                        'name': '',
                                        'type': 'input',
                                        'cType': 'text',
                                        class: 'col-lg-6',
                                        data: new TextModel({
                                            key: 'valueKey',
                                            label: 'Value',
                                            value: '',
                                            placeholder: 'Please Provide Value',
                                            required: false,
                                            class: '',
                                            order: 6
                                        }),
                                        'isDraggable': false
                                    }
                                ],
                                'isDraggable': false,
                                'isEditable': false,
                                'canBeDeleted': false,
                                'canBeApplied': false,
                                'canClone': false,
                                'action': {
                                    'xhr': {}
                                }
                            }
                        ],
                        'isDraggable': false,
                        'isEditable': false,
                        'canBeDeleted': false,
                        'canBeApplied': false,
                        'canClone': false,
                        'action': {
                            'xhr': {}
                        }
                    },
                    {
                        'name': 'Tab 2',
                        'children': [],
                        'isDraggable': false,
                        'isEditable': false,
                        'canBeDeleted': false,
                        'canBeApplied': false,
                        'canClone': false,
                        'action': {
                            'xhr': {}
                        }
                    }
                ],
                'isDraggable': false,
                'parentRef': '',
                'isEditable': false,
                'canBeDeleted': false,
                'canBeApplied': false,
                'canClone': false,
                'action': {
                    'xhr': {}
                }
            }
        ]
    }
};
@Injectable()
export class InputControlService {
    constructor() {}

    getControlByActiveTab(tabType: string, eOptions: any) {
        let _type = eOptions.type, controlType = eOptions.cType;
        let options: any = {
            'Options': [
                {key: 'method', type: 'string', readonly: true},
                {key: 'url', type: 'string', readonly: true},
                {key: 'data', type: 'editor', readonly: true},
                {key: 'modelMapping', type: 'editor', readonly: true}
            ]
        };
        if('Options'===tabType){
            return options[tabType];
        } else {
            let data: Array<any> = null;
            switch (controlType) {
                case 'text': {
                    data = [
                        {key: 'id', type: 'string', readonly: true},
                        {key: 'required', type: 'boolean', readonly: false},
                        {key: 'cType', type: 'string', readonly: true},
                        {key: 'label', type: 'string', readonly: false},
                        {key: 'helpText', type: 'string', readonly: false},
                        {key: 'placeholder', type: 'string', readonly: false},
                        {
                            key: 'type', readonly: false, type: 'dropdown',
                            options: [
                                {key: 'text', value: 'text'},
                                {key: 'number', value: 'number'},
                                {key: 'password', value: 'password'},
                                {key: 'email', value: 'email'},
                                {key: 'color', value: 'color'},
                                {key: 'tel', value: 'tel'}
                            ]
                        },
                        {key: 'style', type: 'string', readonly: false},
                        {key: 'class', type: 'string', readonly: false},
                        {key: 'value', type: 'string', readonly: false},
                        {key: 'order', type: 'number', readonly: false}
                    ];
                    break;
                }
                case 'textarea': {
                    data = [
                        {key: 'id', type: 'string', readonly: true},
                        {key: 'required', type: 'boolean', readonly: false},
                        {key: 'cType', type: 'string', readonly: true},
                        {key: 'label', type: 'string', readonly: false},
                        {key: 'helpText', type: 'string', readonly: false},
                        {key: 'placeholder', type: 'string', readonly: false},
                        {
                            key: 'type', readonly: false, type: 'dropdown',
                            options: [
                                {key: 'text', value: 'text'},
                                {key: 'number', value: 'number'},
                                {key: 'password', value: 'password'},
                                {key: 'email', value: 'email'},
                                {key: 'color', value: 'color'},
                                {key: 'tel', value: 'tel'}
                            ]
                        },
                        {key: 'style', type: 'string', readonly: false},
                        {key: 'class', type: 'string', readonly: false},
                        {key: 'value', type: 'string', readonly: false},
                        {key: 'order', type: 'number', readonly: false},
                        {key: 'length', type: 'number', readonly: false},
                        {key: 'rows', type: 'number', readonly: false}
                    ];
                    break;
                }
                case 'dropdown':
                case 'autocomplete': {
                    data = [
                        {key: 'id', type: 'string', readonly: true},
                        {key: 'required', type: 'boolean', readonly: false},
                        {key: 'cType', type: 'string', readonly: true},
                        {key: 'label', type: 'string', readonly: false},
                        {key: 'helpText', type: 'string', readonly: false},
                        {key: 'style', type: 'string', readonly: false},
                        {key: 'class', type: 'string', readonly: false}
                    ];
                    break;
                }
                case 'button': {
                    data = [
                        {key: 'id', type: 'string', readonly: true},
                        {key: 'required', type: 'boolean', readonly: false},
                        {key: 'cType', type: 'string', readonly: true},
                        {key: 'label', type: 'string', readonly: false},
                        {
                            key: 'type', readonly: false, type: 'dropdown',
                            options: [
                                {key: 'button', value: 'Button'},
                                {key: 'submit', value: 'Submit'},
                                {key: 'reset', value: 'Reset'}
                            ]
                        },
                        {key: 'helpText', type: 'string', readonly: false},
                        {key: 'style', type: 'string', readonly: false},
                        {key: 'class', type: 'string', readonly: false},
                        {key: 'value', type: 'string', readonly: false},
                    ];
                    break;
                }
                case 'checkbox':
                case 'radio': {
                    data = [
                        {key: 'id', type: 'string', readonly: true},
                        {key: 'cType', type: 'string', readonly: true},
                        {key: 'required', type: 'boolean', readonly: false},
                        {key: 'label', type: 'string', readonly: false},
                        {key: 'style', type: 'string', readonly: false},
                        {key: 'class', type: 'string', readonly: false},
                        {key: 'placeholder', type: 'string', readonly: false},
                        {
                            key: 'options', type: 'dropdown', readonly: false,
                            options: [
                                {key: 'button', value: 'Button'},
                                {key: 'submit', value: 'Submit'},
                                {key: 'reset', value: 'Reset'}
                            ]
                        },
                    ];
                    break;
                }
                case 'calendar': {
                    data = [
                        {key: 'id', type: 'string', readonly: true},
                        {key: 'cType', type: 'string', readonly: true},
                        {key: 'required', type: 'boolean', readonly: false},
                        {key: 'label', type: 'string', readonly: false},
                        {key: 'helpText', type: 'string', readonly: false},
                        {key: 'style', type: 'string', readonly: false},
                        {key: 'class', type: 'string', readonly: false},
                        {key: 'value', type: 'string', readonly: false},
                    ];
                    break;
                }
                case 'file': {
                    data = [
                        {key: 'id', type: 'string', readonly: true},
                        {key: 'cType', type: 'string', readonly: true},
                        {key: 'required', type: 'boolean', readonly: false},
                        {key: 'label', type: 'string', readonly: false},
                        {key: 'helpText', type: 'string', readonly: false},
                        {key: 'style', type: 'string', readonly: false},
                        {key: 'class', type: 'string', readonly: false},
                        {key: 'multiple', type: 'boolean', readonly: false},
                    ];
                    break;
                }
                default: {
                    data = [
                        {key: 'id', type: 'string', readonly: true},
                        {key: 'type', type: 'string', readonly: true},
                        {key: 'cType', type: 'string', readonly: true},
                        {key: 'name', type: 'string', readonly: false},
                        {key: 'label', type: 'string', readonly: false},
                        {key: 'style', type: 'string', readonly: false},
                        {key: 'class', type: 'string', readonly: false}
                    ];
                    break;
                }
            }
            return data;
        }
    }

    getQuestions(option: any) {
        let _cType = option.cType;
        let _data: any;
        try {
            _data = _custom[_cType];
        } catch (err) {
            console.log('InputControlService:control configs are not registered :' + JSON.stringify(option));
            _data = {
                data: [
                    {
                        'name': 'Default',
                        'cType': 'e-default',
                        'type': 'custom'
                    }
                    ]
            };
        }
        return _data
    }
}
