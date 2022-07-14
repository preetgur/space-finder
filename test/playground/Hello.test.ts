import { listBucketHandler } from "../../services/buckets/bucket";
// import { handler } from "../../services/SpaceFinder-01/Read";
// import { handler } from "../../services/spaceTable/create";
import { handler } from "../../services/SpaceFinder-01/Update";

import { APIGatewayProxyEvent } from 'aws-lambda';

// listBucketHandler({}, {});

// handler({} as any, {} as any);


// const event = { 
//     body:{
//     location: "Rajpura",
// }}

// handler(event as any, {} as any);


// ###### query parameters ######
// const event:APIGatewayProxyEvent = {
//     queryStringParameters: {
//         location: 'Rajpura',
//     }
// } as any

// ###### PUT body ######
const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        "sp-Id": 'e9b49294-ba9a-436f-afe1-a29979ee85ea'
    },
    body: {
        location: 'new location'
    }
} as any;

const result = handler(event, {} as any).then(data => {
    
    const items = JSON.parse(data.body)
    console.log(items);
})