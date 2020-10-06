const { Resolver } = require('dns').promises;

const getLokinetDNSAddress = (): string => {
  if (process.platform === 'linux') return '127.3.2.1';
  else return '127.0.0.1';
};

const servers = [getLokinetDNSAddress()];

const fastLokinetResolver = new Resolver({ timeout: 50 });
fastLokinetResolver.setServers(servers);

const lokinetResolver = new Resolver();
lokinetResolver.setServers(servers);


/// return true if we detect we have lokinet locally
export function hasLokinet(): Promise<boolean> {
  const result = fastLokinetResolver.resolve('localhost.loki');

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
