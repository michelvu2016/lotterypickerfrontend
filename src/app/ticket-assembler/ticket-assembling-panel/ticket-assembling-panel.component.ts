import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-assembling-panel',
  templateUrl: './ticket-assembling-panel.component.html',
  styleUrls: ['./ticket-assembling-panel.component.css']
})
export class TicketAssemblingPanelComponent implements OnInit {

  numberInTicket = ["03", "11", "45","27","13"];
  
  constructor() { }

  ngOnInit(): void {
  }

}
