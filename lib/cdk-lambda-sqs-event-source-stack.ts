import * as cdk from '@aws-cdk/core';

import * as lambda from '@aws-cdk/aws-lambda';
import * as sqs from '@aws-cdk/aws-sqs';
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import {Role} from '@aws-cdk/aws-iam';

export class CdkLambdaSqsEventSourceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    
    let executionRole = Role.fromRoleArn(this, 'lambda-execution-role666', 'arn:aws:iam::457175632986:role/lambda-exec-admin');
    
    const handler = new lambda.Function(this, 'MyFunc666', {
      code: lambda.Code.fromInline('boom'),
      handler: 'index.handler',
      role: executionRole,
      runtime: lambda.Runtime.NODEJS_12_X
    });
    
    const q = new sqs.Queue(this, 'SQSQ666');

    handler.addEventSource(new SqsEventSource(q));
    
  }
}
