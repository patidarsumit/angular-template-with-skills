import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from '../footer/footer';
import { LayoutAction, LayoutNavItem } from '../layout.models';
import { Navbar } from '../navbar/navbar';
import { RightSidebar } from '../right-sidebar/right-sidebar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Footer, Navbar, RightSidebar, Sidebar],
  templateUrl: './app-layout.html',
})
export class AppLayout {
  readonly sidebarExpanded = signal(true);

  readonly primaryNav: readonly LayoutNavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'analytics', label: 'Analytics', route: '/analytics', badge: '8' },
    { icon: 'assignment', label: 'Projects', route: '/projects' },
    { icon: 'groups', label: 'Team', route: '/team' },
    { icon: 'inventory_2', label: 'Resources', route: '/resources' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
  ];

  readonly workspaceNav: readonly LayoutNavItem[] = [
    { icon: 'folder', label: 'Documents', route: '/documents' },
    { icon: 'event', label: 'Calendar', route: '/calendar' },
    { icon: 'chat', label: 'Messages', route: '/messages' },
  ];

  readonly navbarActions: readonly LayoutAction[] = [
    { icon: 'notifications', label: 'Notifications' },
    { icon: 'help', label: 'Help' },
    { icon: 'settings', label: 'Settings' },
  ];

  readonly toolActions: readonly LayoutAction[] = [
    { icon: 'calendar_month', label: 'Calendar' },
    { icon: 'task_alt', label: 'Tasks' },
    { icon: 'sticky_note_2', label: 'Notes' },
    { icon: 'contacts', label: 'Contacts' },
  ];

  toggleSidebar(): void {
    this.sidebarExpanded.update((expanded) => !expanded);
  }
}
