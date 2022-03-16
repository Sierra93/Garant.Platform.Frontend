import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsLinkActiveDirective } from '../core/directives/is-link-active';

const DIRECTIVES = [
  IsLinkActiveDirective,
];

@NgModule({
  declarations: [
    ...DIRECTIVES,
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    ...DIRECTIVES,
  ]
})
export class SharedModule { }
