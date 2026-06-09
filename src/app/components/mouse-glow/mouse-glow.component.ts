import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-mouse-glow',
  standalone: true,
  template: `
    <div
      class="mouse-glow"
      [style.transform]="'translate(' + x() + 'px, ' + y() + 'px)'"
      [class.visible]="visible()"
    ></div>
  `,
  styles: [`
    .mouse-glow {
      position: fixed;
      top: 0;
      left: 0;
      width: 140px;
      height: 140px;
      margin: -70px 0 0 -70px;
      pointer-events: none;
      z-index: 1;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba(0, 212, 255, 0.45) 0%,
    rgba(0, 188, 242, 0.18) 30%,
    rgba(0, 120, 212, 0.08) 60%,
    transparent 100%
      );
      opacity: 0;
      transition: opacity 0.25s ease;
      will-change: transform;
      filter: blur(14px);
    }

    .mouse-glow.visible {
      opacity: 1;
    }

    @media (max-width: 768px), (pointer: coarse) {
      .mouse-glow {
        display: none;
      }
    }
  `]
})
export class MouseGlowComponent {
  x = signal(0);
  y = signal(0);
  visible = signal(false);

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.x.set(event.clientX);
    this.y.set(event.clientY);
    this.visible.set(true);
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.visible.set(false);
  }
}
