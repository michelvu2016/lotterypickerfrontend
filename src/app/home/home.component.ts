import { Component, OnInit } from '@angular/core';
import {DataService} from '../tools/data-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }


  runTest() {
    //console.log('runing test now...');

    this.dataService.retrieveGameResultFor('10', (data) => {
      // console.log("Data:", data);
    }, (error) => {
        //console.log('Error:', error);
    });

  }

}
