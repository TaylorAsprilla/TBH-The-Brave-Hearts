import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobilePhoneNumberDirective } from './mobile-phone-number.directive';

@NgModule({
  declarations: [MobilePhoneNumberDirective],
  imports: [CommonModule],
  exports: [MobilePhoneNumberDirective],
})
export class MobilePhoneNumberDirectiveModule {}
