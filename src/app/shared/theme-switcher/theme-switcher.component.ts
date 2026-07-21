import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  template: `
    <div class="switcher" [class.open]="open">
      <button class="fab" (click)="open = !open" aria-label="Change theme">
        <span class="fab-dot"></span>
      </button>
      @if (open) {
        <div class="panel">
          <p class="panel-title">Palette</p>
          @for (opt of theme.options; track opt.id) {
            <button
              class="opt"
              [class.active]="theme.current() === opt.id"
              (click)="theme.set(opt.id); open = false"
            >
              <span class="sw" [style.background]="opt.swatch"></span>
              <span class="lbl">{{ opt.label }}</span>
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .switcher { position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 900; }
    .fab {
      width: 52px; height: 52px; border-radius: 50%; border: 1px solid var(--gold);
      background: var(--navy); color: var(--gold); cursor: pointer;
      display: grid; place-items: center; box-shadow: 0 10px 24px rgba(16,29,51,0.3);
      transition: transform 0.25s ease;
    }
    .fab:hover { transform: rotate(30deg) scale(1.05); }
    .fab-dot {
      width: 20px; height: 20px; border-radius: 50%;
      background: conic-gradient(#101d33, #17436e, #2b1f2e, #c9a96a, #101d33);
    }
    .panel {
      position: absolute; right: 0; bottom: 64px; width: 210px;
      background: #fff; border-radius: 16px; padding: 0.85rem;
      box-shadow: 0 18px 40px rgba(16,29,51,0.22); border: 1px solid rgba(16,29,51,0.08);
      animation: pop 0.2s ease;
    }
    @keyframes pop { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    .panel-title {
      margin: 0 0 0.6rem; font-size: 0.7rem; letter-spacing: 0.16em;
      text-transform: uppercase; color: var(--gold-deep); font-weight: 600;
    }
    .opt {
      width: 100%; display: flex; align-items: center; gap: 0.65rem;
      background: transparent; border: 1px solid transparent; border-radius: 10px;
      padding: 0.5rem 0.55rem; cursor: pointer; color: var(--ink);
      font-size: 0.9rem; transition: background 0.2s ease;
    }
    .opt:hover { background: rgba(16,29,51,0.05); }
    .opt.active { border-color: var(--gold); background: rgba(201,169,106,0.12); }
    .sw { width: 20px; height: 20px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.15); flex: none; }
    .lbl { font-weight: 500; }
  `],
})
export class ThemeSwitcherComponent {
  theme = inject(ThemeService);
  open = false;
}
