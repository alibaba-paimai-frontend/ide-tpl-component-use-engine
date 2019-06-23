import React from 'react';
import { storiesOf } from '@storybook/react';
import { wInfo } from '../../.storybook/utils';

import { [CLASSNAME], [CLASSNAME]Factory } from '../../src/';
import { createModel } from 'ide-lib-engine';
import mdMobx from './simple-mobx.md';
import mdPlain from './simple-plain.md';

const propsNormal = {
  visible: true,
  text: ''
};
const propsModel = createModel([CLASSNAME]Model, propsNormal);

function onClick(value) {
  console.log('当前值：', value);
}

const clickBtn = isClient => () => {
    if (target && target.setText) {
    target.setText(
      `gggg${Math.random()}`.slice(0, 8)
    );
  } else {
    propsNormal.text = 'hello world';
  }
};

storiesOf('基础使用', module)
  .addParameters(wInfo(mdMobx))
  .addWithJSX('使用 mobx 化的 props', () => {
    const [CLASSNAME]WithStore = HeaderBarAddStore({
      stores: { model: propsModel }
    });
    return (
      <div>
        <button onClick={clickBtn(propsModel)}>更改文案（会响应）</button>
        <[CLASSNAME]WithStore onClick={onClick} />
      </div>
    );
  })
  .addParameters(wInfo(mdPlain))
  .addWithJSX('普通 props 对象', () => (
    <div>
      <button onClick={clickBtn(propsNormal)}>更改文案（不会响应）</button>
      <[CLASSNAME] {...propsNormal} onClick={onClick} />
    </div>
  ));
