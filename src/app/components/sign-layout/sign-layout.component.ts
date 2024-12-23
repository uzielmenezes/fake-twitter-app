import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'sign-layout',
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  templateUrl: './sign-layout.component.html',
  styleUrl: './sign-layout.component.scss',
})
export class SignLayoutComponent {
  formTitle: InputSignal<string> = input<string>('');
  mainTitle: InputSignal<string> = input<string>('');

  primaryBtnText: InputSignal<string> = input<string>('');
  secondaryBtnText: InputSignal<string> = input<string>('');

  disablePrimaryBtn: InputSignal<boolean> = input<boolean>(true);

  tooltipContent: InputSignal<string> = input<string>('');

  onSubmit: OutputEmitterRef<void> = output<void>({ alias: 'submit' });
  onNavigate: OutputEmitterRef<void> = output<void>({ alias: 'navigate' });

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
}
