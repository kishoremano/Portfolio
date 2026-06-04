import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  imageUrl: string;
  codeUrl: string;
  demoUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Identity & Access Management (IAM) System',
      category: 'IAM & Security',
      description: 'An enterprise-grade system for A-star Singapore to manage user identities, access provisioning, and entitlements, utilizing the ABP Framework with Kafka, Hangfire, and Active Directory integrations.',
      tech: ['.NET Core', 'ABP Framework', 'Kafka', 'Hangfire', 'Active Directory'],
      imageUrl: 'images/iam.png',
      codeUrl: 'https://github.com',
      demoUrl: 'https://example.com'
    },
    {
      title: 'T-soft: Tea Plantation ERP System',
      category: 'Enterprise Software',
      description: 'A comprehensive ERP developed for KDHP tea plantation, maintaining workflows for inventory, production, employee management, sales, distribution, financial audits, and Crystal Reports.',
      tech: ['.NET Framework', 'MS SQL Server', 'Entity Framework', 'Crystal Reports'],
      imageUrl: 'images/erp.png',
      codeUrl: 'https://github.com',
      demoUrl: 'https://example.com'
    },
    {
      title: 'Speed Parcel Service Web Portal',
      category: 'Logistics',
      description: 'A parcel management web application built to track and organize delivery distributions, featuring secure QR code integration, access controls, and AJAX-driven real-time updates.',
      tech: ['.NET Core', 'MS SQL Server', 'jQuery', 'AJAX', 'HTML5/CSS3'],
      imageUrl: 'images/parcel.png',
      codeUrl: 'https://github.com',
      demoUrl: 'https://example.com'
    },
    {
      title: 'AIT Project Management System',
      category: 'Web Application',
      description: 'A custom corporate system designed to plan, delegate, execute, and monitor resource allocation, milestone completions, and team performance metrics.',
      tech: ['.NET Core', 'Entity Framework', 'MS SQL Server', 'JavaScript'],
      imageUrl: 'images/pms.png',
      codeUrl: 'https://github.com',
      demoUrl: 'https://example.com'
    },
    {
      title: 'Clinical Management System',
      category: 'Healthcare IT',
      description: 'An operational web application for Kavya Ortho Center, unifying appointment booking, clinical logs, medical stock management, and financial billing workflows.',
      tech: ['.NET Framework', 'MS SQL Server', 'JavaScript', 'CSS3'],
      imageUrl: 'images/clinical.png',
      codeUrl: 'https://github.com',
      demoUrl: 'https://example.com'
    }
  ];
}
