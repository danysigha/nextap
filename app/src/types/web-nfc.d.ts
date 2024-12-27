declare class NDEFReader {
    scan(): Promise<void>;
    write(data: string): Promise<void>;
    makeReadOnly(): Promise<void>;
    addEventListener(
      type: "reading" | "readingerror",
      listener: (event: NDEFReadingEvent | Event) => void
    ): void;
  }
  
  
  interface NDEFReadingEvent extends Event {
    serialNumber: string;
    message: {
      records: Array<Record<string, any>>;
    };
  }