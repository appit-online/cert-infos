import { parseCertificate } from './lib/cert';
import * as fs from 'fs';
import * as forge from "node-forge";

export const Name = (name: string) => `Hello ${name}`;

export function getRSACertInfoPem(certPath: string): any {
  let certificateString = fs.readFileSync(certPath, { encoding: 'binary' });
  certificateString = certificateString.replace(/\r\n/g, '');
  const certificateOriginal = forge.pki.certificateFromPem(certificateString);
  const certificate = parseCertificate(certificateOriginal);
  return {certificate, certificateOriginal};
}

export function getRSACertInfoDER(certPath: string): any {
  const certificateString = fs.readFileSync(certPath, { encoding: 'binary' });
  const certDER = forge.asn1.fromDer(certificateString);
  const certificateOriginal = forge.pki.certificateFromAsn1(certDER);
  const certificate = parseCertificate(certificateOriginal);
  return {certificate, certificateOriginal};
}
