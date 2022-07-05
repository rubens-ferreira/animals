import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  SetLocalStorageItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  GetLocalStorageItem(key: string): string | null {
    return localStorage.getItem(key);
  }
}
