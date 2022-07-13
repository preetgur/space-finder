import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { v4 } from "uuid";


const dbClient = new DynamoDB.DocumentClient()

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    
    const item = typeof event.body ==="object" ? event.body : JSON.parse(event.body)
    item['sp-Id'] = v4()
    const params = {
        TableName: "SpaceFinder-01",
        Item: item
    }
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: "HELLOW FROM DynamoDB"
    }

    try {
        await dbClient.put(params).promise()
    } catch (error: any) {
        result.body = error?.message
    }
    result.body = `Item created with id: ${item['sp-Id']}`
    return result
}

export {handler}