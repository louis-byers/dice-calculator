import { type Construct } from 'constructs';
import { Stack } from 'aws-cdk-lib';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import {
  Certificate,
  CertificateValidation,
} from 'aws-cdk-lib/aws-certificatemanager';

export class AcmCertStack extends Stack {
  cert: Certificate;

  constructor(scope: Construct, id: string) {
    super(scope, id, {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: 'us-east-1',
      },
    });

    const zoneDomainName = this.node.tryGetContext('hostedZoneDomainName');
    const distributionDomainName = this.node.tryGetContext(
      'distributionDomainName'
    );

    // route 53 entry
    const zone = HostedZone.fromLookup(this, 'baseZone', {
      domainName: zoneDomainName,
    });

    // acm cert, force to be in us east 1 for use with cloudfront
    this.cert = new Certificate(this, 'Certificate', {
      domainName: distributionDomainName,
      validation: CertificateValidation.fromDns(zone),
    });
  }
}
