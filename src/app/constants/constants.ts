export const SAVE_NUMBER = 'SAVE_NUMBER';
export const UPDATE_HIGHLIGHT_CURR_NUMBERS = "UPDATE_HIGHLIGHT_CURR_NUMBERS";
export const INSERT_SELECTED_NUMBERS = "INSERT_SELECTED_NUMBERS";

export type NavigationEventTriggerConfig = {
    menuName: string,
    eventName: string, 
}

export const  ticketNumberHighLightCssClass : (number) => string = (numberIndex) => {
   return  "drawn_number_background drawn_number_in_panel drawnNumber_"+(numberIndex+1);
}

export const getClassesUsedForHighlighting: () => string = () => {
    return [
      "pastDrawnNumber",
      'drawn_number_background',
      "drawn_number_in_panel",
      "drawnNumber-1",
      "drawnNumber-2",
      "drawnNumber-3",
      "drawnNumber-4",
      "drawnNumber-5",

    ].join(" ");
  }