export function parseCertificate(certificate: any) {
  const output: object = {
    issuer: {
      distinguishedName: '',
      components: {
        email: '',
        commonName: '',
        organizationalUnit: '',
        organizationName: '',
        localityName: '',
        stateName: '',
        country: ''
      }
    },
    subject: {
      distinguishedName: '',
      components: {
        email: '',
        commonName: '',
        organizationalUnit: '',
        organizationName: '',
        localityName: '',
        stateName: '',
        country: ''
      }
    },
    serialNumber: certificate.serialNumber,
    validFrom: certificate.validity.notBefore,
    validTo: certificate.validity.notAfter,
    version: certificate.version
  }

  keyInformationFormatter(output, 'issuer', certificate.issuer.attributes);
  keyInformationFormatter(output, 'subject', certificate.issuer.attributes);

  return output
}
function keyInformationFormatter (outputObject: any, parentObj: string, typeValues: any[]) {

  const rdnmap = {
    '2.5.4.6': 'C',
    '2.5.4.10': 'O',
    '2.5.4.11': 'OU',
    '2.5.4.3': 'CN',
    '2.5.4.7': 'L',
    '2.5.4.8': 'S',
    '2.5.4.12': 'T',
    '2.5.4.42': 'GN',
    '2.5.4.43': 'I',
    '2.5.4.4': 'SN',
    '1.2.840.113549.1.9.1': 'E-mail'
  }

  // Issuer
  for (const typeAndValue of typeValues) {
    // @ts-ignore
    const typeval = rdnmap[typeAndValue.type]

    if (typeval === 'E-mail') {
      outputObject[parentObj].components.commonName = typeAndValue.value
    } else if (typeval === 'CN') {
      outputObject[parentObj].components.commonName = typeAndValue.value
    } else if (typeval === 'OU') {
      outputObject[parentObj].components.organizationalUnit = typeAndValue.value
    } else if (typeval === 'O') {
      outputObject[parentObj].components.organizationName = typeAndValue.value
    } else if (typeval === 'L') {
      outputObject[parentObj].components.localityName = typeAndValue.value
    } else if (typeval === 'ST') {
      outputObject[parentObj].components.stateName = typeAndValue.value
    } else if (typeval === 'C') {
      outputObject[parentObj].components.country = typeAndValue.value
    }
  }

  outputObject[parentObj].distinguishedName = formatDistinguishedName(outputObject[parentObj].components)

  return outputObject

}

function formatDistinguishedName(components: object) {

  const nameMap = {
    country: 'C',
    organizationName: 'O',
    organizationalUnit: 'OU',
    commonName: 'CN',
    localityName: 'L',
    stateName: 'S',
    '2.5.4.12': 'T',
    '2.5.4.42': 'GN',
    '2.5.4.43': 'I',
    '2.5.4.4': 'SN',
    email: 'E-mail'
  }

  // @ts-ignore
  return Object.keys(components).filter(el => components[el]).map(key => `${nameMap[key]}=${components[key]}`)
    .join(',')
}
