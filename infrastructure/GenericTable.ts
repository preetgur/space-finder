
import { Stack } from "aws-cdk-lib";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { join } from 'path';
export interface TableProps {
    tableName : string;
    primaryKey : string;
    createLambdaPath? : string;
    readLambdaPath? : string;  
    updateLambdaPath? : string;  
    deleteLambdaPath? : string;  

}

export class GenericTable{

    private props : TableProps
    private stack : Stack;
    private table: Table;

    // lambdafuncion for crud operations
    private createLambda : NodejsFunction | undefined;
    private readLambda : NodejsFunction | undefined;
    private updateLambda : NodejsFunction | undefined;
    private deleteLambda : NodejsFunction | undefined;

    public createLambdaIntegration : LambdaIntegration;
    public readLambdaIntegration : LambdaIntegration;
    public updateLambdaIntegration : LambdaIntegration;
    public deleteLambdaIntegration : LambdaIntegration;

    // How to call GenericTable constructor:
    // private SpaceTable = new GenericTable(this,{
    //     tableName:'SpaceFinder-01',
    //     primaryKey:'sp-Id',
    // } ) 
    public constructor(stack: Stack,props: TableProps){
        this.stack = stack;
        this.props = props;
        this.initialize()
    }

    private initialize(){
        this.createTable();
        this.createLambdas();
        this.grantTableRights();
    }

    private createTable(){
        this.table = new Table(this.stack,this.props.tableName,{
            tableName: this.props.tableName,
            partitionKey: {
                name: this.props.primaryKey,
                type: AttributeType.STRING
            },
        });
    }

    private createLambdas(){    
        if(this.props.createLambdaPath){
            this.createLambda = this.createSingleLambdaFunction(this.props.createLambdaPath)
            this.createLambdaIntegration = new LambdaIntegration(this.createLambda)
        }

        if(this.props.readLambdaPath){
            this.readLambda = this.createSingleLambdaFunction(this.props.readLambdaPath)
            this.readLambdaIntegration = new LambdaIntegration(this.readLambda)
        }

        if(this.props.updateLambdaPath){
            this.updateLambda = this.createSingleLambdaFunction(this.props.updateLambdaPath)
            this.updateLambdaIntegration = new LambdaIntegration(this.updateLambda)
        }

        if(this.props.deleteLambdaPath){
            this.deleteLambda = this.createSingleLambdaFunction(this.props.deleteLambdaPath)
            this.deleteLambdaIntegration = new LambdaIntegration(this.deleteLambda)
        }
    }

    private grantTableRights(){ 
        if(this.createLambda){
            this.table.grantWriteData(this.createLambda)    // grant write access to table
        }
        if(this.readLambda){    
            this.table.grantReadData(this.readLambda)    // grant read access to table
        }
        if(this.updateLambda){
            this.table.grantWriteData(this.updateLambda)    // grant update access to table
        }
        if(this.deleteLambda){
            this.table.grantWriteData(this.deleteLambda)    // grant delete access to table
        }
    }
    private createSingleLambdaFunction(lambdaName:string){         
        const lambdaId = `${this.props.tableName}-${lambdaName}`
        return new NodejsFunction(this.stack, lambdaId, {
            entry: join(__dirname, '..', 'services', `${this.props.tableName}`, `${lambdaName}.ts`),
            handler: 'handler',  // always use name as 'handler'
            functionName: lambdaId,
            environment: {
                TABLE_NAME: this.props.tableName,   // table 
                PRIMARY_KEY: this.props.primaryKey,  // primary key
            }
        })
    }

    // api intergration
    // this.api.root.addResource('hello').addMethod('GET', new LambdaIntegration(listMyBucketsLambda));
   
}