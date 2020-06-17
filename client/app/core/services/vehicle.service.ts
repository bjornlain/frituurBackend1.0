import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.interface';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  getBrands(): string[] {
    return ['AUDI', 'BMW', 'VOLVO', 'JAGUAR', 'PORSCHE', 'MASERATI'];
  }

  getAll(): Array<Vehicle> {
    return [
      {
        id: '593707516865cd044e87ef00',
        avatar: 'https://www.greenncap.com/wp-content/uploads/Volvo_XC40-480x320.png',
        brand: 'VOLVO',
        chassis_number: '123',
        co2_nedc: 123,
        co2_wltp: 123,
        color: 'White',
        description: 'SUV',
        fuel: 'Diesel',
        hp: 150,
        initial_registration: new Date(),
        kind: 'car',
        model: 'XC40',
        owner: 'Stef Leurs',
        pictures: [],
        plate: '1-BUS-001',
        price: 15000,
        vendor: 'Volvo Turnhout',
        contract: {
          date: new Date(),
          initial_amount: 123,
          kind: 'foo',
          monthly_amount: 123,
          residual_value: 123,
          runtime: 123,
          supplier: '',
        },
      },
      {
        id: '235707516865cd044e87ef00',
        avatar: 'https://cdn.drivek.it/configurator-icon/cars/gb/400/VOLVO/V60/32165_WAGON-5-DOORS/volvo-v60-2018-side-view.png',
        brand: 'VOLVO',
        chassis_number: '123',
        co2_nedc: 123,
        co2_wltp: 123,
        color: 'Grey',
        description: 'Break',
        fuel: 'Diesel',
        hp: 150,
        initial_registration: new Date(),
        kind: 'car',
        model: 'v60',
        owner: 'Kevin Gerits',
        pictures: [],
        plate: '1-KEV-001',
        price: 16000,
        vendor: 'Volvo Hasselt',
        contract: {
          date: new Date(),
          initial_amount: 123,
          kind: 'foo',
          monthly_amount: 123,
          residual_value: 123,
          runtime: 123,
          supplier: '',
        },
      },

      {
        id: '123707516865cd044e87ef00',
        avatar:
          'https://files.porsche.com/filestore/image/multimedia/none/970-g2-tu-modelimage-sideshot/model/d9310d3f-d7e2-11e6-a122-0019999cd470/porsche-model.png',
        brand: 'PORSCHE',
        chassis_number: '123',
        co2_nedc: 123,
        co2_wltp: 123,
        color: 'Black',
        description: 'Yacht',
        fuel: 'Hybrid',
        hp: 5000,
        initial_registration: new Date(),
        kind: 'car',
        model: 'Panamera',
        owner: 'Bart Lenaerts',
        pictures: [],
        plate: '1-BAR-001',
        price: 5,
        vendor: 'Porsche center Hasselt',
        contract: {
          date: new Date(),
          initial_amount: 123,
          kind: 'foo',
          monthly_amount: 123,
          residual_value: 123,
          runtime: 123,
          supplier: '',
        },
      },
    ];
  }
}
