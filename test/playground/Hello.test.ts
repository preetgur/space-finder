import { listBucketHandler } from "../../services/buckets/bucket";
import { handler } from "../../services/SpaceFinder-01/Read";
// import { handler } from "../../services/spaceTable/create";

// listBucketHandler({}, {});

// const event = { 
//     body:{
//     location: "Rajpura",
// }}

// handler(event as any, {} as any);


handler({} as any, {} as any);

const result = handler({} as any, {} as any).then(data => {
    
    const items = JSON.parse(data.body)
    console.log(items);
})