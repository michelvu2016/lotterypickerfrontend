import {AfterContentInit, AfterViewInit, Component} from '@angular/core';
import {NumberPanelService} from './number-panel/number-panel.service';
import {SelectedNumberService} from './selected-number-manager/selected-number-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SelectedNumberService]
})
export class AppComponent implements AfterViewInit{
  title = 'lottery-picker';

  constructor(private numberPanelService: NumberPanelService) {

  }
  ngAfterViewInit(): void {


  }

}
