import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: this.passwordMatchValidator });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.signupForm.get(controlName);
    return (control?.touched || control?.dirty) && control.hasError(errorName) || false;
  }

  passwordMatchValidator(fg: FormGroup) {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {

    this.errorMessage = null;

    if (this.signupForm.valid) {
      const signUp = this.signupForm.value;

      this.authService.register(signUp).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('Signup failed', err);

          this.errorMessage = err.error?.message || 'Signup failed. Please try again.';
        }
      })
    }
  }
}
