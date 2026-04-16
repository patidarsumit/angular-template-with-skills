export interface LayoutNavItem {
  readonly icon: string;
  readonly label: string;
  readonly route: string;
  readonly badge?: string;
}

export interface LayoutAction {
  readonly icon: string;
  readonly label: string;
}
