import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotionStaggerDirective } from '../../directives/motion-stagger.directive';
import { animate } from 'motion';

const EASE = [0.25, 0.1, 0.25, 1] as const;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MotionStaggerDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit(): void {
    const graphic = this.el.nativeElement.querySelector('.hero-graphic') as HTMLElement | null;
    if (graphic) {
      graphic.style.opacity = '0';
      animate(
        graphic,
        { opacity: [0, 1], y: [24, 0] },
        { duration: 0.8, delay: 0.35, ease: EASE }
      );
    }
  }
}
