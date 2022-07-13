import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { v4 } from "uuid";


const dbClient = new DynamoDB.DocumentClient()

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    const params = {
        TableName: "SpaceFinder-01",
        Item: {
            "sp-Id": v4(),
        }
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
    return result
}

export {handler}