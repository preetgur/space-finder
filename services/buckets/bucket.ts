
import { S3 } from 'aws-sdk';
const s3Client = new S3()

// list all buckets
export const listBucketHandler = async(event:any, context:any) => {

    const mybuckets = await s3Client.listBuckets().promise();
    return{
        statusCode: 200,
        body: JSON.stringify({
            message: 'List My Buckets :: !'+ JSON.stringify(mybuckets.Buckets)
        })
    }
}