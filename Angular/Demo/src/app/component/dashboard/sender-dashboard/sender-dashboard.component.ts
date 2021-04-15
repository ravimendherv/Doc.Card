import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sender-dashboard',
  templateUrl: './sender-dashboard.component.html',
  styleUrls: ['./sender-dashboard.component.scss']
})
export class SenderDashboardComponent implements OnInit {

  isExpanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
