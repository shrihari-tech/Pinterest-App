import { Test, TestingModule } from '@nestjs/testing';
import { PictureService } from './picture.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Picture } from './picture.schema';

const mockPicture = {
  _id: 'someId',
  url: 'https://example.com/sunset.jpg',
  title: 'Sunset',
  likes: 0,
  followers: ['user1'],
  likedBy: [],
  save: jest.fn().mockResolvedValue(true),
};

const mockPictureModel = {
  findById: jest.fn().mockResolvedValue(mockPicture),
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue([mockPicture]),
  })),
  create: jest.fn(),
};

describe('PictureService', () => {
  let service: PictureService;
  let model: Model<Picture>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PictureService,
        { provide: getModelToken('Picture'), useValue: mockPictureModel },
      ],
    }).compile();

    service = module.get<PictureService>(PictureService);
    model = module.get<Model<Picture>>(getModelToken('Picture'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all pictures', async () => {
    const pictures = await service.getAllPictures();
    expect(pictures).toEqual([mockPicture]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should like a picture', async () => {
    const result = await service.likePicture('someId', 'user2');

    // Simulate the like operation
    mockPicture.likes = 1;
    mockPicture.likedBy.push('user2');

    expect(result.likes).toBe(1);
    expect(result.likedBy.includes('user2')).toBeTruthy();
    expect(mockPicture.save).toHaveBeenCalled();
  });
});
