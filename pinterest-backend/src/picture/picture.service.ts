import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Picture } from './picture.schema';

@Injectable()
export class PictureService {
  constructor(@InjectModel('Picture') private pictureModel: Model<Picture>) {}

  async createPicture(url: string, createdBy: string): Promise<Picture> {
    const picture = new this.pictureModel({ url, createdBy });
    return picture.save();
  }

  async getAllPictures(): Promise<Picture[]> {
    return this.pictureModel.find().exec();
  }

  async seed(pictures: any[]): Promise<any> {
    return await this.pictureModel.insertMany(pictures); // Insert dummy pictures into MongoDB
  }

  async likePicture(id: string, userId: string): Promise<Picture> {
    try {
      const picture = await this.pictureModel.findById(id);
      if (!picture) {
        throw new Error(`Picture with id ${id} not found`);
      }
  
      if (!picture.likedBy.includes(userId)) {
        picture.likes++;
        picture.likedBy.push(userId);
        return picture.save();
      }
  
      return picture;
    } catch (error) {
      console.error('Error liking picture:', error);
      throw new Error('Unable to like picture');
    }
  }
  
  async addTag(id: string, tag: string): Promise<Picture> {
    const picture = await this.pictureModel.findById(id);
    if (!picture.tags.includes(tag)) {
      picture.tags.push(tag);
      return picture.save();
    }
    return picture; 
  }
  async followPicture(id: string, userId: string): Promise<{ followersCount: number }> {
    const picture = await this.pictureModel.findById(id);
    if (!picture.followers.includes(userId)) {
      picture.followers.push(userId);
      await picture.save();
    }
    return { followersCount: picture.followers.length };
  }

  async unfollowPicture(id: string, userId: string): Promise<{ followersCount: number }> {
    const picture = await this.pictureModel.findById(id);
    if (picture.followers.includes(userId)) {
      picture.followers = picture.followers.filter(followerId => followerId !== userId);
      await picture.save();
    }
    return { followersCount: picture.followers.length };
  }
  
}
