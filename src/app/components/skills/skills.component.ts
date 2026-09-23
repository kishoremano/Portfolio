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
      title: 'Backend Development',
      skills: ['C#', '.NET Framework', '.NET Core', 'ABP Framework', 'ASP.NET']
    },
    {
      title: 'Databases',
      skills: ['MS SQL', 'PL/SQL', 'Entity Framework']
    },
    {
      title: 'Messaging & Background Jobs',
      skills: ['RabbitMQ', 'Kafka (Basic)', 'Hangfire']
    },
    {
      title: 'Identity & Security',
      skills: ['Identity & Access Management (IAM)', 'Active Directory', 'LDAP', 'Access Provisioning']
    },
    {
      title: 'Web Technologies',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'AJAX']
    },
    {
      title: 'Tools & Methodologies',
      skills: ['Visual Studio', 'GitLab', 'REST APIs', 'Agile/Scrum']
    }
  ];
}

