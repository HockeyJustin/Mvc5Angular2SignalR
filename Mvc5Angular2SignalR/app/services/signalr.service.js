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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SignalRService = /** @class */ (function () {
    function SignalRService() {
        this.proxyName = 'chatHub';
        this.connectionEstablished = new core_1.EventEmitter();
        this.messageReceived = new core_1.EventEmitter();
        this.connectionExists = false;
        this.connection = $.hubConnection('http://localhost:58056/' + 'signalr/');
        this.proxy = this.connection.createHubProxy(this.proxyName);
        this.registerOnServerEvents();
        this.startConnection();
    }
    SignalRService.prototype.sendChatMessage = function (message) {
        this.proxy.invoke('SendFromAngular', this.connectionId, message);
    };
    SignalRService.prototype.startConnection = function () {
        var _this = this;
        this.connection.start().done(function (data) {
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
            _this.connectionId = data.id;
            _this.connectionEstablished.emit(true);
            _this.connectionExists = true;
        }).fail(function (error) {
            console.log('Could not connect ' + error);
            _this.connectionEstablished.emit(false);
        });
    };
    SignalRService.prototype.registerOnServerEvents = function () {
        var _this = this;
        this.proxy.on('SendMessage', function (data) {
            console.log('received in SignalRService: ' + JSON.stringify(data));
            _this.messageReceived.emit(data);
        });
    };
    SignalRService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], SignalRService);
    return SignalRService;
}());
exports.SignalRService = SignalRService;
//# sourceMappingURL=signalr.service.js.map