import { Directive, ElementRef, Input, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { animate, inView, stagger } from 'motion';

const EASE = [0.25, 0.1, 0.25, 1] as const;

@Directive({
  selector: '[motionStagger]',
  standalone: true
})
export class MotionStaggerDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private stopInView?: VoidFunction;

  @Input() motionStaggerDelay = 0.07;
  @Input() motionStaggerY = 16;

  ngAfterViewInit(): void {
    const container = this.el.nativeElement;
    const children = Array.from(container.children) as HTMLElement[];

    children.forEach(child => {
      child.style.opacity = '0';
    });

    const stop = inView(
      container,
      () => {
        animate(
          children,
          { opacity: [0, 1], y: [this.motionStaggerY, 0] },
          { duration: 0.55, delay: stagger(this.motionStaggerDelay), ease: EASE }
        );
        stop();
      },
      { amount: 0.12 }
    );
    this.stopInView = stop;
  }

  ngOnDestroy(): void {
    this.stopInView?.();
  }
}
