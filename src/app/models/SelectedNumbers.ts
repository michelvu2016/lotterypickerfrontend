import { Store } from '@ngrx/store';


export class SelectedNumbers {

  constructor(private _ticketId: String, private _numbers: String[],
    private _highlight: boolean)
  {

  }

  public get numbers(): String[] {
    return this._numbers;
  }

  public set numbers(value: String[]) {
    this._numbers = value;
  }

  public get shouldHighlightNumbers(): boolean {
    return this._highlight;
  }

  public set highlightNumbers(value: boolean) {
    this._highlight = value;
  }

  public set ticketId(value: String) {
    this._ticketId = value;
  }

  public get ticketId(): String {
    return this._ticketId;
  }
}
