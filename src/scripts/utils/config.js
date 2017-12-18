import { setAppName } from './storage';
import { setApiPrefix, setApiSuffix } from './ajax';

export function updateConfig (opts) {
  setAppName(opts.appName || 'app');
  setApiPrefix(opts.apiPrefix || '');
  setApiSuffix(opts.apiSuffix || '');
}
