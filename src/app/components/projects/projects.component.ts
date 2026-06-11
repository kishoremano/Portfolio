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
      description: 'Delivered enterprise identity lifecycle automation and access provisioning for large-scale organizational environments, securing digital assets and compliance.',
      tech: ['.NET Core', 'ABP Framework', 'Kafka', 'Hangfire'],
      imageUrl: 'images/iam.png'
    },
    {
      title: 'T-soft Tea Plantation ERP',
      category: 'Enterprise Software',
      description: 'Engineered an end-to-end plantation ERP system to streamline supply chain logistics, inventory management, production tracking, and multi-site financial operations.',
      tech: ['.NET Framework', 'MS SQL', 'Entity Framework'],
      imageUrl: 'images/erp.png'
    },
    {
      title: 'Speed Parcel Service Portal',
      category: 'Logistics',
      description: 'Developed a high-throughput logistics tracking portal with QR authentication and real-time shipment routing, decreasing package sorting overhead.',
      tech: ['.NET Core', 'MS SQL', 'jQuery', 'AJAX'],
      imageUrl: 'images/parcel.png'
    },
    {
      title: 'AIT Project Management System',
      category: 'Web Application',
      description: 'Designed a corporate performance-oriented suite to optimize resource utilization, automate milestone tracking, and deliver real-time operational analytics.',
      tech: ['.NET Core', 'Entity Framework', 'MS SQL'],
      imageUrl: 'images/pms.png'
    },
    {
      title: 'Clinical Management System',
      category: 'Healthcare IT',
      description: 'Built a unified clinical ERP to automate scheduling, medical charting, pharmacy inventory control, and secure billing for patient care efficiency.',
      tech: ['.NET Framework', 'MS SQL', 'JavaScript'],
      imageUrl: 'images/clinical.png'
    }
  ];
}
