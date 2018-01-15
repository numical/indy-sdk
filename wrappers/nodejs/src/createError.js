const success = 100;

// taken from https://github.com/hyperledger/indy-sdk/blob/master/libindy/src/api/mod.rs
const errorCodes = {
  // common errors
  100: 'CommonInvalidParam1:  Caller passed invalid value as param 1 (null, invalid json and etc..)',
  101: 'CommonInvalidParam2:  Caller passed invalid value as param 1 (null, invalid json and etc..)',
  102: 'CommonInvalidParam3:  Caller passed invalid value as param 1 (null, invalid json and etc..)',
  103: 'CommonInvalidParam4:  Caller passed invalid value as param 1 (null, invalid json and etc..)',
  104: 'CommonInvalidParam5:  Caller passed invalid value as param 1 (null, invalid json and etc..)',
  105: 'CommonInvalidParam6:  Caller passed invalid value as param 1 (null, invalid json and etc..)',
  106: 'CommonInvalidParam7:  Caller passed invalid value as param 1 (null, invalid json and etc..)',
  107: 'CommonInvalidParam8:  Caller passed invalid value as param 1 (null, invalid json and etc..)',
  108: 'CommonInvalidParam9:  Caller passed invalid value as param 1 (null, invalid json and etc..)',
  109: 'CommonInvalidParam10:  Caller passed invalid value as param 1 (null, invalid json and etc..)',
  110: 'CommonInvalidParam11:  Caller passed invalid value as param 1 (null, invalid json and etc..)',
  111: 'CommonInvalidParam12:  Caller passed invalid value as param 1 (null, invalid json and etc..)',
  112: 'CommonInvalidState: Invalid library state was detected in runtime. It signals library bug',
  113: 'CommonInvalidStructure: Object (json, config, key, claim and etc...) passed by library caller has invalid structure',
  114: 'CommonIOError',

  // wallet errors
  200: 'WalletInvalidHandle: Caller passed invalid wallet handle',
  201: 'WalletUnknownTypeError: Attempt to register already existing wallet type',
  202: 'WalletTypeAlreadyRegisteredError: Attempt to register already existing wallet type',
  203: 'WalletAlreadyExistsError:  Attempt to create wallet with name used for another exists wallet',
  204: 'WalletNotFoundError: Requested entity id isn\'t present in wallet',
  205: 'WalletIncompatiblePoolError:  Trying to use wallet with pool that has different name',
  206: 'WalletAlreadyOpenedError: Trying to open wallet that was opened already',

  // ledger errors
  300: 'PoolLedgerNotCreatedError: Trying to open pool ledger that wasn\'t created before',
  301: 'PoolLedgerInvalidPoolHandle: Caller passed invalid pool ledger handle',
  302: 'PoolLedgerTerminated: Pool ledger terminated',
  303: 'LedgerNoConsensusError: No concensus during ledger operation',
  305: 'LedgerSecurityError: Attempt to send transaction without the necessary privileges',
  306: 'PoolLedgerConfigAlreadyExistsError: Attempt to create pool ledger config with name used for another existing pool',
  307: 'PoolLedgerTimeout: Timeout for action',

  // credentials errors
  400: 'AnoncredsRevocationRegistryFullError: Revocation registry is full and creation of new registry is necessary',
  401: 'AnoncredsInvalidUserRevocIndex',
  402: 'AnoncredsAccumulatorIsFull',
  403: 'AnoncredsNotIssuedError',
  404: 'AnoncredsMasterSecretDuplicateNameError:  Attempt to generate master secret with duplicated name',
  405: 'AnoncredsProofRejected',
  406: 'AnoncredsClaimRevoked',

  // crypto errors
  500: 'UnknownCryptoTypeError: Unknown format of DID entity keys'
};

const createError = (code) => {
  if (code === success) return null;
  var msg = errorCodes[code];
  if (!msg) {
    msg = 'Unknown error code';
  }
  return new Error(msg);
};

module.exports = createError;

