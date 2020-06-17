export class LocalStorageService {
  public static getItem<T>(key: string, defaultValue?: T): T {
    try {
      return JSON.parse(localStorage.getItem(key) || String(defaultValue));
    } catch {
      return defaultValue;
    }
  }

  public static setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
