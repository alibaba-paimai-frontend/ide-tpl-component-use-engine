const path = require('path');
const COMMON_EXTERNALS = {
  ette: {
    commonjs: 'ette',
    commonjs2: 'ette',
    amd: 'ette',
    root: 'Ette'
  },
  'ette-router': {
    commonjs: 'ette-router',
    commonjs2: 'ette-router',
    amd: 'ette-router',
    root: 'etteRouter'
  },
  'ette-proxy': {
    commonjs: 'ette-proxy',
    commonjs2: 'ette-proxy',
    amd: 'ette-proxy',
    root: 'etteProxy'
  },
  react: {
    commonjs: 'react',
    commonjs2: 'react',
    amd: 'react',
    root: 'React'
  },
  'react-dom': {
    commonjs: 'react-dom',
    commonjs2: 'react-dom',
    amd: 'react-dom',
    root: 'ReactDOM'
  },
  antd: 'antd',
  mobx: 'mobx',
  'mobx-react': {
    commonjs: 'mobx-react',
    commonjs2: 'mobx-react',
    amd: 'mobx-react',
    root: 'mobxReact'
  },
  'mobx-react-lite': {
    commonjs: 'mobx-react-lite',
    commonjs2: 'mobx-react-lite',
    amd: 'mobx-react-lite',
    root: 'mobxReact'
  },
  'mobx-state-tree': {
    commonjs: 'mobx-state-tree',
    commonjs2: 'mobx-state-tree',
    amd: 'mobx-state-tree',
    root: 'mobxStateTree'
  },
  'styled-components': {
    commonjs: 'styled-components',
    commonjs2: 'styled-components',
    amd: 'styled-components',
    root: 'styled'
  },
};


const ALL_EXTERNALS = Object.assign({}, COMMON_EXTERNALS, {
  'ss-tree': {
    commonjs: 'ss-tree',
    commonjs2: 'ss-tree',
    amd: 'ss-tree',
    root: 'ssTree'
  },
  'ide-code-editor': {
    commonjs: 'ide-code-editor',
    commonjs2: 'ide-code-editor',
    amd: 'ide-code-editor',
    root: 'ideCodeEditor'
  }
});

const COMMON_LIBS = Object.keys(COMMON_EXTERNALS);

// 使用 alias 解决基础包打包的问题，方便调试时修改
const ALIAS_LIBS = [
  'ide-lib-base-component',
  'ide-lib-engine',
  'ide-lib-utils'
];

module.exports = {
  COMMON_EXTERNALS,
  getExternal: function (extraLibs = [], isProduction = false) {
    const libs = COMMON_LIBS.concat(extraLibs);
    const externals = {};
    libs.forEach(lib => {
      // 如果是 dev 状态，优先使用 alias 配置而不是 externals
      if (!isProduction && !!~ALIAS_LIBS.indexOf(lib)) {
        console.log(`依赖库 "${lib}" 优先使用 alias 配置`);
      } else {
        externals[lib] = isProduction
          ? ALL_EXTERNALS[lib]
          : (ALL_EXTERNALS[lib] && ALL_EXTERNALS[lib].root) || lib;
      }
    });
    return externals;
  },
  getAlias: function() {
    const alias = {};
    ALIAS_LIBS.forEach(lib => {
      const isObj = typeof lib === 'object';
      const aliasName = isObj ? lib['name'] : lib;
      const dirPath = isObj
        ? lib['path']
        : path.resolve(__dirname, `../${lib}/`);
      if (!aliasName) {
        throw new Error('aliasName not exist!');
      }
      if (!dirPath) {
        throw new Error('dirPath not exist!');
      }
      alias[`${aliasName}$`] = dirPath;
    });

    return {
      alias,
      mainFields: ['idebug', 'browser', 'module', 'main']
    };
  }
};
