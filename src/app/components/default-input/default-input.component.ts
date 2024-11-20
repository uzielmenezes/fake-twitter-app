import {Component, forwardRef, input, InputSignal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'default-input',
  standalone: true,
  imports: [InputTextModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultInputComponent),
      multi: true,
    },
  ],
  templateUrl: './default-input.component.html',
  styleUrl: './default-input.component.scss',
})
export class DefaultInputComponent implements ControlValueAccessor {
  label: InputSignal<string> = input('');
  type: InputSignal<string> = input('text');
  placeholder: InputSignal<string> = input('');

  value: string = '';

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
    this.onTouched(value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onChange: (value: string) => void = () => {
  };

  private onTouched: (value: string) => void = () => {
  };
}
