import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotionFadeInDirective } from '../../directives/motion-fade-in.directive';
import { MotionStaggerDirective } from '../../directives/motion-stagger.directive';
import { MotionHoverDirective } from '../../directives/motion-hover.directive';

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  imageUrl: string;
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
      title: 'Identity & Access Management Platform',
      category: 'IAM & Security',
      description: 'Enterprise IAM for A-star Singapore — identity lifecycle, access provisioning, and entitlements on ABP Framework with Kafka and Active Directory.',
      tech: ['.NET Core', 'ABP Framework', 'Kafka', 'Hangfire'],
      imageUrl: 'images/iam.png'
    },
    {
      title: 'T-soft Tea Plantation ERP',
      category: 'Enterprise Software',
      description: 'Full ERP for KDHP covering inventory, production, HR, sales, distribution, and financial reporting with Crystal Reports.',
      tech: ['.NET Framework', 'MS SQL', 'Entity Framework'],
      imageUrl: 'images/erp.png'
    },
    {
      title: 'Speed Parcel Service Portal',
      category: 'Logistics',
      description: 'Parcel tracking platform with QR code integration, role-based access, and real-time delivery status updates.',
      tech: ['.NET Core', 'MS SQL', 'jQuery', 'AJAX'],
      imageUrl: 'images/parcel.png'
    },
    {
      title: 'AIT Project Management System',
      category: 'Web Application',
      description: 'Corporate PMS for resource allocation, milestone tracking, and team performance metrics.',
      tech: ['.NET Core', 'Entity Framework', 'MS SQL'],
      imageUrl: 'images/pms.png'
    },
    {
      title: 'Clinical Management System',
      category: 'Healthcare IT',
      description: 'Operational platform for Kavya Ortho Center — appointments, clinical logs, inventory, and billing.',
      tech: ['.NET Framework', 'MS SQL', 'JavaScript'],
      imageUrl: 'images/clinical.png'
    }
  ];
}
