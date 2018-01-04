module.exports = [
  // wallet.rs
  {
    libFnName: 'indy_create_wallet',
    libApi: ['int', ['int', 'string', 'string', 'string', 'string', 'string', 'pointer']],
    jsFnName: 'createWallet',
    jsApi: ['poolName', 'name', 'xType', 'config', 'credentials', 'callback']
  },
  {
    libFnName: 'indy_open_wallet',
    libApi: ['int', ['int', 'string', 'string', 'string', 'pointer']],
    jsFnName: 'openWallet',
    jsApi: ['name', 'config', 'credentials', 'callback']
  }
];
