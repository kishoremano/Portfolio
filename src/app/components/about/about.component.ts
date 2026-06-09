import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotionFadeInDirective } from '../../directives/motion-fade-in.directive';
import { MotionStaggerDirective } from '../../directives/motion-stagger.directive';
import { MotionCounterDirective } from '../../directives/motion-counter.directive';

interface Stat {
  value: number;
  suffix: string;
  prefix: string;
  decimals: number;
  label: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MotionFadeInDirective, MotionStaggerDirective, MotionCounterDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  stats: Stat[] = [
    { value: 5, suffix: '+', prefix: '', decimals: 0, label: 'Years Experience' },
    { value: 5, suffix: '+', prefix: '', decimals: 0, label: 'Enterprise Projects' },
    { value: 2, suffix: '', prefix: '', decimals: 0, label: 'Companies' },
    { value: 99.9, suffix: '%', prefix: '', decimals: 1, label: 'API SLA Maintained' }
  ];
}
