import { IStoresEnv } from 'ide-lib-base-component';
import { IStoresModel } from 'ide-lib-engine';

[SUBCOMP_START]
import { RPATH } from '../../subs'
[SUBCOMP_END]
/**
 * 显示 list 列表项
 * @param env - IStoresEnv
 */
export const showConsole = (env: IStoresEnv<IStoresModel>) => async (key: string, keyPath: Array<string>, item: any) => {
    const { stores, client } = env;
    // stores.model.setVisible(true); // 可见
    [SUBCOMP_START]
    // const resHeaderBar = await client.get(`${RPATH.headerBar}/model`);
    [SUBCOMP_END]
}

