import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type ButtonVariant =
  | 'basic'
  | 'elevated'
  | 'fab'
  | 'filled'
  | 'icon'
  | 'mini-fab'
  | 'outlined'
  | 'tonal';
type IconPosition = 'end' | 'start';

@Component({
  selector: 'app-button',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    @switch (variant()) {
      @case ('filled') {
        <button
          mat-flat-button
          [attr.type]="type()"
          [disabled]="disabled() || loading()"
          [class.app-button--full-width]="fullWidth()"
          [class.app-button--loading]="loading()"
          (click)="pressed.emit($event)"
        >
          <span class="app-button__content">
            <ng-container [ngTemplateOutlet]="contentTpl" />
          </span>
        </button>
      }

      @case ('outlined') {
        <button
          mat-stroked-button
          [attr.type]="type()"
          [disabled]="disabled() || loading()"
          [class.app-button--full-width]="fullWidth()"
          [class.app-button--loading]="loading()"
          (click)="pressed.emit($event)"
        >
          <span class="app-button__content">
            <ng-container [ngTemplateOutlet]="contentTpl" />
          </span>
        </button>
      }

      @case ('tonal') {
        <button
          mat-button
          [attr.type]="type()"
          [disabled]="disabled() || loading()"
          class="app-button--tonal"
          [class.app-button--full-width]="fullWidth()"
          [class.app-button--loading]="loading()"
          (click)="pressed.emit($event)"
        >
          <span class="app-button__content">
            <ng-container [ngTemplateOutlet]="contentTpl" />
          </span>
        </button>
      }

      @case ('elevated') {
        <button
          mat-raised-button
          [attr.type]="type()"
          [disabled]="disabled() || loading()"
          [class.app-button--full-width]="fullWidth()"
          [class.app-button--loading]="loading()"
          (click)="pressed.emit($event)"
        >
          <span class="app-button__content">
            <ng-container [ngTemplateOutlet]="contentTpl" />
          </span>
        </button>
      }

      @case ('icon') {
        <button
          mat-icon-button
          [attr.type]="type()"
          [disabled]="disabled() || loading()"
          [attr.aria-label]="ariaLabel() || icon() || 'Button'"
          (click)="pressed.emit($event)"
        >
          <ng-container [ngTemplateOutlet]="iconOnlyTpl" />
        </button>
      }

      @case ('fab') {
        @if (extended()) {
          <button
            mat-fab
            extended
            [attr.type]="type()"
            [disabled]="disabled() || loading()"
            [class.app-button--full-width]="fullWidth()"
            [class.app-button--loading]="loading()"
            [attr.aria-label]="ariaLabel() || null"
            (click)="pressed.emit($event)"
          >
            <span class="app-button__content">
              <ng-container [ngTemplateOutlet]="contentTpl" />
            </span>
          </button>
        } @else {
          <button
            mat-fab
            [attr.type]="type()"
            [disabled]="disabled() || loading()"
            [attr.aria-label]="ariaLabel() || icon() || 'Button'"
            (click)="pressed.emit($event)"
          >
            <ng-container [ngTemplateOutlet]="iconOnlyTpl" />
          </button>
        }
      }

      @case ('mini-fab') {
        <button
          mat-mini-fab
          [attr.type]="type()"
          [disabled]="disabled() || loading()"
          [attr.aria-label]="ariaLabel() || icon() || 'Button'"
          (click)="pressed.emit($event)"
        >
          <ng-container [ngTemplateOutlet]="iconOnlyTpl" />
        </button>
      }

      @default {
        <button
          mat-button
          [attr.type]="type()"
          [disabled]="disabled() || loading()"
          [class.app-button--full-width]="fullWidth()"
          [class.app-button--loading]="loading()"
          (click)="pressed.emit($event)"
        >
          <span class="app-button__content">
            <ng-container [ngTemplateOutlet]="contentTpl" />
          </span>
        </button>
      }
    }

    <ng-template #contentTpl>
      @if (loading()) {
        <span class="app-button__spinner-slot">
          <span class="app-button__spinner" aria-hidden="true"></span>
        </span>
      } @else if (icon() && iconPosition() === 'start') {
        <mat-icon>{{ icon() }}</mat-icon>
      }

      <span class="app-button__label"><ng-content /></span>

      @if (!loading() && icon() && iconPosition() === 'end') {
        <mat-icon>{{ icon() }}</mat-icon>
      }
    </ng-template>

    <ng-template #iconOnlyTpl>
      @if (loading()) {
        <span class="app-button__icon-slot">
          <span class="app-button__spinner" aria-hidden="true"></span>
        </span>
      } @else if (icon()) {
        <mat-icon>{{ icon() }}</mat-icon>
      }
    </ng-template>
  `,
  styles: `
    .app-button--full-width {
      width: 100%;
    }

    .app-button--loading {
      pointer-events: none;
    }

    .app-button__content {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .app-button__content .mat-icon,
    .app-button__content mat-icon {
      margin: 0;
    }

    .app-button__label {
      display: inline-flex;
      align-items: center;
    }

    .app-button__spinner-slot,
    .app-button__icon-slot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.125rem;
      height: 1.125rem;
      flex: 0 0 1.125rem;
    }

    .app-button__spinner {
      display: block;
      width: 1rem;
      height: 1rem;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: app-button-spin 0.7s linear infinite;
    }

    .app-button--tonal {
      background: color-mix(in srgb, var(--mat-sys-primary-container) 76%, transparent);
    }

    @keyframes app-button-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppButtonComponent {
  readonly variant = input<ButtonVariant>('filled');
  readonly type = input<'button' | 'reset' | 'submit'>('button');
  readonly icon = input('');
  readonly iconPosition = input<IconPosition>('start');
  readonly ariaLabel = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });
  readonly extended = input(false, { transform: booleanAttribute });

  readonly pressed = output<MouseEvent>();
}
