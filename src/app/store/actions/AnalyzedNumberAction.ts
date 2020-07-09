import { Action } from '@ngrx/store';

export class AnalyzedNumberAction implements Action {
    type: string;
    analyzedNumber: Set<String>[];
}
