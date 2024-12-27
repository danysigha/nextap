declare module "react-qr-scanner" {
    import React from "react";
  
    interface QrReaderProps {
      delay?: number;
      onError?: (error: any) => void;
      onScan?: (result: string | null) => void;
      style?: React.CSSProperties;
    }
  
    const QrReader: React.FC<QrReaderProps>;
  
    
    export default QrReader;
  }