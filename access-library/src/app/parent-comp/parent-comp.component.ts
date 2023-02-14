import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-parent-comp',
  template: `
  <app-child-comp (messageEvent)="receiveMessageFromChild($event)">
  </app-child-comp>
  `,
  styleUrls: ['./parent-comp.component.scss']
})
export class ParentCompComponent{   
  message: string;
  constructor(){
    this.message = "";
  }
  receiveMessageFromChild($event:any){
    this.message = $event;
    console.log(this.message);
  }
}
