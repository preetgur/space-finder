import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { join } from 'path'

export class SpaceStack extends Stack {

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props)


        const helloLambda = new lambda.Function(this, 'HelloLambda', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
            handler: 'hello.main'
        });
    }
}