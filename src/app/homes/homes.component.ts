import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
})
export class HomesComponent implements OnInit {
  homeTypeDropdownOpen = false;
  dateTypeDropdownOpen = false;

  currentHomeTypeFilters = [];
  currentDateTypeFilters = [];

  homes$ = this.dataService.homes$;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const homeTypeFilters = params['home-type'] || [];
      const dateTypeFilters = params['date-type'] || [];
      this.dataService.loadHomes(homeTypeFilters, dateTypeFilters);
      if (params['home-type']) {
        this.currentHomeTypeFilters = homeTypeFilters;
      } else if (params['date-type']) {
        this.currentDateTypeFilters = dateTypeFilters;
      }
    });
  }

  homeTypeFilterApplied($event) {
    this.homeTypeDropdownOpen = false;
    this.router.navigate(['homes'], { queryParams: { 'home-type': $event } });
  }

  dateTypeFilterApplied($event) {
    console.log('1');
    this.dateTypeDropdownOpen = false;
    this.router.navigate(['homes'], { queryParams: { 'date-type': $event } });
  }
}
