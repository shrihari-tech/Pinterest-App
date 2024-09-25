import {Schema,Document} from 'mongoose';

export const PictureSchema = new Schema({
    url:String,
    title:[String],
    likes: {type:Number,default:0},
    likedBy:[{type:Schema.Types.ObjectId,ref:"User"}],
    createdBy:{type:Schema.Types.ObjectId,ref:"User"},
    followers: [{type: Schema.Types.ObjectId, ref: "User"}],
    tags: { type: [String], default: [] },
});

export interface Picture extends Document{
    url:string;
    title:string[];
    likes:number;
    likedBy:string[];
    createdBy:string;
    followers: string[];
    tags: string[];
}
