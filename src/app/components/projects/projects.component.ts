import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotionFadeInDirective } from '../../directives/motion-fade-in.directive';
import { MotionStaggerDirective } from '../../directives/motion-stagger.directive';
import { MotionHoverDirective } from '../../directives/motion-hover.directive';

interface Project {
  number: string;
  title: string;
  role: string;
  duration: string;
  description: string;
  tech: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MotionFadeInDirective, MotionStaggerDirective, MotionHoverDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      number: '01',
      title: 'Identity & Access Management Platform',
      role: 'Software Consultant',
      duration: 'Nov 2024 – Present',
      description: 'Enterprise IAM platform for managing user identities, entitlements, and access provisioning. Contributed to the development of a new ABP-based platform while maintaining the existing IAM system.',
      tech: ['.NET Core', 'ABP Framework', 'Kafka', 'Hangfire', 'Active Directory']
    },
    {
      number: '02',
      title: 'T-soft Tea Plantation ERP',
      role: 'Maintenance Developer',
      duration: 'Sep 2023 – Oct 2024',
      description: 'ERP application supporting inventory, production, employee management, sales and distribution, financial management, and reporting.',
      tech: ['.NET Framework', 'MS SQL', 'Entity Framework', 'Crystal Reports']
    },
    {
      number: '03',
      title: 'Speed Parcel Service',
      role: 'Software Developer',
      duration: 'Jan 2023 – Jun 2024',
      description: 'Web application for parcel tracking, organization, and distribution with QR code integration, user access control, notification systems, and secure data storage.',
      tech: ['.NET', 'MS SQL', 'jQuery', 'AJAX']
    },
    {
      number: '04',
      title: 'AIT Project Management System',
      role: 'Software Developer',
      duration: 'Apr 2022 – Dec 2022',
      description: 'Project management system covering project planning, resource management, task management, and reporting.',
      tech: ['.NET', 'Entity Framework', 'MS SQL']
    },
    {
      number: '05',
      title: 'Clinical Management System',
      role: 'Software Developer',
      duration: 'Dec 2021 – Mar 2022',
      description: 'Web application supporting administrative, clinical, and financial functions for hospital operations and patient care management.',
      tech: ['.NET Framework', 'MS SQL', 'JavaScript']
    }
  ];
}
