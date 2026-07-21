import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CatalogService } from '../../core/data/catalog.service';
import { CartService } from '../../core/services/cart.service';
import { ProductTileComponent } from '../../shared/product-tile/product-tile.component';
import { BottleComponent } from '../../shared/bottle/bottle.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, ProductTileComponent, BottleComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private catalog = inject(CatalogService);
  cart = inject(CartService);

  private id = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('id') ?? '')),
    { initialValue: '' }
  );

  product = computed(() => this.catalog.getProduct(this.id()));

  collection = computed(() => {
    const p = this.product();
    return p ? this.catalog.getCollection(p.collectionId) : undefined;
  });

  related = computed(() => {
    const p = this.product();
    if (!p) return [];
    return this.catalog
      .byCollection(p.collectionId)
      .filter((x) => x.id !== p.id)
      .slice(0, 3);
  });

  quantity = signal(1);
  added = signal(false);

  inc(): void {
    this.quantity.update((q) => q + 1);
  }

  dec(): void {
    this.quantity.update((q) => (q > 1 ? q - 1 : 1));
  }

  addToCart(): void {
    const p = this.product();
    if (!p) return;
    this.cart.add(p, this.quantity());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 1800);
  }
}
