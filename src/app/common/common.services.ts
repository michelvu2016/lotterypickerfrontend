

export class CommonServices {
  
  lotteryTypes = ['Fantasy5', 'Superlotto', 'Powerball'];
  
  lottoryDirectory = {
      Fantasy5: {
        id: 'Fantasy5'
      },
    SuperLotto: {
      id: 'Superlotto',

    },
    Powerball: {
      id: 'Powerball',

    },
  };


  /**
   *
   * @param fullNumber
   */
  public pullNumberOut(fullNumber: string)
  {
    return fullNumber.substr(0,2);
  }

}
