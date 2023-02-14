import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-comp',
  template: `
]         <button (click)="sendMessage()">Send Message</button>
  `,
  styleUrls: ['./child-comp.component.scss']
})
export class ChildCompComponent {
  message: string = "I don't want to tidy my room!!!"
  
  @Output()
  messageEvent = new EventEmitter<string>();

  constructor(){}
  sendMessage(){
    this.messageEvent.emit(this.message);
  }
}
