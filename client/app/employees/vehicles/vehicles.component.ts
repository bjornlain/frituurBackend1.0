import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { VehicleService } from '../../core/services/vehicle.service';
import { Vehicle } from '../../core/models/vehicle.interface';
import { UiTableHeader } from '../../core/ui/ui-table/ui-table.references';

@Component({
  selector: 'vehicles',
  styleUrls: ['./vehicles.component.scss'],
  templateUrl: './vehicles.component.html',
})
export class VehiclesComponent implements OnInit {
  @ViewChild('specsTemplate', { static: true }) public specsTemplate: TemplateRef<Vehicle>;
  @ViewChild('carImageTemplate', { static: true }) public carImageTemplate: TemplateRef<Vehicle>;
  @ViewChild('ownerTemplate', { static: true }) public ownerTemplate: TemplateRef<Vehicle>;

  public dataset: Vehicle[];
  public data: Vehicle[] = [];
  public headers: UiTableHeader<Vehicle>[];
  public currentDataset = 1;
  public brands: string[];
  public brandFilter: string;

  constructor(private vehicleService: VehicleService) {}

  public ngOnInit(): void {
    // debugger
    this.headers = [
      { key: 'carImage', template: this.carImageTemplate },
      { key: 'specs', template: this.specsTemplate },
      { key: 'owner', template: this.ownerTemplate },
    ];

    this.brands = this.vehicleService.getBrands();
    this.dataset = this.vehicleService.getAll();
  }

  public loadData(): void {
    if (this.dataset) {
      this.currentDataset += 1;
      this.data = this.dataset.slice(0, this.currentDataset * 10);
    }
  }

  public filterBrand(brand: string) {
    if (this.brandFilter == brand) {
      this.brandFilter = null;
      this.dataset = this.vehicleService.getAll();
      return;
    }
    this.brandFilter = brand;
    this.dataset = this.vehicleService.getAll().filter(vehicle => vehicle.brand.toUpperCase() == brand);
    this.currentDataset = 1;
  }
}
