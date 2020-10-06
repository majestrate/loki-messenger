const { Resolver } = require('dns').promises;

import { Snode } from '../../session/snode_api/snodePool';

const getLokinetDNSAddress = (): string => {
  if (process.platform === 'linux') return '127.3.2.1';
  else return '127.0.0.1';
};

const lokinetResolver = new Resolver({ timeout: 50 });
lokinetResolver.setServers([getLokinetDNSAddress()]);

/// return true if we detect we have lokinet locally
export function hasLokinet(): Promise<boolean> {
  const result = lokinetResolver.resolve('localhost.loki');

  let lokinetPromise = new Promise<boolean>((resolve: any, reject: any) => {
    result
      .then((addr: any, error: any) => {
        const has = addr && !error;
        resolve(has);
      })
      .catch((reason: any) => {
        reject(reason);
      });
  });
  return lokinetPromise;
}

export { lokinetResolver };
