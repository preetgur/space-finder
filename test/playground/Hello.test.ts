import { listBucketHandler } from "../../services/buckets/bucket";
import { handler } from "../../services/spaceTable/create";

// listBucketHandler({}, {});

const event = { 
    body:{
    location: "Rajpura",
}}

handler(event as any, {} as any);