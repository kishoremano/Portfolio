import { Directive, ElementRef, OnDestroy, AfterViewInit, inject } from '@angular/core';

@Directive({
  selector: '[motionTimeline]',
  standalone: true
})
export class MotionTimelineDirective implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private frameId?: number;
  private items: HTMLElement[] = [];
  private readonly onScroll = () => this.queueUpdate();

  ngAfterViewInit(): void {
    const timeline = this.el.nativeElement;
    this.items = Array.from(timeline.querySelectorAll('.timeline-item')) as HTMLElement[];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(16px)';
    });

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const item = entry.target as HTMLElement;
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        this.observer?.unobserve(item);
      });
    }, { threshold: 0.18 });

    this.items.forEach((item, index) => {
      item.style.transitionDelay = reducedMotion ? '0s' : `${index * 0.08}s`;
      this.observer?.observe(item);
    });

    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll);
    this.queueUpdate();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    if (this.frameId) cancelAnimationFrame(this.frameId);
  }

  private queueUpdate(): void {
    if (this.frameId) return;
    this.frameId = requestAnimationFrame(() => {
      this.frameId = undefined;
      this.updateTimeline();
    });
  }

  private updateTimeline(): void {
    const timeline = this.el.nativeElement;
    const rect = timeline.getBoundingClientRect();
    const focusY = window.innerHeight * 0.48;
    const progress = Math.min(1, Math.max(0, (focusY - rect.top) / Math.max(rect.height, 1)));
    timeline.style.setProperty('--timeline-progress', progress.toFixed(3));

    let activeItem: HTMLElement | undefined;
    let closestDistance = Number.POSITIVE_INFINITY;

    this.items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height * 0.45;
      const distance = Math.abs(itemCenter - focusY);
      const visible = itemRect.bottom > 100 && itemRect.top < window.innerHeight - 80;

      if (visible && distance < closestDistance) {
        closestDistance = distance;
        activeItem = item;
      }
    });

    this.items.forEach(item => item.classList.toggle('active', item === activeItem));
  }
}
