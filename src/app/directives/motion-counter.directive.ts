import { Directive, ElementRef, Input, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { animate, inView } from 'motion';

const EASE = [0.25, 0.1, 0.25, 1] as const;

@Directive({
  selector: '[motionCounter]',
  standalone: true
})
export class MotionCounterDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private stopInView?: VoidFunction;

  @Input({ required: true }) motionCounter!: number;
  @Input() counterSuffix = '';
  @Input() counterPrefix = '';
  @Input() counterDecimals = 0;

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    element.textContent = `${this.counterPrefix}0${this.counterSuffix}`;

    const stop = inView(
      element,
      () => {
        animate(0, this.motionCounter, {
          duration: 1.4,
          ease: EASE,
          onUpdate: (value) => {
            const formatted =
              this.counterDecimals > 0
                ? value.toFixed(this.counterDecimals)
                : Math.round(value).toString();
            element.textContent = `${this.counterPrefix}${formatted}${this.counterSuffix}`;
          }
        });
        stop();
      },
      { amount: 0.5 }
    );
    this.stopInView = stop;
  }

  ngOnDestroy(): void {
    this.stopInView?.();
  }
}
