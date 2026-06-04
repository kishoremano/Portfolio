import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experiences: ExperienceEntry[] = [
    {
      role: 'Software Consultant',
      company: 'Tenxity Solutions Pvt. Ltd., Chennai',
      period: 'Nov 2024 - Present',
      description: [
        'Developing an enterprise-grade Identity & Access Management (IAM) system for managing user identities, entitlements, and access provisioning (client: A-star Singapore).',
        'Contributing to the architectural design and code development of a modern IAM platform utilizing the ABP Framework.',
        'Integrating microservices communication via Kafka, setting up asynchronous background jobs using Hangfire, and automating access configurations with Active Directory.',
        'Maintaining legacy provisioning processes and troubleshooting active production tickets to ensure continuous system SLA compliance.'
      ],
      tags: ['C#', '.NET Core', 'ABP Framework', 'Kafka', 'Hangfire', 'Active Directory']
    },
    {
      role: 'Software Engineer',
      company: 'Anga Infotech Pvt. Ltd., Coimbatore',
      period: 'Sep 2021 - Oct 2024',
      description: [
        'Developed T-soft ERP, a complete system for KDHP tea plantation company tracking inventory, production, employee management, sales, distribution, financial accounting, and reporting.',
        'Built Speed Parcel Service (A1 Parcel Services) web application featuring secure QR code scanners/trackers, user access controls, and notification triggers.',
        'Designed AIT PMS Project Management System and Kavya Ortho Center Clinical Management System to streamline user operations and administrative workflows.',
        'Wrote complex database storage routines, triggers, and optimization scripts in MS SQL and PL/SQL, reducing report queries latency.'
      ],
      tags: ['.NET Framework', 'MS SQL', 'PL/SQL', 'Entity Framework', 'Crystal Reports', 'GitLab', 'jQuery']
    }
  ];
}
