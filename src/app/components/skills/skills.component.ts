import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotionFadeInDirective } from '../../directives/motion-fade-in.directive';
import { MotionStaggerDirective } from '../../directives/motion-stagger.directive';
import { animate, inView, stagger } from 'motion';

const EASE = [0.25, 0.1, 0.25, 1] as const;

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
  imports: [CommonModule, MotionFadeInDirective, MotionStaggerDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements AfterViewInit {
  private el = inject(ElementRef);

  skillCategories: SkillCategory[] = [
    {
      title: 'Backend & Frameworks',
      skills: [
        { name: 'C# / .NET Core & Framework', level: 95 },
        { name: 'ABP Framework', level: 85 },
        { name: 'Entity Framework Core', level: 90 },
        { name: 'REST APIs & Web Services', level: 90 }
      ]
    },
    {
      title: 'Data & Infrastructure',
      skills: [
        { name: 'MS SQL Server', level: 90 },
        { name: 'PL/SQL (Oracle)', level: 85 },
        { name: 'RabbitMQ / Kafka', level: 80 },
        { name: 'Hangfire', level: 85 }
      ]
    },
    {
      title: 'Frontend & Tooling',
      skills: [
        { name: 'Angular / TypeScript', level: 80 },
        { name: 'HTML5, CSS3, JavaScript', level: 85 },
        { name: 'Crystal Reports', level: 80 },
        { name: 'Git / GitLab CI', level: 85 }
      ]
    }
  ];

  ngAfterViewInit(): void {
    const bars = this.el.nativeElement.querySelectorAll('.skill-bar-fill') as NodeListOf<HTMLElement>;

    bars.forEach(bar => {
      const target = bar.dataset['width'] ?? '0';
      bar.style.width = '0%';

      const stop = inView(
        bar,
        () => {
          animate(bar, { width: `${target}%` }, { duration: 1, ease: EASE });
          stop();
        },
        { amount: 0.5 }
      );
    });
  }
}
