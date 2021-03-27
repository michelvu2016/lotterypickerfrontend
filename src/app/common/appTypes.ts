export interface LastNumberOfTicketInfo {
    numberOfTicket: number,
    data: any,
}

export const  lotteryId = ['fantasy5', 'superlotto', 'powerball', 'megamillion'];

  
export enum LotteryIdIndex  {
    FANTASY5 = 0,
    SUPERLOTTO = 1,
    POWERBALL,
    MEGAMILION,
}

export const getLotteryId = (index: LotteryIdIndex) => {
    return lotteryId[index];
}

