import { Injectable } from '@angular/core';
import { Asset } from '../models/asset.interface';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  public getAll(): Asset[] {
    return [
      {
        id: '0001',
        description: 'beschrijving1',
        inUseByEmployees: 18,
        name: 'APPLE  MacBook Pro',
        serial_number: 'A1706',
        avatar: 'https://cdn2.vectorstock.com/i/1000x1000/90/21/grunge-green-example-word-with-star-icon-round-vector-25689021.jpg',
      },
      {
        id: '0002',
        description: 'beschrijving2',
        inUseByEmployees: 16,
        name: 'Wireless - Azerty',
        serial_number: 'MQ052F/A',
        avatar: 'https://cdn2.vectorstock.com/i/1000x1000/90/21/grunge-green-example-word-with-star-icon-round-vector-25689021.jpg',
      },
      {
        id: '0003',
        description: 'beschrijving3',
        inUseByEmployees: 14,
        name: 'Magic Mouse',
        serial_number: 'A1657',
        avatar: 'https://cdn2.vectorstock.com/i/1000x1000/90/21/grunge-green-example-word-with-star-icon-round-vector-25689021.jpg',
      },
      {
        id: '0004',
        description: 'beschrijving4',
        inUseByEmployees: 2,
        name: 'USB C cable',
        serial_number: 'USB C',
        avatar: 'https://cdn2.vectorstock.com/i/1000x1000/90/21/grunge-green-example-word-with-star-icon-round-vector-25689021.jpg',
      },
    ];
  }
}
