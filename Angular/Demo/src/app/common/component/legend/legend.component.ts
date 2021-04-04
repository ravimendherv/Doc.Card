import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

  @Input() legendText: string = '';
  @Input() legendContainerClass: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
