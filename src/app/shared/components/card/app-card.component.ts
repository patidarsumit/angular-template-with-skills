import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AppCardActionsDirective, AppCardBodyDirective } from './app-card.directive';

type CardTone = 'default' | 'elevated' | 'outlined';

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="app-shared-card" [class.app-shared-card--elevated]="tone() === 'elevated'">
      <mat-card-header>
        <div>
          @if (eyebrow()) {
            <p class="app-shared-card__eyebrow">{{ eyebrow() }}</p>
          }
          <mat-card-title>{{ title() }}</mat-card-title>
          @if (subtitle()) {
            <mat-card-subtitle>{{ subtitle() }}</mat-card-subtitle>
          }
        </div>

        @if (actionsTpl()) {
          <div class="app-shared-card__actions">
            <ng-content select="[appCardActions]" />
          </div>
        }
      </mat-card-header>

      <mat-card-content>
        @if (bodyTpl()) {
          <ng-content select="[appCardBody]" />
        } @else {
          <ng-content />
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    .app-shared-card {
      border-radius: var(--app-radius-lg);
      border: var(--app-border-subtle);
      background: color-mix(in srgb, var(--mat-sys-surface-container) 86%, transparent);
      box-shadow: var(--app-shadow-sm);
    }

    .app-shared-card--elevated {
      box-shadow: var(--app-shadow-md);
    }

    .app-shared-card__eyebrow {
      margin: 0 0 0.25rem;
      color: var(--mat-sys-primary);
      font: var(--mat-sys-label-medium);
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .app-shared-card__actions {
      display: flex;
      align-items: flex-start;
      margin-left: auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCardComponent {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly eyebrow = input('');
  readonly tone = input<CardTone>('default');

  readonly actionsTpl = contentChild(AppCardActionsDirective);
  readonly bodyTpl = contentChild(AppCardBodyDirective);
}
