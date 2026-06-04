import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  skillCategories: SkillCategory[] = [
    {
      title: 'Programming & Frameworks',
      skills: [
        { name: 'C# Programming', level: 95 },
        { name: '.NET Core & .NET Framework', level: 90 },
        { name: 'ABP Framework', level: 85 },
        { name: 'Entity Framework Core', level: 90 }
      ]
    },
    {
      title: 'Databases & Reporting',
      skills: [
        { name: 'MS SQL Server', level: 90 },
        { name: 'PL/SQL (Oracle)', level: 85 },
        { name: 'Crystal Reports', level: 80 }
      ]
    },
    {
      title: 'Messaging & Web Stack',
      skills: [
        { name: 'REST APIs & Web Services', level: 90 },
        { name: 'RabbitMQ / Kafka (basic)', level: 80 },
        { name: 'Hangfire (Background Jobs)', level: 85 },
        { name: 'HTML5, CSS3, JS & jQuery / AJAX', level: 85 }
      ]
    }
  ];
}
