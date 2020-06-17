import { Component, OnInit, ViewChild } from '@angular/core';
import { UiTableHeader } from 'app/core/ui/ui-table/ui-table.references';

@Component({
  selector: 'assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  public assets: Array<any>;
  public tableHeaders: Array<UiTableHeader<any>>;

  @ViewChild('imageTemplate', { static: true }) private _imageTemplate;
  @ViewChild('assetTemplate', { static: true }) private _assetTemplate;
  @ViewChild('priceTemplate', { static: true }) private pricetemplate;

  constructor() { }

  ngOnInit() {

    this.tableHeaders = [

      { key: 'image', label: 'Image', template: this._imageTemplate, autoSize: true },
      { key: 'name', label: 'Name', template: this._assetTemplate },
      { key: 'nr', label: 'Serial Number' },
      { key: 'price', label: 'Price', template: this.pricetemplate },
      { key: 'date', label: 'Assigned since' }
    ];

    this.assets = [
      {
        image: 'https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-81833003/fee_786_587_png/APPLE-MacBook-Pro-13%22-256-GB-Intel-Core-i5-Space-Grey-%28MUHP2FN-A%29',
        name: 'APPLE MacBook Pro A1706',
        nr: 'C02VM0FFFF',
        price: 1699.98,
        date: new Date().toDateString()
      },
      {
        image: 'https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-79416162/fee_786_587_png/APPLE-Magic-Keyboard-met-numeriek-toetsenblok-Space-Gray-AZERTY-FR-%28MQ052F-A%29',
        name: 'Wireless - Azerty Keyboard MQ052F/A',
        nr: 'C02VM0FFFF',
        price: 149.89,
        date: new Date().toDateString()
      },
      {
        image: 'https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-79415951/fee_786_587_png/APPLE-Magic-Mouse-2-Space-Gray-%28MRME2Z-A%29',
        name: 'Magic Mouse A1657',
        nr: 'C02VM0FFFF',
        price: 99.98,
        date: new Date().toDateString()
      },
      {
        image: 'https://assets.mmsrg.com/isr/166325/c1/-/pixelboxx-mss-82129884/fee_325_225_png/APPLE-USB%E2%80%91C---Lightning-kabel-1-m-%28MQGJ2ZM-A%29',
        name: 'USB C lightning power adapter A1718',
        nr: 'C02VM0FFFF',
        price: 79.98,
        date: new Date().toDateString()
      }
    ];
  }
}