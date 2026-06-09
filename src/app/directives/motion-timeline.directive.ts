import { Directive, ElementRef, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { animate, inView } from 'motion';

const EASE = [0.25, 0.1, 0.25, 1] as const;

@Directive({
  selector: '[motionTimeline]',
  standalone: true
})
export class MotionTimelineDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private stopInView?: VoidFunction;

  ngAfterViewInit(): void {
    const timeline = this.el.nativeElement;
    const line = timeline.querySelector('.timeline-line') as HTMLElement | null;
    const items = Array.from(timeline.querySelectorAll('.timeline-item')) as HTMLElement[];
    const dots = Array.from(timeline.querySelectorAll('.timeline-dot')) as HTMLElement[];

    if (line) {
      line.style.transformOrigin = 'top';
      line.style.transform = 'scaleY(0)';
    }

    items.forEach(item => {
      item.style.opacity = '0';
    });

    dots.forEach(dot => {
      dot.style.transform = 'scale(0)';
    });

    const stop = inView(
      timeline,
      () => {
        if (line) {
          animate(line, { scaleY: [0, 1] }, { duration: 0.9, ease: EASE });
        }

        items.forEach((item, index) => {
          animate(
            item,
            { opacity: [0, 1], x: [-12, 0] },
            { duration: 0.55, delay: 0.2 + index * 0.15, ease: EASE }
          );
        });

        dots.forEach((dot, index) => {
          animate(dot, { scale: [0, 1] }, { duration: 0.4, delay: 0.25 + index * 0.15, ease: EASE });
        });

        stop();
      },
      { amount: 0.1 }
    );
    this.stopInView = stop;
  }

  ngOnDestroy(): void {
    this.stopInView?.();
  }
}
