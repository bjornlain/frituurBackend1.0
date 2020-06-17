import { TemplateRef } from '@angular/core';

export interface UiTableHeader<T> {
  label?: string;
  key: string | string[];
  template?: TemplateRef<any>;
  autoSize?: boolean;
  condensed?: boolean;
  isSortable?: boolean;
  sorter?: (a, b) => boolean;
}

export interface UiTableTemplateType {
  Email: 'email';
}
