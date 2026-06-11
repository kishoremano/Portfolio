import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotionFadeInDirective } from '../../directives/motion-fade-in.directive';
import { MotionStaggerDirective } from '../../directives/motion-stagger.directive';

interface SkillCategory {
  title: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MotionFadeInDirective, MotionStaggerDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  skillCategories: SkillCategory[] = [
    {
      title: 'Backend Engineering',
      skills: ['.NET 8', 'ASP.NET Core', 'ABP Framework', 'REST APIs']
    },
    {
      title: 'Cloud & DevOps',
      skills: ['Azure', 'Docker', 'Kubernetes', 'AKS']
    },
    {
      title: 'Messaging & Background Processing',
      skills: ['Kafka', 'RabbitMQ', 'Hangfire']
    },
    {
      title: 'Identity & Security',
      skills: ['Active Directory', 'LDAP', 'IAM', 'Access Provisioning']
    },
    {
      title: 'Databases',
      skills: ['SQL Server', 'PL/SQL', 'Entity Framework']
    },
    {
      title: 'Frontend & Runtimes',
      skills: ['Angular', 'Node.js', '.NET Framework', 'TypeScript / JS']
    }
  ];
}
