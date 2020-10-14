import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    // service.create({
    //   title: "Test Movie",
    //   genres: ['test'],
    //   year: 2020,
    // });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test GetAll
  describe("getAll", () => {

    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })

  })

  // Test GetOne
  describe("getOne", () => {
    it("should return a movie" ,() => {
      // Create Service For Test
      service.create({
      title: "Test Movie",
      genres: ['test'],
      year: 2020,
    });
    const movie = service.getOne(1);
    expect(movie).toBeDefined();
    expect(movie.id).toEqual(1);
  })
  it("should throw 404 error", () => {
    try {
      // NotFoundException
      service.getOne(999);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(e.message).toEqual('Movie with Id 999 not found.');
    }
  })
});

  // Test DeleteOne
  describe("deleteOne", () => {

    it('delete a movie', () => {
      // Create Service For Test
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2020,
    });
    const beforeDelete = service.getAll().length;
    service.deleteOne(1);
    const afterDelete = service.getAll().length;

    expect(afterDelete).toBeLessThan(beforeDelete);
  });
  it("should return a 404", () => {
    try {
      service.deleteOne(999);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  })
});

  // Test Create
  describe("create", () => {

    it("should create a movie", () => {

      const beforeCreate = service.getAll().length;

      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2020,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  });

  // Test Update
  describe("update", () => {
    it("should create a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2020,
      });
      service.update(1, {title: "Updated Title"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Updated Title");
  });
  it("should return a 404", () => {
    try {
      service.update(999, {title: "Updated Title"});
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  })
});


});
