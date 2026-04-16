import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LayoutNavItem } from '../layout.models';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  readonly expanded = input.required<boolean>();
  readonly navItems = input.required<readonly LayoutNavItem[]>();
  readonly secondaryItems = input.required<readonly LayoutNavItem[]>();
}
