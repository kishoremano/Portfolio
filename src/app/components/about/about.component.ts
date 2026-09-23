import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotionFadeInDirective } from '../../directives/motion-fade-in.directive';
import { MotionStaggerDirective } from '../../directives/motion-stagger.directive';

interface InfoCard {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MotionFadeInDirective, MotionStaggerDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  infoCards: InfoCard[] = [
    { title: '5 Years', subtitle: 'Professional Experience' },
    { title: '.NET & C#', subtitle: 'Core Development Stack' },
    { title: 'ABP Framework', subtitle: 'Enterprise Application Development' },
    { title: 'IAM Solutions', subtitle: 'Identity & Access Management' }
  ];
}

