import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotionFadeInDirective } from '../../directives/motion-fade-in.directive';
import { MotionTimelineDirective } from '../../directives/motion-timeline.directive';

interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, MotionFadeInDirective, MotionTimelineDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experiences: ExperienceEntry[] = [
    {
      role: 'Software Consultant',
      company: 'Tenxity Solutions · Chennai',
      period: 'Nov 2024 — Present',
      description: [
        'Architecting an enterprise IAM platform for A-star Singapore — user identities, entitlements, and access provisioning.',
        'Building on ABP Framework with Kafka event streaming, Hangfire background jobs, and Active Directory integration.',
        'Maintaining legacy provisioning flows and resolving production incidents to uphold SLA commitments.'
      ],
      tags: ['C#', '.NET Core', 'ABP Framework', 'Kafka', 'Hangfire', 'Active Directory']
    },
    {
      role: 'Software Engineer',
      company: 'Anga Infotech · Coimbatore',
      period: 'Sep 2021 — Oct 2024',
      description: [
        'Delivered T-soft ERP for KDHP tea plantation — inventory, production, HR, sales, distribution, and financial reporting.',
        'Built Speed Parcel Service with QR tracking, access controls, and real-time AJAX notifications.',
        'Designed AIT PMS and Kavya Ortho clinical systems; optimized MS SQL and PL/SQL stored procedures.'
      ],
      tags: ['.NET Framework', 'MS SQL', 'PL/SQL', 'Entity Framework', 'Crystal Reports']
    }
  ];
}
