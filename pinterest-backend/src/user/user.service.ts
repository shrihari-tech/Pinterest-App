import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async followUser(followerId: string, followeeId: string): Promise<User> {
    const follower = await this.userModel.findById(followerId);
    const followee = await this.userModel.findById(followeeId);
    
    if (!follower.following.includes(followeeId)) {
      follower.following.push(followeeId);
      followee.followers.push(followerId);
      await follower.save();
      await followee.save();
    }

    return follower;
  }
}
