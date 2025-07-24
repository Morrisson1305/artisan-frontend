import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ViewportService {
  private mobile = signal<boolean>(window.innerWidth < 768);

  constructor() {
    const mql = window.matchMedia('(max-width: 767px)');
    const update = () => this.mobile.set(mql.matches);
    mql.addEventListener('change', update);
    update();
  }

  isMobile = computed(() => this.mobile());
}