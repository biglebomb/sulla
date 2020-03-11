declare const puppeteerConfig: {
    whatsappUrl: string;
    width: number;
    height: number;
    chromiumArgs: string[];
};
export declare const useragent = "WhatsApp/0.4.613 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36";
export declare const createUserAgent: (waVersion: string) => string;
export { puppeteerConfig };
export declare const width: number;
export declare const height: number;
