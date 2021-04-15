import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receiver-dashboard',
  templateUrl: './receiver-dashboard.component.html',
  styleUrls: ['./receiver-dashboard.component.scss']
})
export class ReceiverDashboardComponent implements OnInit {

  isExpanded: boolean = false;
  notify = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

}
