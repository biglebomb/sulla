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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var exposed_enum_1 = require("./functions/exposed.enum");
var axios_1 = __importDefault(require("axios"));
var puppeteer_config_1 = require("../config/puppeteer.config");
exports.getBase64 = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, axios_1.default
                        .get(url, {
                        responseType: 'arraybuffer'
                    })];
            case 1:
                res = _a.sent();
                return [2, "data:" + res.headers['content-type'] + ";base64," + Buffer.from(res.data, 'binary').toString('base64')];
            case 2:
                error_1 = _a.sent();
                console.log("TCL: getBase64 -> error", error_1);
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
var Whatsapp = (function () {
    function Whatsapp(page) {
        this.page = page;
        this.page = page;
    }
    Whatsapp.prototype.onMessage = function (fn) {
        this.page.exposeFunction(exposed_enum_1.ExposedFn.OnMessage, function (message) {
            return fn(message);
        });
    };
    Whatsapp.prototype.onAnyMessage = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.page.exposeFunction(exposed_enum_1.ExposedFn.OnAnyMessage, function (message) {
                    return fn(message);
                }).then(function (_) { return _this.page.evaluate(function () {
                    WAPI.addAllNewMessagesListener(window["onAnyMessage"]);
                }); });
                return [2];
            });
        });
    };
    Whatsapp.prototype.onStateChanged = function (fn) {
        var _this = this;
        this.page.exposeFunction(exposed_enum_1.ExposedFn.onStateChanged, function (state) {
            return fn(state);
        }).then(function (_) { return _this.page.evaluate(function () {
            WAPI.onStateChanged(function (s) { return window['onStateChanged'](s.state); });
        }); });
    };
    Whatsapp.prototype.setMyStatus = function (newStatus) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var newStatus = _a.newStatus;
                            WAPI.setMyStatus(newStatus);
                        }, { newStatus: newStatus })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.setMyName = function (newName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var newName = _a.newName;
                            WAPI.setMyName(newName);
                        }, { newName: newName })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.setChatState = function (chatState, chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var chatState = _a.chatState, chatId = _a.chatId;
                            WAPI.setChatState(chatState, chatId);
                        }, { chatState: chatState, chatId: chatId })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getConnectionState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function () { return Store.State.default.state; })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.onAck = function (fn) {
        this.page.exposeFunction(exposed_enum_1.ExposedFn.onAck, function (message) {
            return fn(message);
        });
    };
    Whatsapp.prototype.kill = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Shutting Down');
                        if (!this.page) return [3, 2];
                        return [4, this.page.close()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this.page.browser) return [3, 4];
                        return [4, this.page.browser().close()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2, true];
                }
            });
        });
    };
    Whatsapp.prototype.forceRefocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var useHere;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function () { return window.l10n.localeStrings[window.l10n._locale.l][0][255]; })];
                    case 1:
                        useHere = _a.sent();
                        return [4, this.page.waitForFunction("[...document.querySelectorAll(\"div[role=button\")].find(e=>{return e.innerHTML.toLowerCase()===\"" + useHere.toLowerCase() + "\"})", { timeout: 0 })];
                    case 2:
                        _a.sent();
                        return [4, this.page.evaluate("[...document.querySelectorAll(\"div[role=button\")].find(e=>{return e.innerHTML.toLowerCase()==\"" + useHere.toLowerCase() + "\"}).click()")];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Whatsapp.prototype.onLiveLocation = function (chatId, fn) {
        var _this = this;
        var funcName = "onLiveLocation_" + chatId.replace('_', "").replace('_', "");
        return this.page.exposeFunction(funcName, function (liveLocationChangedEvent) {
            return fn(liveLocationChangedEvent);
        })
            .then(function (_) { return _this.page.evaluate(function (_a) {
            var chatId = _a.chatId, funcName = _a.funcName;
            return WAPI.onLiveLocation(chatId, window[funcName]);
        }, { chatId: chatId, funcName: funcName }); });
    };
    Whatsapp.prototype.onParticipantsChanged = function (groupId, fn) {
        var _this = this;
        var funcName = "onParticipantsChanged_" + groupId.replace('_', "").replace('_', "");
        return this.page.exposeFunction(funcName, function (participantChangedEvent) {
            return fn(participantChangedEvent);
        })
            .then(function (_) { return _this.page.evaluate(function (_a) {
            var groupId = _a.groupId, funcName = _a.funcName;
            WAPI.onParticipantsChanged(groupId, window[funcName]);
        }, { groupId: groupId, funcName: funcName }); });
    };
    Whatsapp.prototype.onAddedToGroup = function (fn) {
        var _this = this;
        var funcName = "onAddedToGroup";
        return this.page.exposeFunction(funcName, function (chat) {
            return fn(chat);
        })
            .then(function (_) { return _this.page.evaluate(function (funcName) {
            WAPI.onAddedToGroup(window[funcName]);
        }, { funcName: funcName }); });
    };
    Whatsapp.prototype.sendText = function (to, content) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var to = _a.to, content = _a.content;
                            WAPI.sendSeen(to);
                            return WAPI.sendMessage(to, content);
                        }, { to: to, content: content })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.sendTextToID = function (to, content) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var to = _a.to, content = _a.content;
                            WAPI.sendSeen(to);
                            return WAPI.sendMessageToID(to, content);
                        }, { to: to, content: content })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.sendMessageWithThumb = function (thumb, url, title, description, chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var thumb = _a.thumb, url = _a.url, title = _a.title, description = _a.description, chatId = _a.chatId;
                            WAPI.sendMessageWithThumb(thumb, url, title, description, chatId);
                        }, {
                            thumb: thumb,
                            url: url,
                            title: title,
                            description: description,
                            chatId: chatId
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.sendLocation = function (to, lat, lng, loc) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var to = _a.to, lat = _a.lat, lng = _a.lng, loc = _a.loc;
                            WAPI.sendLocation(to, lat, lng, loc);
                        }, { to: to, lat: lat, lng: lng, loc: loc })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getGeneratedUserAgent = function (userA) {
        return __awaiter(this, void 0, void 0, function () {
            var ua;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ua = userA || puppeteer_config_1.useragent;
                        return [4, this.page.evaluate(function (ua) {
                                WAPI.getGeneratedUserAgent(ua);
                            }, { ua: ua })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.sendImage = function (to, base64, filename, caption) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var to = _a.to, base64 = _a.base64, filename = _a.filename, caption = _a.caption;
                            WAPI.sendImage(base64, to, filename, caption);
                        }, { to: to, base64: base64, filename: filename, caption: caption })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.reply = function (to, content, quotedMsg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var to = _a.to, content = _a.content, quotedMsg = _a.quotedMsg;
                            WAPI.reply(to, content, quotedMsg);
                        }, { to: to, content: content, quotedMsg: quotedMsg })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.sendFile = function (to, base64, filename, caption) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var to = _a.to, base64 = _a.base64, filename = _a.filename, caption = _a.caption;
                            WAPI.sendImage(base64, to, filename, caption);
                        }, { to: to, base64: base64, filename: filename, caption: caption })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.sendVideoAsGif = function (to, base64, filename, caption) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var to = _a.to, base64 = _a.base64, filename = _a.filename, caption = _a.caption;
                            WAPI.sendVideoAsGif(base64, to, filename, caption);
                        }, { to: to, base64: base64, filename: filename, caption: caption })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.sendGiphy = function (to, giphyMediaUrl, caption) {
        return __awaiter(this, void 0, void 0, function () {
            var ue, n, r, filename, base64;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ue = /^https?:\/\/media\.giphy\.com\/media\/([a-zA-Z0-9]+)/;
                        n = ue.exec(giphyMediaUrl);
                        if (!n) return [3, 3];
                        r = "https://i.giphy.com/" + n[1] + ".mp4";
                        filename = n[1] + ".mp4";
                        return [4, exports.getBase64(r)];
                    case 1:
                        base64 = _a.sent();
                        return [4, this.page.evaluate(function (_a) {
                                var to = _a.to, base64 = _a.base64, filename = _a.filename, caption = _a.caption;
                                WAPI.sendVideoAsGif(base64, to, filename, caption);
                            }, { to: to, base64: base64, filename: filename, caption: caption })];
                    case 2: return [2, _a.sent()];
                    case 3:
                        console.log('something is wrong with this giphy link');
                        return [2];
                }
            });
        });
    };
    Whatsapp.prototype.getMe = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function () { return Store.Me.attributes; })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getBusinessProfilesProducts = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var id = _a.id;
                            WAPI.getBusinessProfilesProducts(id);
                        }, { id: id })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.sendImageWithProduct = function (to, base64, caption, bizNumber, productId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var to = _a.to, base64 = _a.base64, bizNumber = _a.bizNumber, caption = _a.caption, productId = _a.productId;
                            WAPI.sendImageWithProduct(base64, to, caption, bizNumber, productId);
                        }, { to: to, base64: base64, bizNumber: bizNumber, caption: caption, productId: productId })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.sendContact = function (to, contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var to = _a.to, contactId = _a.contactId;
                            return WAPI.sendContact(to, contactId);
                        }, { to: to, contactId: contactId })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.simulateTyping = function (to, on) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var to = _a.to, on = _a.on;
                            return WAPI.simulateTyping(to, on);
                        }, { to: to, on: on })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.forwardMessages = function (to, messages, skipMyMessages) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var to = _a.to, messages = _a.messages, skipMyMessages = _a.skipMyMessages;
                            return WAPI.forwardMessages(to, messages, skipMyMessages);
                        }, { to: to, messages: messages, skipMyMessages: skipMyMessages })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getAllContacts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function () { return WAPI.getAllContacts(); })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getWAVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function () { return WAPI.getWAVersion(); })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function () { return WAPI.isConnected(); })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getBatteryLevel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function () { return WAPI.getBatteryLevel(); })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getAllChats = function (withNewMessageOnly) {
        if (withNewMessageOnly === void 0) { withNewMessageOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!withNewMessageOnly) return [3, 2];
                        return [4, this.page.evaluate(function () {
                                return WAPI.getAllChatsWithNewMsg();
                            })];
                    case 1: return [2, _a.sent()];
                    case 2: return [4, this.page.evaluate(function () { return WAPI.getAllChats(); })];
                    case 3: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getAllChatsWithMessages = function (withNewMessageOnly) {
        if (withNewMessageOnly === void 0) { withNewMessageOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4, this.page.evaluate(function (withNewMessageOnly) { return WAPI.getAllChatsWithMessages(withNewMessageOnly); }, withNewMessageOnly)];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    Whatsapp.prototype.getAllGroups = function (withNewMessagesOnly) {
        if (withNewMessagesOnly === void 0) { withNewMessagesOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var chats, chats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!withNewMessagesOnly) return [3, 2];
                        return [4, this.page.evaluate(function () { return WAPI.getAllChatsWithNewMsg(); })];
                    case 1:
                        chats = _a.sent();
                        return [2, chats.filter(function (chat) { return chat.isGroup; })];
                    case 2: return [4, this.page.evaluate(function () { return WAPI.getAllChats(); })];
                    case 3:
                        chats = _a.sent();
                        return [2, chats.filter(function (chat) { return chat.isGroup; })];
                }
            });
        });
    };
    Whatsapp.prototype.getGroupMembersId = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (groupId) { return WAPI.getGroupParticipantIDs(groupId); }, groupId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.leaveGroup = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (groupId) { return WAPI.leaveGroup(groupId); }, groupId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getGroupMembers = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var membersIds, actions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getGroupMembersId(groupId)];
                    case 1:
                        membersIds = _a.sent();
                        actions = membersIds.map(function (memberId) {
                            return _this.getContact(memberId._serialized);
                        });
                        return [4, Promise.all(actions)];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getContact = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (contactId) { return WAPI.getContact(contactId); }, contactId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getChatById = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (contactId) { return WAPI.getChatById(contactId); }, contactId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getChat = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (contactId) { return WAPI.getChat(contactId); }, contactId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getProfilePicFromServer = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (chatId) { return WAPI.getProfilePicFromServer(chatId); }, chatId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.sendSeen = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (chatId) { return WAPI.sendSeen(chatId); }, chatId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.loadEarlierMessages = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (contactId) { return WAPI.loadEarlierMessages(contactId); }, contactId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getStatus = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (contactId) { return WAPI.getStatus(contactId); }, contactId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.asyncLoadAllEarlierMessages = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (contactId) { return WAPI.asyncLoadAllEarlierMessages(contactId); }, contactId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.loadAllEarlierMessages = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (contactId) { return WAPI.loadAllEarlierMessages(contactId); }, contactId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.deleteMessage = function (contactId, messageId, onlyLocal) {
        if (onlyLocal === void 0) { onlyLocal = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var contactId = _a.contactId, messageId = _a.messageId, onlyLocal = _a.onlyLocal;
                            return WAPI.smartDeleteMessages(contactId, messageId, onlyLocal);
                        }, { contactId: contactId, messageId: messageId, onlyLocal: onlyLocal })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.checkNumberStatus = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (contactId) { return WAPI.checkNumberStatus(contactId); }, contactId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getUnreadMessages = function (includeMe, includeNotifications, use_unread_count) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var includeMe = _a.includeMe, includeNotifications = _a.includeNotifications, use_unread_count = _a.use_unread_count;
                            return WAPI.getUnreadMessages(includeMe, includeNotifications, use_unread_count);
                        }, { includeMe: includeMe, includeNotifications: includeNotifications, use_unread_count: use_unread_count })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getAllNewMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4, this.page.evaluate(function () { return WAPI.getAllNewMessages(); })];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    Whatsapp.prototype.getAllUnreadMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4, this.page.evaluate(function () { return WAPI.getAllUnreadMessages(); })];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    Whatsapp.prototype.getAllMessagesInChat = function (chatId, includeMe, includeNotifications) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var chatId = _a.chatId, includeMe = _a.includeMe, includeNotifications = _a.includeNotifications;
                            return WAPI.getAllMessagesInChat(chatId, includeMe, includeNotifications);
                        }, { chatId: chatId, includeMe: includeMe, includeNotifications: includeNotifications })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.loadAndGetAllMessagesInChat = function (chatId, includeMe, includeNotifications) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var chatId = _a.chatId, includeMe = _a.includeMe, includeNotifications = _a.includeNotifications;
                            return WAPI.loadAndGetAllMessagesInChat(chatId, includeMe, includeNotifications);
                        }, { chatId: chatId, includeMe: includeMe, includeNotifications: includeNotifications })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.createGroup = function (groupName, contacts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var groupName = _a.groupName, contacts = _a.contacts;
                            return WAPI.createGroup(groupName, contacts);
                        }, { groupName: groupName, contacts: contacts })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.removeParticipant = function (idGroup, idParticipant) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var idGroup = _a.idGroup, idParticipant = _a.idParticipant;
                            return WAPI.removeParticipant(idGroup, idParticipant);
                        }, { idGroup: idGroup, idParticipant: idParticipant })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.addParticipant = function (idGroup, idParticipant) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var idGroup = _a.idGroup, idParticipant = _a.idParticipant;
                            return WAPI.addParticipant(idGroup, idParticipant);
                        }, { idGroup: idGroup, idParticipant: idParticipant })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.promoteParticipant = function (idGroup, idParticipant) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var idGroup = _a.idGroup, idParticipant = _a.idParticipant;
                            return WAPI.promoteParticipant(idGroup, idParticipant);
                        }, { idGroup: idGroup, idParticipant: idParticipant })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.demoteParticipant = function (idGroup, idParticipant) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (_a) {
                            var idGroup = _a.idGroup, idParticipant = _a.idParticipant;
                            return WAPI.demoteParticipant(idGroup, idParticipant);
                        }, { idGroup: idGroup, idParticipant: idParticipant })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Whatsapp.prototype.getGroupAdmins = function (idGroup) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.page.evaluate(function (idGroup) { return WAPI.getGroupAdmins(idGroup); }, idGroup)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return Whatsapp;
}());
exports.Whatsapp = Whatsapp;
var puppeteer_config_2 = require("../config/puppeteer.config");
exports.useragent = puppeteer_config_2.useragent;
