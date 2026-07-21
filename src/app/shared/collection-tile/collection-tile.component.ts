import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Collection } from '../../core/models';

@Component({
  selector: 'app-collection-tile',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a class="ctile fade-up" [routerLink]="['/collections']" [fragment]="collection.id" [style.background]="collection.gradient">
      <span class="emoji">{{ collection.emoji }}</span>
      <div class="ctile-body">
        <span class="sub">{{ collection.subtitle }}</span>
        <h3>{{ collection.name }}</h3>
        <p>{{ collection.description }}</p>
        <span class="link">Explore →</span>
      </div>
    </a>
  `,
  styles: [`
    .ctile {
      position: relative; display: block; border-radius: var(--radius); overflow: hidden;
      min-height: 260px; padding: 1.8rem; color: var(--ink);
      box-shadow: var(--shadow-soft); transition: transform .3s ease, box-shadow .3s ease;
    }
    .ctile:hover { transform: translateY(-6px); box-shadow: var(--shadow); }
    .emoji { position: absolute; top: 1.2rem; right: 1.4rem; font-size: 2.6rem; opacity: .9; }
    .ctile-body { position: absolute; bottom: 1.6rem; left: 1.8rem; right: 1.8rem; }
    .sub { text-transform: uppercase; letter-spacing: .18em; font-size: .68rem; font-weight: 600; color: var(--gold-deep); }
    .ctile h3 { margin: .3rem 0 .5rem; font-size: 1.5rem; }
    .ctile p { font-size: .85rem; color: var(--ink-soft); margin: 0 0 .8rem; }
    .link { font-weight: 600; font-size: .85rem; color: var(--ink); }
  `],
})
export class CollectionTileComponent {
  @Input({ required: true }) collection!: Collection;
}
