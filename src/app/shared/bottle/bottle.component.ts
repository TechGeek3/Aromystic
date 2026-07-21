import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bottle',
  standalone: true,
  template: `
    <svg
      class="bottle-svg"
      viewBox="0 0 120 172"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      [attr.aria-label]="label ? label + ' bottle' : 'Perfume bottle'"
      role="img"
    >
      <defs>
        <linearGradient [attr.id]="'glass-' + uid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" [attr.stop-color]="accent" stop-opacity="0.45" />
          <stop offset="0.55" [attr.stop-color]="accent" stop-opacity="0.9" />
          <stop offset="1" [attr.stop-color]="accent" />
        </linearGradient>
      </defs>

      <rect x="49" y="6" width="22" height="20" rx="3" fill="#141f36" />
      <rect x="49" y="6" width="22" height="6" rx="3" [attr.fill]="capGold" />
      <rect x="53" y="24" width="14" height="12" fill="#1b2740" opacity="0.85" />

      <path
        d="M32 48 Q32 37 46 37 L74 37 Q88 37 88 48 L88 150 Q88 162 76 162 L44 162 Q32 162 32 150 Z"
        [attr.fill]="'url(#glass-' + uid + ')'"
        stroke="rgba(255,255,255,0.25)"
        stroke-width="1"
      />
      <ellipse cx="46" cy="92" rx="5.5" ry="38" fill="rgba(255,255,255,0.20)" />

      <rect
        x="43"
        y="86"
        width="34"
        height="46"
        rx="6"
        fill="rgba(250,246,239,0.96)"
        [attr.stroke]="capGold"
        stroke-width="1"
      />
      @if (label) {
        <text
          x="60"
          y="116"
          text-anchor="middle"
          font-family="'Playfair Display', serif"
          font-size="24"
          font-weight="600"
          [attr.fill]="capGold"
        >{{ label }}</text>
      }
    </svg>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    .bottle-svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 12px 16px rgba(16, 29, 51, 0.22));
      transition: transform 0.4s ease;
    }
  `],
})
export class BottleComponent {
  @Input() accent = '#c9a96a';
  @Input() label = '';
  capGold = '#a9843f';
  uid = Math.random().toString(36).slice(2, 8);
}
