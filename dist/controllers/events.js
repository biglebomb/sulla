"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var eventemitter2_1 = require("eventemitter2");
var ora_1 = __importDefault(require("ora"));
exports.ev = new eventemitter2_1.EventEmitter2({
    wildcard: true,
});
var EvEmitter = (function () {
    function EvEmitter(sessionId, eventNamespace) {
        this.sessionId = sessionId;
        this.eventNamespace = eventNamespace;
    }
    EvEmitter.prototype.emit = function (data, eventNamespaceOverride) {
        exports.ev.emit((eventNamespaceOverride || this.eventNamespace) + "." + this.sessionId, data, this.sessionId, this.eventNamespace);
    };
    return EvEmitter;
}());
exports.EvEmitter = EvEmitter;
var Spin = (function (_super) {
    __extends(Spin, _super);
    function Spin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spinner = ora_1.default();
        return _this;
    }
    Spin.prototype.start = function (eventMessage) {
        this.spinner.start(eventMessage);
        this.emit(eventMessage);
    };
    Spin.prototype.info = function (eventMessage) {
        this.spinner.info(eventMessage);
        this.emit(eventMessage);
    };
    Spin.prototype.fail = function (eventMessage) {
        this.spinner.fail(eventMessage);
        this.emit(eventMessage);
    };
    Spin.prototype.succeed = function (eventMessage) {
        this.spinner.succeed(eventMessage);
        this.emit(eventMessage || 'SUCCESS');
    };
    return Spin;
}(EvEmitter));
exports.Spin = Spin;
