import { Instance } from 'mobx-state-tree';
import { initSuits } from 'ide-lib-engine';

export * from './config';
export * from '.';

import { [CLASSNAME]Currying } from './[CLASSNAME]';
import { config[CLASSNAME] } from './config';

// 抽离子组件配置项
const subComponents = config[CLASSNAME].component.children;
const subComponentNames = Object.keys(subComponents);
const subStoresModelMap = {};
const subFactoryMap = {};
subComponentNames.forEach((name: string) => {
    subStoresModelMap[name] = subComponents[name].storesModel;
    subFactoryMap[name] = subComponents[name].factory;
});

const {
    ComponentModel: [CLASSNAME]Model,
    NormalComponent: [CLASSNAME],
    ComponentHOC: [CLASSNAME]HOC,
    ComponentAddStore: [CLASSNAME]AddStore,
    ComponentFactory: [CLASSNAME]Factory
} = initSuits({
    ComponentCurrying: [CLASSNAME]Currying,
    className: config[CLASSNAME].component.className,
    solution: config[CLASSNAME].component.solution,
    defaultProps: config[CLASSNAME].component.defaultProps,
    controlledKeys: config[CLASSNAME].model.controlledKeys,
    modelProps: config[CLASSNAME].model.props,
    subComponents: config[CLASSNAME].component.children,
    subStoresModelMap: subStoresModelMap,
    subFactoryMap: subFactoryMap,
    idPrefix: config[CLASSNAME].store.idPrefix,
    routerConfig: config[CLASSNAME].router
});

export {
    [CLASSNAME]Model,
    [CLASSNAME],
    [CLASSNAME]HOC,
    [CLASSNAME]AddStore,
    [CLASSNAME]Factory
};

export interface I[CLASSNAME]Model extends Instance<typeof [CLASSNAME]Model> { }
