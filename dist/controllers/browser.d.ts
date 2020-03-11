import { Page } from '@types/puppeteer';
export declare function initWhatsapp(sessionId?: string, puppeteerConfigOverride?: any, customUserAgent?: string): Promise<Page>;
export declare function injectApi(page: Page): Promise<Page>;
