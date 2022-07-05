import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  const localStorageMock = (() => {
    let store: any = {};
    return {
      getItem(key: any) {
        return store[key] || null;
      },
      setItem(key: any, value: any) {
        store[key] = value.toString();
      },
      removeItem(key: any) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();

  const descriptor = Object.getOwnPropertyDescriptor(window, 'localStorage') ?? {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });

    service = TestBed.inject(StorageService);
    window.localStorage.clear();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  it('should set a session storage item', () => {
    const spy = spyOn(window.localStorage, 'setItem').and.callThrough();
    const key = 'key';
    const value = 'value';
    service.SetLocalStorageItem(key, value);
    expect(spy).toHaveBeenCalledWith(key, value);
  });

  it('should get a session storage item', () => {
    const spy = spyOn(window.localStorage, 'getItem').and.callThrough();
    const key = 'key';
    service.GetLocalStorageItem(key);
    expect(spy).toHaveBeenCalledWith(key);
  });

  afterEach(() => Object.defineProperty(window, 'localStorage', descriptor));
});
