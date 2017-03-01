﻿import { Component, NgZone } from '@angular/core';
import { SignalRService } from '../../services/signalr.service';
import { ChatMessage } from '../../models/ChatMessage';

@Component({
	selector: 'chat-component',
	templateUrl: 'app/components/chat/chat.component.html'
})

export class ChatComponent {

	public currentMessage: ChatMessage;
	public allMessages: ChatMessage[];
	public canSendMessage: Boolean;

	constructor(private _signalRService: SignalRService, private _ngZone: NgZone) {
		this.subscribeToEvents();
		this.canSendMessage = _signalRService.connectionExists;
		this.currentMessage = new ChatMessage('', null);
		this.allMessages = new Array<ChatMessage>();
	}

	public sendMessage() {
		if (this.canSendMessage) {
			this.currentMessage.Sent = new Date();
			this._signalRService.sendChatMessage(this.currentMessage);
		}
	}

	private subscribeToEvents(): void {
		this._signalRService.connectionEstablished.subscribe((subscribed:Boolean) => {
			this.canSendMessage = subscribed;
		});

		this._signalRService.messageReceived.subscribe((message: ChatMessage) => {
			this._ngZone.run(() => {
				this.currentMessage = new ChatMessage('', null);
				this.allMessages.push(new ChatMessage(message.Message, message.Sent.toString()));
			});
		});
	}
}