import { Component } from '@angular/core';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="exportar()">Exportar</button>
    </ion-list>
  `
})
export class PopoverMenu {
  constructor() { }

  exportar() {

  } 
}