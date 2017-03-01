"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var signalr_service_1 = require('../../services/signalr.service');
var ChatMessage_1 = require('../../models/ChatMessage');
var ChatComponent = (function () {
    function ChatComponent(_signalRService, _ngZone) {
        this._signalRService = _signalRService;
        this._ngZone = _ngZone;
        this.subscribeToEvents();
        this.canSendMessage = _signalRService.connectionExists;
        this.currentMessage = new ChatMessage_1.ChatMessage('', null);
        this.allMessages = new Array();
    }
    ChatComponent.prototype.sendMessage = function () {
        if (this.canSendMessage) {
            this.currentMessage.Sent = new Date();
            this._signalRService.sendChatMessage(this.currentMessage);
        }
    };
    ChatComponent.prototype.subscribeToEvents = function () {
        var _this = this;
        this._signalRService.connectionEstablished.subscribe(function (subscribed) {
            _this.canSendMessage = subscribed;
        });
        this._signalRService.messageReceived.subscribe(function (message) {
            _this._ngZone.run(function () {
                _this.currentMessage = new ChatMessage_1.ChatMessage('', null);
                _this.allMessages.push(new ChatMessage_1.ChatMessage(message.Message, message.Sent.toString()));
            });
        });
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'chat-component',
            templateUrl: 'app/components/chat/chat.component.html'
        }), 
        __metadata('design:paramtypes', [signalr_service_1.SignalRService, core_1.NgZone])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map