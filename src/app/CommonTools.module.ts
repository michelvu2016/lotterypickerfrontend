import {NgModule} from '@angular/core';
import {StringArrayToStringPipe} from './tools/string-array-to-string.pipe';


@NgModule({
   declarations: [
        StringArrayToStringPipe
   ],
   imports: [],
   exports: [
       StringArrayToStringPipe
   ]
})
export class CommonToolsModule {

}
