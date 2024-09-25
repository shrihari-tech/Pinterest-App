import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';
import { PictureSchema } from './picture.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Picture', schema: PictureSchema }])],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}
