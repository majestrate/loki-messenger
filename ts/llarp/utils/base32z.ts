const base32 = require('hi-base32');

const rfc_base32_alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const base32z_alpha = 'ybndrfg8ejkmcpqxot1uwisza345h769';

/// encode hex encoded data to base32z
export function base32z_encode(hexdata: string): string {
  const buf = new Buffer(hexdata, 'hex');
  const str = base32.encode(buf);
  let retval = '';
  for (let ind = 0; ind < str.length; ind++) {
    const idx = rfc_base32_alpha.indexOf(str.charAt(ind));
    if (idx >= 0) {
      retval += base32z_alpha.charAt(idx);
    }
  }
  return retval;
}
