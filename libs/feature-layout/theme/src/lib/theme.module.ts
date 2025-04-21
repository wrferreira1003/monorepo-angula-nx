import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeService } from './service/service.service';

@NgModule({
  imports: [CommonModule],
  providers: [ThemeService],
  exports: [],
})
export class ThemeModule {}
