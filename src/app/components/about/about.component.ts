import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  stats = [
    { value: '5', label: 'Years Experience' },
    { value: '5+', label: 'Enterprise Projects' },
    { value: '2', label: 'Reputable Companies' },
    { value: '99.9%', label: 'API SLA Maintained' }
  ];
}
