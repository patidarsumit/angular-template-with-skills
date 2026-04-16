import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LayoutAction } from '../layout.models';

@Component({
  selector: 'app-right-sidebar',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './right-sidebar.html',
})
export class RightSidebar {
  readonly actions = input.required<readonly LayoutAction[]>();
}
