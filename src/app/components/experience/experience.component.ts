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
        'Contributing to the development of an enterprise IAM platform for managing identities, entitlements, and access provisioning.',
        'Working with ABP Framework, Kafka, Hangfire, and Active Directory integrations to support provisioning and automation.',
        'Maintaining legacy provisioning flows, resolving production issues, and delivering application updates based on client requirements.'
      ],
      tags: ['C#', '.NET Core', 'ABP Framework', 'Kafka', 'Hangfire', 'Active Directory']
    },
    {
      role: 'Software Engineer',
      company: 'Anga Infotech · Coimbatore',
      period: 'Sep 2021 — Oct 2024',
      description: [
        'Developed and maintained T-soft ERP for tea plantation operations, covering inventory, production, employee management, sales, distribution, finance, and reporting.',
        'Developed Speed Parcel Service with QR code integration, user access control, notification systems, and secure data handling.',
        'Developed AIT PMS and Kavya Ortho clinical applications for project management and healthcare operations.'
      ],
      tags: ['.NET Framework', 'MS SQL', 'PL/SQL', 'Entity Framework', 'Crystal Reports']
    }
  ];
}
