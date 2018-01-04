module.exports = [
  // wallet.rs
  {
    libFn: 'indy_create_wallet',
    libApi: ['int', ['int', 'string', 'string', 'string', 'string', 'string', 'pointer']],
    jsFn: 'createWallet',
    jsApi: ['poolName', 'name', 'xType', 'config', 'credentials', 'callback']
  },
  {
    libFn: 'indy_open_wallet',
    libApi: ['int', ['int', 'string', 'string', 'string', 'pointer']],
    jsFn: 'openWallet',
    jsApi: ['name', 'config', 'credentials', 'callback']
  }
];
