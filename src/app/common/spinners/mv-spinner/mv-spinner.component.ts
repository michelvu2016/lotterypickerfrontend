import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {Spinner} from './spinner';


@Component({
    selector: 'app-mv-spinner',
    template: `
           <div id="mvspinner123">
           
           </div>
    `,
    styleUrls: []
})
export class MVSpinnerComponent implements OnInit, AfterViewInit {

    spinner: any;

    @Input()
    parentElm: ElementRef;

    ngOnInit() {

    }

    ngAfterViewInit() {
        const opts = {
            lines: 13, // The number of lines to draw
            length: 38, // The length of each line
            width: 17, // The line thickness
            radius: 45, // The radius of the inner circle
            scale: 1, // Scales overall size of the spinner
            corners: 1, // Corner roundness (0..1)
            speed: 1, // Rounds per second
            rotate: 0, // The rotation offset
            animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#ffffff', // CSS color or array of colors
            fadeColor: 'transparent', // CSS color or array of colors
            top: '50%', // Top position relative to parent
            left: '50%', // Left position relative to parent
            shadow: '0 0 1px transparent', // Box-shadow for the lines
            zIndex: 2000000000, // The z-index (defaults to 2e9)
            className: 'spinner', // The CSS class to assign to the spinner
            position: 'absolute', // Element positioning
          };
          
          console.log(">>>>Parent Elem:", this.parentElm);
          const target = this.parentElm ? this.parentElm : document.getElementById('mvspinner123');
          console.log(">>>target:", target);
          this.spinner = new Spinner(opts).spin(target);
          
          
        }

        stop() {
            console.log(">>>>Spinner stop called");
            this.spinner.stop();
        }
}
