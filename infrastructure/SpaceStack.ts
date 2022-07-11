import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { join } from 'path'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GenericTable';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class SpaceStack extends Stack {

    private api = new RestApi(this, 'SpaceFinderApi')
    // dynamo DB
    private SpaceTable = new GenericTable('SpaceFinder', 'sp-Id', this)

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props)

        // const helloLambda = new lambda.Function(this, 'HelloLambda', {
        //     runtime: lambda.Runtime.NODEJS_14_X,
        //     code: lambda.Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
        //     handler: 'hello.main'
        // });

        const helloNodeLambda = new NodejsFunction(this, 'HelloNodeLambda', {
            entry: join(__dirname, '..', 'services', 'node-lambda', 'hello.ts'),
            handler: 'handler'
        })
        // api intergration
        this.api.root.addResource('hello').addMethod('GET', new LambdaIntegration(helloNodeLambda));
    }
}