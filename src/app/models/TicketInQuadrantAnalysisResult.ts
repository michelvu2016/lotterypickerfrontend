export interface TicketInQuadrantAnalysisResultReader {
  getQuadrantNumber(): number;
  getTicketNumber(): string;
  getNumberOfOccurances(): number;
  getTkNumberOccurance(consumer: (tkNumber: string, numOccurs: number) => void): void; 
}

export interface TicketInQuadrantAnalysisResultWriter {
  setTicketNumber(value: string);
  addNumberOfOccurance(value?: number);
  addTkNumberOccurance(tkNumber: string, value?: number)

}

export class TicketInQuadrantAnalysisResultFactory {
  public static createTicketInQuadrantAnalysisResultReader(quadrantNumber: number): TicketInQuadrantAnalysisResultReader {
    return new TicketInQuadrantAnalysisResult(quadrantNumber) as TicketInQuadrantAnalysisResultReader;
  }

  public static createTicketInQuadrantAnalysisResultWriter(quadrantNumber: number): TicketInQuadrantAnalysisResultWriter {
    return new TicketInQuadrantAnalysisResult(quadrantNumber) as TicketInQuadrantAnalysisResultWriter;
  }

  public static writerToReader(writer: TicketInQuadrantAnalysisResultWriter): TicketInQuadrantAnalysisResultReader {
    return (writer as TicketInQuadrantAnalysisResult) as TicketInQuadrantAnalysisResultReader;
  }
}

class TicketInQuadrantAnalysisResult implements TicketInQuadrantAnalysisResultReader,
  TicketInQuadrantAnalysisResultWriter {

  private tkNumberOccurMap: Map<string, number> = new Map();

  constructor(private quadrantNumber: number, private ticketNumber: string = "",
    private numberOfOccurances: number = 0) {



  }



  public setTicketNumber(value: string) {
    this.ticketNumber = value;
  }

  public getTicketNumber(): string {
    return this.ticketNumber;
  }

  public getQuadrantNumber(): number {
    return this.quadrantNumber;
  }

  public getNumberOfOccurances(): number {
    return this.numberOfOccurances;
  }

  public addNumberOfOccurance(value: number = 1) {
    this.numberOfOccurances += value;
  }

  public addTkNumberOccurance(tkNumber: string, value = 1) {
    if (this.tkNumberOccurMap.has(tkNumber)) {
      const existingValue = this.tkNumberOccurMap.get(tkNumber);
      this.tkNumberOccurMap.set(tkNumber, existingValue + value);
    } else {
      this.tkNumberOccurMap.set(tkNumber, value);
    }
  }

  public getTkNumberOccurance(consumer: (tkNumber: string, numOccurs: number) => void): void {
    this.tkNumberOccurMap.forEach((value, key) => consumer(key, value));
  }

}
