import { listBucketHandler } from "../../services/buckets/bucket";
import { handler } from "../../services/SpaceFinder-01/Read";
// import { handler } from "../../services/spaceTable/create";
import { APIGatewayProxyEvent } from 'aws-lambda';

// listBucketHandler({}, {});

// handler({} as any, {} as any);


// const event = { 
//     body:{
//     location: "Rajpura",
// }}

// handler(event as any, {} as any);


// ###### query parameters ######
const event:APIGatewayProxyEvent = {
    queryStringParameters: {
        "sp-Id": "4a185275-fed3-4c3d-be79-3d550914f8aa",
    }
} as any


const result = handler(event, {} as any).then(data => {
    
    const items = JSON.parse(data.body)
    console.log(items);
})