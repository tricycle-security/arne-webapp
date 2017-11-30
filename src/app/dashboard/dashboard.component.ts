import { Component, OnInit } from '@angular/core';
import { Bhv } from '../bhv';
import { HeroService } from '../hero.service';
import { BhvService } from '../bhv.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  hbvs: Bhv[] = [];

  constructor(private bhvService: BhvService) { }

  ngOnInit() {
    this.getBhvs();
  }

  getBhvs(): void {
    this.bhvService.getBhvs().subscribe(hbvs => this.hbvs = hbvs.slice(1, 5));
  }
}