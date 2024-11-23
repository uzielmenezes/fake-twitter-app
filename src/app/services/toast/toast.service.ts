import {inject, Injectable} from '@angular/core';
import {Message, MessageService} from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private readonly messageService = inject(MessageService);

    showMessage(message: Message) {
        this.messageService.add(message);
    }

    clearMessage() {
        this.messageService.clear();
    }
}
