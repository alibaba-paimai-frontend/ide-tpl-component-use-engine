import { Instance } from 'mobx-state-tree';
import { initSuits } from 'ide-lib-engine';

export * from './[CLASSNAME]/config';
export * from './[CLASSNAME]/';

import { [CLASSNAME]Currying } from './[CLASSNAME]/';
import { config[CLASSNAME] } from './[CLASSNAME]/config';

// 抽离子组件配置项
const subStoresModelMap = {};
const subFactoryMap = {};
[SUBCOMP_START]
const subComponents = config[CLASSNAME].component.children;
const subComponentNames = Object.keys(subComponents);
subComponentNames.forEach((name: string) => {
    subStoresModelMap[name] = subComponents[name].storesModel;
    subFactoryMap[name] = subComponents[name].factory;
});
[SUBCOMP_END]

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
