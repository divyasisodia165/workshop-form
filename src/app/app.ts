import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

/* ── Data models ──────────────────────────────────────────────── */
interface UpcomingEvent {
  day: string;
  month: string;
  title: string;
  desc: string;
  tag: string;
  time: string;
}

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-root',   // ✅ FIXED (was different before)
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './app.html',   // ✅ FIXED
  styleUrls: ['./app.css']     // ✅ FIXED
})
export class AppComponent implements OnInit, OnDestroy {

  /* ── Images ───────────────────────────────────────────── */
  logoUrl = 'https://res.cloudinary.com/dpwulp3at/image/upload/v1777571511/public_1_ojuj6f.png';
  topBannerImageUrl = '';
  heroImageUrl = '';
  backgroundImageUrl = '';

  /* ── UI state ─────────────────────────────────────────── */
  navScrolled = false;
  mobileMenuOpen = false;

  currentYear = new Date().getFullYear();

  /* ── Dropdown ─────────────────────────────────────────── */
  eventOptions: string[] = [
    'SATs Exam Prep Webinar – June 2025',
    'Career Guidance Session – July 2025',
    'Skill Development Workshop – August 2025',
    'STEM Exploration Camp',
    'English Communication Masterclass',
    '11+ Exam Coaching Programme',
  ];

  /* ── Events ───────────────────────────────────────────── */
  upcomingEvents: UpcomingEvent[] = [
    {
      day: '14',
      month: 'Jun',
      title: 'SATs Exam Prep Webinar',
      desc: 'Targeted revision strategies and expert guidance.',
      tag: 'Webinar',
      time: '5:00 PM',
    },
    {
      day: '28',
      month: 'Jun',
      title: 'Career Guidance Session',
      desc: 'Explore career pathways with experts.',
      tag: 'Workshop',
      time: '4:30 PM',
    },
    {
      day: '12',
      month: 'Jul',
      title: 'Skill Development Workshop',
      desc: 'Build communication and thinking skills.',
      tag: 'Workshop',
      time: '3:00 PM',
    },
  ];

  /* ── Features ─────────────────────────────────────────── */
  features: Feature[] = [
    {
      icon: '👨‍🏫',
      title: 'Expert Teachers',
      desc: 'Learn from experienced educators.',
    },
    {
      icon: '🎥',
      title: 'Live Webinars',
      desc: 'Interactive real-time sessions.',
    },
    {
      icon: '🏅',
      title: 'Certified Courses',
      desc: 'Earn recognized certificates.',
    },
    {
      icon: '💬',
      title: 'Student Support',
      desc: 'Personal guidance and mentorship.',
    },
  ];

  /* ── Form ─────────────────────────────────────────────── */
  registrationForm!: FormGroup;
  submitting = false;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      eventName: ['', Validators.required],

      parentName: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),

      studentName: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),

      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      schoolYear: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
    });
  }

  ngOnDestroy(): void {}

  /* ── Scroll ───────────────────────────────────────────── */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.navScrolled = window.scrollY > 40;
  }

  /* ── Mobile menu ─────────────────────────────────────── */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  /* ── Validation ──────────────────────────────────────── */
  isInvalid(control: string): boolean {
    const c = this.registrationForm.get(control);
    return !!(c && c.invalid && (c.touched || c.dirty));
  }

  isInvalidNested(group: string, control: string): boolean {
    const c = this.registrationForm.get(`${group}.${control}`);
    return !!(c && c.invalid && (c.touched || c.dirty));
  }

  /* ── Submit ──────────────────────────────────────────── */
  onSubmit(): void {
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.invalid) return;

    this.submitting = true;

    setTimeout(() => {
      console.log(this.registrationForm.value);

      this.submitting = false;
      this.submitted = true;

      this.registrationForm.reset();

      setTimeout(() => {
        this.submitted = false;
      }, 4000);
    }, 1200);
  }
}