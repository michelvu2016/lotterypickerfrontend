import {throwInvalidRefError} from '@angular/core/src/render3/styling/util';
import {interval} from 'rxjs';
import {delay, map, mapTo, take, timeout} from 'rxjs/operators';



export class AsynchProcessExecutorService {


  /**
   *
   * @param numberOfNumbers
   * @param lotteryTypeId
   */
  executeFunctionAsynch(func: (baton: any) => Promise<any> ): Promise<any> {

    return new Promise((resolve, reject) => {
      let baton = null;
      let count = 0;

      const oper = (baton) => {
        //console.log(">>>Invoke foreign function");
        func(baton).then((resp) => {
          console.log('>>>Receive response:', resp);
            if (resp.status === 'pending') {
                const myBaton = resp.baton;
          //      console.log('>>>Call the function again with baton:', myBaton);
                count++;
                if (count < 3 ) {
                  interval(2000).pipe(take(1)).subscribe(
                    (val) => {oper(myBaton)}
                  );
                  //oper(myBaton);
                } else {
                   reject("No data available");
                }

            } else if(resp.status === 'success') {
              resolve(resp.data);
            } else {
               reject('No data available');
            }
          }

        ).catch((err) => {

          });
      }
      oper(baton); //Invoke the transaction
    });
  }

  //Sample call

  sampleCall() {

      const result =  {status: '', data: null};

      this.executeFunctionAsynch( () => {
        return new Promise((resolve, reject) => {
          result.data = 'My house is a paradise';
          result.status = 'success';
          resolve (result);
        });
     });
  }

}
