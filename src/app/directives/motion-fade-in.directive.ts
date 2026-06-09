import { Directive, ElementRef, Input, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { animate, inView } from 'motion';

const EASE = [0.25, 0.1, 0.25, 1] as const;

@Directive({
  selector: '[motionFadeIn]',
  standalone: true
})
export class MotionFadeInDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private stopInView?: VoidFunction;

  @Input() motionFadeInDelay = 0;
  @Input() motionFadeInY = 20;

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    element.style.opacity = '0';

    const stop = inView(
      element,
      () => {
        animate(
          element,
          { opacity: [0, 1], y: [this.motionFadeInY, 0] },
          { duration: 0.65, delay: this.motionFadeInDelay, ease: EASE }
        );
        stop();
      },
      { amount: 0.15 }
    );
    this.stopInView = stop;
  }

  ngOnDestroy(): void {
    this.stopInView?.();
  }
}
