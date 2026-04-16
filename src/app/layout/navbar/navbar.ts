import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LayoutAction } from '../layout.models';

@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly appName = input.required<string>();
  readonly actions = input.required<readonly LayoutAction[]>();
  readonly sidebarExpanded = input.required<boolean>();
  readonly toggleSidebar = output<void>();
}
