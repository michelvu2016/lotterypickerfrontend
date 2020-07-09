import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {stringify} from 'querystring';
import {LastDrawnNumber} from '../models/LastDrawnNumber';
import * as _ from 'lodash';
import { AsynchProcessExecutorService } from './AsynchProcessExecutor.service';
import { environment } from '../../environments/environment';


const drawnNumberHistoryUrl = environment.baseUrl+'/api/lastDrawnNumbers';
const postDrawnNumbersUrl = environment.baseUrl +'/api/lastDrawnTickets';
const analyzedPastDrawnNumberBaseUrl = environment.baseUrl +'/api/getAnalyzedDrawnNumbers';

const username = 'mvu';
const password = "cel123";

const numberOfAttempts = 3;

const TEST_POST = '{\n' +
  '\t"date":"May 18, 2019",\n' +
  '\t"seqNum":"3352",\n' +
  '\t"numbers":["36","28","22","14","27"],\n' +
  '\t"mega":"20"\n' +
  '}';

@Injectable()
export class DataService {

   constructor(private http: HttpClient, private asynchExecutor: AsynchProcessExecutorService) {}


   getLastResults_xx(resultCallback, errorCallback) {
     const data = this.http.get(environment.baseUrl +'/data');
       data.subscribe({
          next(value) { resultCallback(value); },
          error(error) { errorCallback(error); },
          complete() { console.log('data load complete'); }
       });
       return data;
   }

  getLastResults_y(resultCallback, errorCallback) {
    this.http.get(environment.baseUrl +'/data')
      .pipe(map(data => {
          resultCallback(data);
        }),
      catchError(err => of({})))

      .subscribe();


  }

  /**
   *
   * @param gameName
   * @param resultCallback
   * @param errorCallback
   */
  getLastResults(gameName, resultCallback, errorCallback) {
     const url = `${analyzedPastDrawnNumberBaseUrl}/${gameName}`;
     this.http.get<LastDrawnNumber[]>(url, {headers: this.createBasicAuthHeader('mikevu', 'password')})
      .pipe(map(data => {
          resultCallback(data);
        }),
        catchError(err => of({})))

      .subscribe();


  }

  /**
   *
   * @param gameName
   * @param resultCallback
   * @param errorCallback
   */
  getLastResults_asynch(gameName, resultCallback, errorCallback) {

    this.asynchExecutor.executeFunctionAsynch((baton) => {
       //console.log('>>>Business function invoked with baton:', baton);

       const params = new HttpParams({
        fromString: `baton=${baton}`
      });

       return new Promise((resolve, reject) => {

         const url = `${analyzedPastDrawnNumberBaseUrl}/${gameName}`;
         this.http.get<LastDrawnNumber[]>(url, {params, headers: this.createBasicAuthHeader(username, password)}   )
           .pipe(map(data => {
               resolve(data);
             }),
             catchError(err => of({})))

           .subscribe();

       });
    }).then((data) => resultCallback(JSON.parse(data) ),
      (err) => errorCallback(err));
  }



  /**
   * Return the list of drawn numbers
   * @param numberOfNumbers
   * @param lotteryTypeId
   */
  getDrawnNumbers(numberOfNumbers: number, lotteryTypeId: string) {
    //console.log('>>>Invoke the getDrawnNumberWithAsync');
    return this.getDrawnNumberWithAsync(numberOfNumbers, lotteryTypeId);
  }

  /**
      *
      * @param numberOfNumbers
        * @param lotteryTypeId
        */
        getDrawnNumberWithAsync(numberOfNumbers: number, lotteryTypeId: string) {

          return new Promise((resolve, reject) => {
            let baton = null;
          let count = 0;
          const oper = (baton) => {
            //console.log('>>>Invoke the getDrawnNumbers_internal ');
            this.getDrawnNumbers_internal(numberOfNumbers, lotteryTypeId, baton,
              (data) => { //Success
              //  console.log('>>>Response status:', data.status);
                if (data.status === 'success') {
                  resolve(data.data);

                } else if (data.status === 'failure') {
                  reject({status: 'No data available'});
                } else {
                  const nextBaton = data.baton;
                  count++;
                  //console.log('>>>count:', count);
                  if (count < numberOfAttempts) {
                    //console.log('>>>Re invoke the operation...');
                    oper(nextBaton);
                  } else {reject({status: 'Unresolved operation'});

                  }

                }
              },
              (err) => { //Error
                reject(err);
              }
            );
          }
            oper(baton); //Invoke the transaction
       });
  }

  /**
   * Invoke the service and return the promise to the result
   * @param numberOfNumbers
   */
  getDrawnNumbers_internal(numberOfNumbers: number, lotteryTypeId: string, baton,  sucessFunc, errorFunc ) {


      const params = new HttpParams({
        fromString: `numLines=${numberOfNumbers}&baton=${baton}`
      });

      const thisObj = this;

      const url = `${drawnNumberHistoryUrl}/${lotteryTypeId}`;


      thisObj.http.get(url, {params, headers: this.createBasicAuthHeader(username, password)})
          .subscribe({
             next(data) {sucessFunc(data); },
             error(err) { errorFunc(err); },
             complete() {}
          });




   }

  /**
   * Submit the data to the server
   * @param lastDrawnNumber
   */
  submitDrawnNumbers(lastDrawnNumber: LastDrawnNumber[], lotteryTypeId: string) {

    const thisObj = this;


    const resultPromise = new Promise((resolve, reject) => {

      let headers = this.createBasicAuthHeader(username, password);
      headers = headers.append('Content-type', 'application/json');

      const httpOptions = {
          headers
      }

      //console.log(">>>>Headers for put:",headers);

      const dataToPost = JSON.stringify(lastDrawnNumber);


      const url = `${postDrawnNumbersUrl}/${lotteryTypeId}`;

      thisObj.http.put(url,
        dataToPost

        , httpOptions)
        .subscribe({
          next(data) {resolve(data); },
          error(err) { reject(err); },
          complete() {}
        });
    });


    return resultPromise;
  }


  submitDrawnNumbersAsJoson(lastDrawnNumber: string, lotteryTypeId: string) {

    const thisObj = this;


    const resultPromise = new Promise((resolve, reject) => {

      let headers = this.createBasicAuthHeader(username, password);
      headers = headers.append('Content-type', 'application/json');

      const httpOptions = {
        headers
      }

      //console.log(">>>>Headers for put:",headers);

      const dataToPost = lastDrawnNumber;
        //JSON.stringify(lastDrawnNumber);


      const url = `${postDrawnNumbersUrl}/json/${lotteryTypeId}`;

      thisObj.http.put(url,
        dataToPost

        , httpOptions)
        .subscribe({
          next(data) {resolve(data); },
          error(err) { reject(err); },
          complete() {}
        });
    });


    return resultPromise;
  }



  /**
   * Return the header for Basic Authorization
   */
  createBasicAuthHeader(username: string, password: string): HttpHeaders {

    return new HttpHeaders({
       Authorization: 'Basic ' + btoa(username + ':' +  password)
    });

  }

  /**
   *  Accessing the Cal Lotto api:www.calottery.com//api/DrawGameApi/DrawGamePastDrawResults/{GamePId}/1/20
   *
   *  Game id:
   *  10 - Fantasy
   *  8 - SuperLotto
   *  12 - Powerball
   *  15 - Mega Million
    */

   retrieveGameResultFor(gameId, sucessFunc, errorFunc) {
    const url = `http://www.calottery.com/api/DrawGameApi/DrawGamePastDrawResults/10/1/20`;


    this.http.jsonp(url, 'JSONP_CALLBACK')
      .subscribe({
        next(data) {sucessFunc(data); },
        error(err) { errorFunc(err); },
        complete() {}
      });

  }


}

