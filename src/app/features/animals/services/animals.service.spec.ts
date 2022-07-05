import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { Mock, provideMagicalMock } from 'test.helper';
import { AnimalService } from './animals.service';
import { AnimalView } from '../models/animal-view.model';

describe('AnimalService', () => {
  let service: AnimalService;
  let http: Mock<HttpClient>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimalService, provideMagicalMock(HttpClient)],
    });

    service = TestBed.inject(AnimalService);
    http = TestBed.get(HttpClient);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  const animal = { id: 1, name: 'name', image: 'image', _id: 1 };
  const since = 0;
  const page = 30;
  const message = 'error message';

  it('should find all animals', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const animals: AnimalView[] = [animal];
      const response$ = cold('-a|', { a: animals });
      http.get.and.returnValue(response$);
      const result = service.FindAllAnimals(since, page);

      expectObservable(result).toBe('-b|', { b: animals });
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('should fail to fetch animals', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const response$ = cold('#', undefined, message);
      http.get.and.returnValue(response$);
      const result = service.FindAllAnimals(since, page);
      const unsub = '-!';

      expectObservable(result, unsub).toBe('#', undefined, message);
    });
  });
});
