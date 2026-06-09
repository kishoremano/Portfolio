import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mouse-glow',
  standalone: true,
  template: `
    <div
      class="mouse-glow"
      #glow
      [class.visible]="visible"
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
        rgba(80, 230, 255, 0.42) 0%,
        rgba(0, 188, 242, 0.16) 30%,
        rgba(0, 120, 212, 0.05) 58%,
        transparent 76%
      );
      opacity: 0;
      transition: opacity 0.25s ease;
      will-change: transform;
      filter: blur(6px);
      mix-blend-mode: screen;
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
export class MouseGlowComponent implements AfterViewInit, OnDestroy {
  @ViewChild('glow') glow?: ElementRef<HTMLElement>;

  visible = false;
  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;
  private frameId?: number;

  ngAfterViewInit(): void {
    this.frameId = requestAnimationFrame(() => this.render());
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.targetX = event.clientX;
    this.targetY = event.clientY;
    if (!this.visible) {
      this.currentX = this.targetX;
      this.currentY = this.targetY;
      this.visible = true;
    }
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.visible = false;
  }

  ngOnDestroy(): void {
    if (this.frameId) cancelAnimationFrame(this.frameId);
  }

  private render(): void {
    this.currentX += (this.targetX - this.currentX) * 0.16;
    this.currentY += (this.targetY - this.currentY) * 0.16;
    if (this.glow) {
      this.glow.nativeElement.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
    }
    this.frameId = requestAnimationFrame(() => this.render());
  }
}
