import * as puppeteer from 'puppeteer';
export declare const isAuthenticated: (waPage: puppeteer.Page) => Promise<boolean>;
export declare const needsToScan: (waPage: puppeteer.Page) => import("rxjs").Observable<boolean>;
export declare const isInsideChat: (waPage: puppeteer.Page) => import("rxjs").Observable<boolean>;
export declare function retrieveQR(waPage: puppeteer.Page, sessionId?: string, autoRefresh?: boolean, throwErrorOnTosBlock?: boolean): Promise<boolean>;
export declare function randomMouseMovements(waPage: puppeteer.Page): Promise<boolean>;
