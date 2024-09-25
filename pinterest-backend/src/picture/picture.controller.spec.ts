import { Test, TestingModule } from '@nestjs/testing';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';

const mockPictureService = {
  getAllPictures: jest.fn().mockResolvedValue([
    {
      _id: 'someId',
      url: 'https://example.com/sunset.jpg',
      title: 'Sunset',
      likes: 0,
      likedBy: [],
    },
  ]),
};

describe('PictureController', () => {
  let controller: PictureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PictureController],
      providers: [{ provide: PictureService, useValue: mockPictureService }],
    }).compile();

    controller = module.get<PictureController>(PictureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
