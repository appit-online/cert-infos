# [certificate-infos: Node.js](https://github.com/appit-online/cert-infos)

Receive RSA certificate information (distinguishedName, commonName, validFrom, validTo,...) from a pem or der encoded file.



**Table of contents:**


* [Quickstart](#quickstart)

  * [Installing the library](#installing-the-library)
  * [Using the library](#using-the-library)
* [License](#license)

## Quickstart

### Installing the library

```bash
npm install cert-infos --save
```


### Using the library

```javascript
import * as certInfo from 'cert-infos';

/**
 * Given a pem certificate file, get certificate information.
 * @param {string} pemCertPath The path to a certificate file.
 */
const {certificate, certificateOriginal} = certInfo.getRSACertInfoPem(pemCertPath);
console.log('The short certificate information:');
console.log(certificate);

console.log('The unconverted certificate data:');
console.log(certificateOriginal)
```

```javascript
import * as certInfo from 'cert-infos';

/**
 * Given a der certificate file, get certificate information.
 * @param {string} derCertPath The path to a certificate file.
 */
const {certificate, certificateOriginal} = certInfo.getRSACertInfoDER(derCertPath);
console.log('The short certificate information:');
console.log(certificate);

console.log('The unconverted certificate data:');
console.log(certificateOriginal)
```

## Supported Node.js Versions

Our client libraries follow the [Node.js release schedule](https://nodejs.org/en/about/releases/).
Libraries are compatible with all current _active_ and _maintenance_ versions of
Node.js.

## License

Apache Version 2.0

See [LICENSE](https://github.com/appit-online/cert-infos/blob/master/LICENSE)
