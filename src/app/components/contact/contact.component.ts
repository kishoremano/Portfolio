import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotionFadeInDirective } from '../../directives/motion-fade-in.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MotionFadeInDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
      _gotcha: ['']
    });
  }

  async onSubmit() {
    if (this.isSubmitting) return;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;
    this.errorMessage = '';

    const payload = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message,
      _gotcha: this.contactForm.value._gotcha
    };

    try {
      let res: Response;

      try {
        res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const contentType = res.headers.get('content-type') || '';
        // In local development if Angular dev-server served index.html instead of proxying to API
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost' && (!res.ok || contentType.includes('text/html'))) {
          try {
            const localRes = await fetch('http://localhost:3000/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            if (localRes.ok || localRes.headers.get('content-type')?.includes('application/json')) {
              res = localRes;
            }
          } catch {
            // Keep original res
          }
        }
      } catch (networkErr) {
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
          res = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } else {
          throw networkErr;
        }
      }

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        this.submitSuccess = true;
        this.contactForm.reset();
        this.contactForm.markAsPristine();
        this.contactForm.markAsUntouched();
      } else {
        console.error('[Contact Form Error] Status:', res.status, 'Response:', data);
        this.submitError = true;
        this.errorMessage = 'Unable to send your message. Please try again or email me directly.';
      }
    } catch (err) {
      console.error('[Contact Form Network/Fetch Error]:', err);
      this.submitError = true;
      this.errorMessage = 'Unable to send your message. Please try again or email me directly.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
