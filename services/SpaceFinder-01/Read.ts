import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDB } from "aws-sdk";


const dbClient = new DynamoDB.DocumentClient()

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    
    const TABLE_NAME = process.env.TABLE_NAME
    
    const params = {
        TableName: TABLE_NAME!,  // ! means we are sure it is defined
    }
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: "HELLOW FROM DynamoDB"
    }

    try {
        const respone = await dbClient.scan(params).promise()
        result.body = JSON.stringify(respone.Items)
    } catch (error: any) {
        result.body = error?.message
    }
    return result
}

export {handler}