import { hasLokinet, lokinetResolver } from './detect_lokinet';
import { base32z_encode } from './base32z';
import { Snode } from '../../session/snode_api/snodePool';

/// generate a .snode address for a snode
export function getSnodeAddress(snode: Snode): string {
  return base32z_encode(snode.pubkey_ed25519) + '.snode';
}

/// resolve a snode address to ip
export async function resolveSnodeAddress(snode: Snode): Promise<string> {
  return await lokinetResolver.resolve(getSnodeAddress(snode));
}

/// the result of resolving a snode url
/// contains 2 members the url and hasLokinet which is set to true if we want to use lokinet
export interface SNodeURL {
  url: string;
  hasLokinet: boolean;
}

/// given a protocol, snode info and url path, generate a url that goes over lokinet if we have it or if we don't a normal one
export async function maybeResolveSNodeURL(
  proto: string,
  snode: Snode,
  path: string
): Promise<SNodeURL> {
  const lokinet = await hasLokinet();
  let result = { url: '', hasLokinet: lokinet };
  if (lokinet) {
    const addr = await resolveSnodeAddress(snode);
    result.url = `${proto}://${addr}:${snode.port}${path}`;
  } else result.url = `${proto}://${snode.ip}:${snode.port}${path}`;
  return result;
}
