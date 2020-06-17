import { Injectable } from '@angular/core';
import { Timeoverview } from '../models/timeoverview.interface';

@Injectable({
  providedIn: 'root',
})
export class TimeOverviewService {
  public getEmployees(): string[] {
    return ['Lopez James', 'Perboom Andre', 'Buurman Bran', 'Baeten Tim'];
  }
  public getAll(): Array<Timeoverview> {
    return [
      {
        id: '0001',
        date: new Date(),
        description: 'beschrijving1',
        worked: 32,
        user: {
          id: 'user1',
          avatar: 'https://i.pravatar.cc/50?1',
          deleted: false,
          email: 'email1',
          name: 'Jan Kriekels',
        },
      },
      {
        id: '0002',
        date: new Date(),
        description: 'beschrijving2',
        worked: 28,
        user: {
          id: 'user2',
          avatar: 'https://i.pravatar.cc/50?2',
          deleted: false,
          email: 'email2',
          name: 'Flipke bollen',
        },
      },
      {
        id: '0003',
        date: new Date(),
        description: 'beschrijving3',
        worked: 24,
        user: {
          id: 'user3',
          avatar: 'https://i.pravatar.cc/50?3',
          deleted: false,
          email: 'email3',
          name: 'Bjorn Massoels',
        },
      },
      {
        id: '0004',
        date: new Date(),
        description: 'beschrijving4',
        worked: 2,
        user: {
          id: 'user4',
          avatar: 'https://i.pravatar.cc/50?4',
          deleted: false,
          email: 'email4',
          name: 'Bert Massen',
        },
      },
    ];
  }
}
