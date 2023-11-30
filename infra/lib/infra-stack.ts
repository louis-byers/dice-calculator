import * as path from 'path';

import { type Construct } from 'constructs';
import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
} from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy, Stack, type StackProps } from 'aws-cdk-lib';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { AcmCertStack } from './acm-cert-stack';
import {
  Distribution,
  OriginAccessIdentity,
  ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin, S3OriginProps } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const zoneDomainName = this.node.tryGetContext('hostedZoneDomainName');
    const distributionDomainName = this.node.tryGetContext(
      'distributionDomainName'
    );

    //get cert
    const certStack = new AcmCertStack(this, 'acmCertStack');

    // s3 bucket for content
    const contentBucket = new Bucket(this, 'contentBucket', {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      bucketName: 'dice-calculator-content',
      versioned: true,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    // To use your own domain name in a Distribution, you must associate a certificate
    const originAccessIdentity = new OriginAccessIdentity(
      this,
      'OriginAccessIdentity'
    );
    contentBucket.grantRead(originAccessIdentity);

    const s3OriginProps: S3OriginProps = {
      originAccessIdentity: originAccessIdentity,
    };
    const distro = new Distribution(this, 'myDist', {
      defaultBehavior: {
        origin: new S3Origin(contentBucket, s3OriginProps),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      domainNames: [distributionDomainName],
      certificate: certStack.cert,
    });

    //to do source content
    new BucketDeployment(this, 'BucketDeployment', {
      destinationBucket: contentBucket,
      sources: [
        Source.asset(
          path.resolve(__dirname, '../../dist/dice-calculator/browser')
        ),
      ],
      prune: false,
      distribution: distro,
    });

    // route 53 entry
    const zone = HostedZone.fromLookup(this, 'baseZone', {
      domainName: zoneDomainName,
    });

    new ARecord(this, 'aRecord.baseZone', {
      zone: zone,
      recordName: distributionDomainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distro)),
    });
  }
}
