import {Component, OnInit} from '@angular/core';
import {StartupService} from './core/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  configurations: any;
  loading:boolean = true;

  isCreatorView: Boolean = true;
  data: Array<any> = [
    {
      'id': '150368539889388c4dc6d8b9c1',
      'name': 'e-dynamic-form',
      'type': 'custom',
      'cType': 'e-color',
      'class': '',
      'isDraggable': true,
      'parentRef': '',
      'isEditable': false,
      'canBeDeleted': false,
      'canBeApplied': false,
      'canClone': false,
      'action': {
        'xhr': {}
      }
    },
    {
      'name': 'Grid',
      'type': 'custom',
      'cType': 'e-grid',
      'class': 'col-lg-12',
      'isDraggable': true,
      'isEditable': false,
      'canBeDeleted': false,
      'canBeApplied': false,
      'canClone': true,
      'action': {
        'xhr': {
          'url': 'db-enricher/db/1',
          'method': 'get'
        },
        'events': [
          'click'
        ],
        'click': 'xhr'
      }
    }
  ];

  constructor(private startup: StartupService) {
    console.log('called AppComponent');
    this.configurations = this.startup.getConfigurations();
    this.loading = false;
  }
  ngOnInit() {}
}
