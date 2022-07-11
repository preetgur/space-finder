import {v4} from 'uuid';

export const handler = async(event:any, context:any) => {

    return{
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello World node lambda!'+v4()
        })
    }
}