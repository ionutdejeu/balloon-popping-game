export const StorageKey = 'bubblestorage';
export interface StorageData { 
    currentLevel:number;
}
export class LocalStorageManager{
    // load local data
  loadStorage() {
    const charts = localStorage.getItem(StorageKey);
    return JSON.parse(charts);
  }

  // save local data
  saveStorage(val) {
    const charts = JSON.parse(localStorage.getItem(StorageKey)) as StorageData;
    localStorage.setItem(StorageKey, JSON.stringify(charts));
  }
}