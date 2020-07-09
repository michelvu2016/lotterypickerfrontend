export class LastDrawnNumber {



  // tslint:disable-next-line:variable-name
   constructor(private _date: string, private _seqNum: string, private _numbers: string[], private _mega: string) {

   }


   public get date(): string {
     return this._date;
   }

   public get seqNum(): string {
     return this._seqNum;
   }

   public get numbers(): string[] {
     return this._numbers;
  }

  public get mega(): string {
     return this._mega;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  public set date(value: string) {
    this._date = value;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  public set seqNum(value: string) {
    this._seqNum = value;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  public set numbers(value: string[]) {
    this._numbers = value;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  public set mega(value: string) {
    this._mega = value;
  }

}
