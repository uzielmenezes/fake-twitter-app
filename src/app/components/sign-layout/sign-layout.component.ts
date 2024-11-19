import { Component, input, InputSignal, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'sign-layout',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './sign-layout.component.html',
  styleUrl: './sign-layout.component.scss',
})
export class SignLayoutComponent {
  formTitle: InputSignal<string> = input<string>('');
  mainTitle: InputSignal<string> = input<string>('');

  primaryBtnText: InputSignal<string> = input<string>('');
  secondaryBtnText: InputSignal<string> = input<string>('');

  disablePrimaryBtn = input<boolean>(true);

  onSubmit = output<void>({ alias: 'submit' });
  onNavigate = output<void>({ alias: 'navigate' });

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
}
