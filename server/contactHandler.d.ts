export interface ProcessContactResult {
  status: number;
  body: {
    success: boolean;
    message: string;
  };
}

export declare function processContactForm(
  body: any,
  clientIp?: string
): Promise<ProcessContactResult>;
