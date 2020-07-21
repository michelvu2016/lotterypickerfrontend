import { Action, createAction, props } from '@ngrx/store';

export interface HighlightState {
  highlightCurrentDrawnNumber: boolean;
}

export const highlightCurrDrawnNumbersAction = 
    createAction('[Current_Drawn_Number Component] UpdateHighLightFlag',
          props<HighlightState>());

// export class HighlightCurrDrawnNumbersAction implements Action {
//   type: string;
//   highlightCurrentDrawnNumber: boolean;
    
// }
