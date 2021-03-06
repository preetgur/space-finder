// import { listBucketHandler } from "../../services/buckets/bucket";
// import { handler } from "../../services/SpaceFinder-01/Read";
// import { handler } from "../../services/spaceTable/create";
// import { handler } from "../../services/SpaceFinder-01/Update";
// import { handler } from "../../services/SpaceFinder-01/Delete";
import { handler } from "../../services/SpaceFinder-01/Create";

import { APIGatewayProxyEvent } from 'aws-lambda';

// listBucketHandler({}, {});

// handler({} as any, {} as any);


const event :APIGatewayProxyEvent= { 
    body:{
    location: "Rajpura",
}} as any;

// handler(event as any, {} as any);


// ###### query parameters ######
// const event:APIGatewayProxyEvent = {
//     queryStringParameters: {
//         location: 'Rajpura',
//     }
// } as any

// ###### PUT body ######
// const event: APIGatewayProxyEvent = {
//     queryStringParameters: {
//         "sp-Id": 'afe38874-d0f7-425a-8cc1-b8d8db2eb244'
//     },
//     body: {
//         location: 'new location'
//     }
// } as any;

//##### DELETE body ######
// const event: APIGatewayProxyEvent = {
//     queryStringParameters: {
//         "sp-Id": 'e9b49294-ba9a-436f-afe1-a29979ee85ea'
//     }
// } as any;

const result = handler(event, {} as any).then(data => {
    
    const items = JSON.parse(data.body)
    console.log(items);
})