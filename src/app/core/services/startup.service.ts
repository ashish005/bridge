import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StartupService {
  private configurations: any = null;

  constructor(private httpClient: HttpClient) { }

  public getConfigurations(): any {
    return this.configurations;
  }

  /*initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(`initializeApp:: inside promise`);

      /!*setTimeout(() => {
        console.log(`initializeApp:: inside setTimeout`);
        // doing something

        resolve();
      }, 3000);*!/
      resolve();
    });
  }*/

  getSettings(): Promise<any> {
    console.log(`getSettings:: before http.get call`);
    const promise = this.httpClient.get('http://private-1ad25-initializeng.apiary-mock111.com/settings')
      .toPromise()
      .then(settings => {
        console.log(`Settings from API: `, settings);
        this.configurations = settings;
        Promise.resolve(settings);
      }).catch((reason: any) => Promise.resolve(this.configurations = null));

    return promise;
  }
}

export function init_app(appLoadService: StartupService) {
  return null;
  //return () => appLoadService.initializeApp();
}

export function get_settings(appLoadService: StartupService) {
  return () => appLoadService.getSettings();
}
