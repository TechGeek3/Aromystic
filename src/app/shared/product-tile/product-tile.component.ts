import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models';
import { CartService } from '../../core/services/cart.service';
import { BottleComponent } from '../bottle/bottle.component';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [RouterLink, BottleComponent],
  template: `
    <article class="tile fade-up">
      <a [routerLink]="['/product', product.id]" class="tile-media" [style.--acc]="product.accent">
        <app-bottle class="bottle" [accent]="product.accent" [label]="product.name.charAt(0)" />
        @if (product.bestseller) {
          <span class="badge">Bestseller</span>
        } @else if (product.isNew) {
          <span class="badge badge-new">New</span>
        }
      </a>
      <div class="tile-body">
        <div class="tile-head">
          <a [routerLink]="['/product', product.id]"><h3>{{ product.name }}</h3></a>
          <span class="rating">★ {{ product.rating }}</span>
        </div>
        <p class="family">{{ product.family }} · {{ product.gender }}</p>
        <p class="tagline">{{ product.tagline }}</p>
        <div class="tile-foot">
          <span class="price">\${{ product.price }}</span>
          <button class="add" (click)="cart.add(product)" aria-label="Add to cart">Add +</button>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .tile {
      background: var(--white);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow-soft);
      transition: transform .3s ease, box-shadow .3s ease;
    }
    .tile:hover { transform: translateY(-6px); box-shadow: var(--shadow); }
    .tile-media {
      position: relative; display: flex; align-items: center; justify-content: center;
      height: 220px; text-decoration: none;
      background: linear-gradient(160deg,
        color-mix(in srgb, var(--acc) 18%, white),
        color-mix(in srgb, var(--acc) 6%, white));
    }
    .bottle { width: 108px; height: 168px; transition: transform .4s ease; }
    .tile:hover .bottle { transform: scale(1.08) rotate(-3deg); }
    .badge {
      position: absolute; top: 12px; left: 12px; background: var(--gold); color: #fff;
      font-size: .62rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
      padding: .3rem .6rem; border-radius: 50px;
    }
    .badge-new { background: var(--lavender-deep); }
    .tile-body { padding: 1.2rem 1.3rem 1.4rem; }
    .tile-head { display: flex; justify-content: space-between; align-items: baseline; gap: .5rem; }
    .tile-head h3 { font-size: 1.15rem; margin: 0; }
    .rating { color: var(--gold-deep); font-size: .82rem; font-weight: 600; white-space: nowrap; }
    .family { font-size: .72rem; letter-spacing: .06em; text-transform: uppercase; color: var(--ink-soft); margin: .35rem 0 .2rem; }
    .tagline { font-size: .86rem; color: var(--ink-soft); margin: 0 0 1rem; min-height: 2.4em; }
    .tile-foot { display: flex; justify-content: space-between; align-items: center; }
    .price { font-family: var(--font-serif); font-size: 1.25rem; color: var(--ink); }
    .add {
      border: none; cursor: pointer; background: var(--lavender); color: var(--ink);
      font-weight: 600; font-size: .82rem; padding: .5rem 1rem; border-radius: 50px;
      transition: background .25s ease, color .25s ease;
    }
    .add:hover { background: var(--gold); color: #fff; }
  `],
})
export class ProductTileComponent {
  @Input({ required: true }) product!: Product;
  constructor(public cart: CartService) {}
}
