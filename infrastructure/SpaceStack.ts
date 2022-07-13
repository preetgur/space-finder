import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { join } from 'path'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GenericTable';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class SpaceStack extends Stack {

    private api = new RestApi(this, 'SpaceFinderApi')
    // dynamo DB
    // private SpaceTable = new GenericTable('SpaceFinder-01', 'sp-Id', this) //old way
    private SpaceTable = new GenericTable(this,{
        tableName:'SpaceFinder-01',
        primaryKey:'sp-Id',
        createLambdaPath:'Create',
        readLambdaPath:'Read'
    } ) 

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

        const listMyBucketsLambda = new NodejsFunction(this, 'listMyBucketsLambda-0137', {
            entry: join(__dirname, '..', 'services', 'buckets', 'bucket.ts'),
            handler: 'listBucketHandler'
        })
        // policy for lambda
        const s3PolicyStatement = new PolicyStatement({ 
            actions: ['s3:ListAllMyBuckets'], 
            resources: ['*'] 
        })

        // add the policy statement to the lambda function
        listMyBucketsLambda.addToRolePolicy(s3PolicyStatement)

        // api intergration
        this.api.root.addResource('hello').addMethod('GET', new LambdaIntegration(listMyBucketsLambda));

        // space api integration
        const spaceResource = this.api.root.addResource('spaces')
        spaceResource.addMethod('POST', this.SpaceTable.createLambdaIntegration);
        spaceResource.addMethod('GET', this.SpaceTable.readLambdaIntegration);

    }
}