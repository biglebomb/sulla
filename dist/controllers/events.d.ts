import { EventEmitter2 } from 'eventemitter2';
import ora from 'ora';
export declare const ev: EventEmitter2;
export declare class EvEmitter {
    sessionId: string;
    eventNamespace: string;
    constructor(sessionId: string, eventNamespace: string);
    emit(data: any, eventNamespaceOverride?: string): void;
}
export declare class Spin extends EvEmitter {
    spinner: ora.Ora;
    start(eventMessage: string): void;
    info(eventMessage: string): void;
    fail(eventMessage: string): void;
    succeed(eventMessage?: string): void;
}
