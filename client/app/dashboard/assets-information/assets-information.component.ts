import { Component, OnInit } from '@angular/core';
import {AssetService} from "../../core/services/asset.service"
import {Asset} from "../../core/models/asset.interface";

@Component({
  selector: 'assets-information',
  templateUrl: './assets-information.component.html',
  styleUrls: ['./assets-information.component.scss']
})
export class AssetsInformationComponent implements OnInit {

  public assetArray: Array<Asset>;

  constructor(private assetService: AssetService) { }

  ngOnInit() {
    this.assetArray = this.assetService.getAll();
  }
}
