import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotionStaggerDirective } from '../../directives/motion-stagger.directive';
import { MotionFadeInDirective } from '../../directives/motion-fade-in.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MotionStaggerDirective, MotionFadeInDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {}
