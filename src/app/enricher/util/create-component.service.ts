'use strict';
import {
  Injectable,
  NgModule,
  Component,
  ComponentFactory,
  ViewContainerRef,
  Compiler,
  ComponentFactoryResolver,
  ModuleWithComponentFactories,
  ComponentRef,
  ReflectiveInjector
} from '@angular/core';
import {CommonModule} from '@angular/common';
import 'rxjs/add/operator/map';

function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {
  const cmpClass = class DynamicComponent {
  };
  const decoratedCmp = Component(metadata)(cmpClass);

  @NgModule({imports: [CommonModule], declarations: [decoratedCmp]})
  class DynamicHtmlModule {
  }

  return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
    .then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
      return moduleWithComponentFactory.componentFactories.find(x => x['componentType'] === decoratedCmp);
    });
}

@Injectable()
export class CreateComponentService {
  private componentRef: ComponentRef<{}>;

  constructor(private compiler: Compiler,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  createComponent(_component: any, container: ViewContainerRef) {
    if (!_component) {
      console.log('CreateComponentUtilService Error Component Undefined');
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(_component);
    this.componentRef = container.createComponent(factory);
    const componentInstance: any = this.componentRef.instance;
    return componentInstance;
  }

  destroyComponentRef() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  createHTML(innerHTML: string, container: ViewContainerRef) {
    if (!innerHTML) { return; }
    const compMetadata = new Component({selector: 'dynamic-html', template: innerHTML});
    createComponentFactory(this.compiler, compMetadata)
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], container.parentInjector);
        this.componentRef = container.createComponent(factory, 0, injector, []);
      });
  }
}
