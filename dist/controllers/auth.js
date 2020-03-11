"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var qrcode = __importStar(require("qrcode-terminal"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var puppeteer_config_1 = require("../config/puppeteer.config");
var events_1 = require("./events");
exports.isAuthenticated = function (waPage) {
    return rxjs_1.merge(exports.needsToScan(waPage), exports.isInsideChat(waPage))
        .pipe(operators_1.take(1))
        .toPromise();
};
exports.needsToScan = function (waPage) {
    return rxjs_1.from(waPage
        .waitForSelector('body > div > div > .landing-wrapper', {
        timeout: 0
    })
        .then(function () { return false; }));
};
exports.isInsideChat = function (waPage) {
    return rxjs_1.from(waPage
        .waitForFunction("document.getElementsByClassName('app')[0] && document.getElementsByClassName('app')[0].attributes && !!document.getElementsByClassName('app')[0].attributes.tabindex", { timeout: 0 })
        .then(function () { return true; }));
};
function retrieveQR(waPage, sessionId, autoRefresh, throwErrorOnTosBlock) {
    if (autoRefresh === void 0) { autoRefresh = false; }
    if (throwErrorOnTosBlock === void 0) { throwErrorOnTosBlock = false; }
    return __awaiter(this, void 0, void 0, function () {
        var qrEv, evalResult, em, qrData, qrCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    qrEv = new events_1.EvEmitter(sessionId, 'qr');
                    if (!autoRefresh) return [3, 2];
                    return [4, waPage.evaluate(function () { if (window.Store && window.Store.State) {
                            window.Store.State.default.state = "UNPAIRED";
                            window.Store.State.default.run();
                            return true;
                        }
                        else {
                            return false;
                        } })];
                case 1:
                    evalResult = _a.sent();
                    if (evalResult === false) {
                        em = 'Seems as though you have been TOS_BLOCKed, unable to refresh QR Code. Please see https://github.com/smashah/sulla#best-practice for information on how to prevent this from happeing. You will most likely not get a QR Code';
                        console.log(em);
                        if (throwErrorOnTosBlock)
                            throw new Error('TOSBLOCK');
                    }
                    _a.label = 2;
                case 2: return [4, waPage.waitForSelector("canvas[aria-label='Scan me!']", { timeout: 0 })];
                case 3:
                    _a.sent();
                    return [4, waPage.evaluate("document.querySelector(\"canvas[aria-label='Scan me!']\").parentElement.getAttribute(\"data-ref\")")];
                case 4:
                    qrData = _a.sent();
                    return [4, waPage.evaluate("document.querySelector(\"canvas[aria-label='Scan me!']\").toDataURL()")];
                case 5:
                    qrCode = _a.sent();
                    qrEv.emit(qrCode);
                    qrcode.generate(qrData, {
                        small: true
                    });
                    return [2, true];
            }
        });
    });
}
exports.retrieveQR = retrieveQR;
function randomMouseMovements(waPage) {
    return __awaiter(this, void 0, void 0, function () {
        var twoPI, h, w, x, y;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    twoPI = Math.PI * 2.0;
                    h = (puppeteer_config_1.height / 2 - 10) / 2;
                    w = puppeteer_config_1.width / 2;
                    x = 0;
                    _a.label = 1;
                case 1:
                    if (!(x < w)) return [3, 4];
                    y = h * Math.sin((twoPI * x) / puppeteer_config_1.width) + h;
                    return [4, waPage.mouse.move(x + 500, y)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    x++;
                    return [3, 1];
                case 4: return [2, true];
            }
        });
    });
}
exports.randomMouseMovements = randomMouseMovements;
