import { Directive, ElementRef, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { animate } from 'motion';

const EASE = [0.25, 0.1, 0.25, 1] as const;

@Directive({
  selector: '[motionHover]',
  standalone: true
})
export class MotionHoverDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private enterHandler?: () => void;
  private leaveHandler?: () => void;

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;

    this.enterHandler = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      animate(element, { y: -6, scale: 1.012 }, { duration: 0.25, ease: EASE });
    };

    this.leaveHandler = () => {
      animate(element, { y: 0, scale: 1 }, { duration: 0.3, ease: EASE });
    };

    element.addEventListener('mouseenter', this.enterHandler);
    element.addEventListener('mouseleave', this.leaveHandler);
  }

  ngOnDestroy(): void {
    const element = this.el.nativeElement;
    if (this.enterHandler) element.removeEventListener('mouseenter', this.enterHandler);
    if (this.leaveHandler) element.removeEventListener('mouseleave', this.leaveHandler);
  }
}
