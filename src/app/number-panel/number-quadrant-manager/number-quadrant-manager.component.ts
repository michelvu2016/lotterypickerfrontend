import { Component } from '@angular/core';


@Component({
    selector: 'app-number-quadrant-manager',
    templateUrl: './number-quadrant-manager.component.html',
    styleUrls: ['./number-quadrant-manager.component.css']
})
export class NumberQuadrantManagerComponent {

    toggleDrawer(draw) {
        draw.toggle();
    }
}