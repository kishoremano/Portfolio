import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotionFadeInDirective } from '../../directives/motion-fade-in.directive';
import { MotionStaggerDirective } from '../../directives/motion-stagger.directive';
import { MotionCounterDirective } from '../../directives/motion-counter.directive';

interface Metric {
  type: 'counter' | 'text';
  value?: number;
  suffix?: string;
  textValue?: string;
  label: string;
  subLabel?: string;
}

@Component({
  selector: 'app-impact',
  standalone: true,
  imports: [CommonModule, MotionStaggerDirective, MotionCounterDirective],
  templateUrl: './impact.component.html',
  styleUrl: './impact.component.css'
})
export class ImpactComponent {
  metrics: Metric[] = [
    {
      type: 'counter',
      value: 3,
      suffix: '+',
      label: '3+ Years Experience',
      subLabel: 'Consulting & Enterprise Development'
    },
    {
      type: 'text',
      textValue: 'IAM',
      label: 'Enterprise IAM Solutions',
      subLabel: 'Automated Provisioning & Lifecycle'
    },
    {
      type: 'counter',
      value: 5,
      suffix: '+',
      label: 'Multiple Production Systems',
      subLabel: 'Delivered & Maintained'
    },
    {
      type: 'text',
      textValue: 'Cloud',
      label: 'Cloud & DevOps Experience',
      subLabel: 'AKS, Kubernetes, Docker & CI/CD'
    }
  ];
}
