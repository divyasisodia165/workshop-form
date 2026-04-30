import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {

  // ✅ Images
  topBannerImageUrl = 'https://res.cloudinary.com/dpwulp3at/image/upload/v1777566750/public_olyope.png';

logoUrl = 'https://res.cloudinary.com/dpwulp3at/image/upload/v1777571511/public_1_ojuj6f.png';

  // ✅ Dropdown
  eventOptions = ['SATS Exam Prep - Rapid Course', 'Webinar'];

  // ✅ States
  submitting = false;
  submitted = false;

  // ✅ Form variable (IMPORTANT: only declare here)
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    // ✅ Form initialize INSIDE constructor (fixes error)
    this.registrationForm = this.fb.group({
      eventName: ['', Validators.required],

      parentName: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      }),

      studentName: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      }),

      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      schoolYear: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  // ✅ Normal validation
  isInvalid(controlName: string): boolean {
    const ctrl = this.registrationForm.get(controlName);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  // ✅ Nested validation (VERY IMPORTANT)
  isInvalidNested(groupName: string, controlName: string): boolean {
    const ctrl = this.registrationForm.get(`${groupName}.${controlName}`);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  // ✅ Submit
  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    setTimeout(() => {
      console.log(this.registrationForm.value);
      this.submitting = false;
      this.submitted = true;
      this.registrationForm.reset();
    }, 1500);
  }
}