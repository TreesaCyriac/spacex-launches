import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import * as _ from 'lodash';

import { ProgramsService } from './../../services/programs.service';
import { Options } from './../../app.config';

@Component({
  selector: 'app-launch-programs',
  templateUrl: './launch-programs.component.html',
  styleUrls: ['./launch-programs.component.scss']
})
export class LaunchProgramsComponent implements OnInit {

  private  _ngUnsubscriber: Subject<any> = new Subject<any>();

  public allPrograms: Array<any> = [];
  public launchYears: any[] = [];
  public filterWrapper: any = {
    launch_year: null,
    launch_success: null,
    land_success: null
  };
  public landOptionsList: any[] = _.cloneDeep(Options);
  public launchOptionsList: any[] = _.cloneDeep(Options);
  public loading: boolean = false;

  constructor(
    private _pgmSvc: ProgramsService,
  ) {
    let currYear = new Date().getFullYear();
    let year = 2006;
    while(year <= currYear){
      this.launchYears.push({value: year, selected: false});
      year++;
    }
  }

  ngOnInit(): void {
    this.getPrograms();
  }

  getPrograms() {
    this.loading = true;
    let params = {};
    params['limit'] = 100;
    if(this.filterWrapper.launch_year !== null) params['launch_year'] = _.cloneDeep(this.filterWrapper.launch_year);
    if(this.filterWrapper.launch_success !== null) params['launch_success'] = _.cloneDeep(this.filterWrapper.launch_success);
    if(this.filterWrapper.land_success !== null) params['land_success'] = _.cloneDeep(this.filterWrapper.land_success);
    this._pgmSvc.getAllPrograms(params).pipe(takeUntil(this._ngUnsubscriber)).subscribe(data => {
      this.allPrograms = _.cloneDeep(data);
      this.loading = false;
    },(error)=>{
      this.loading = false;
    })
  }

  onYearClick(pYear: any) {
    pYear.selected = !pYear.selected;
    this.filterWrapper.launch_year = pYear.selected ? pYear.value : null;
    this.getPrograms();
  }
  
  onLaunchClick(pOption: any) {
    pOption.selected = !pOption.selected;
    this.filterWrapper.launch_success = pOption.selected ? pOption.value : null;
    this.getPrograms();
  }

  onLandingClick(pOption: any) {
    pOption.selected = !pOption.selected;
    this.filterWrapper.land_success = pOption.selected ? pOption.value : null;
    this.getPrograms();
  }

  ngOnDestroy() {
    this._ngUnsubscriber.next();
    this._ngUnsubscriber.complete();
  }

}
