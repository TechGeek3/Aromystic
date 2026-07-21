import { Component, computed, inject, signal } from '@angular/core';
import { CatalogService } from '../../core/data/catalog.service';
import { ProductTileComponent } from '../../shared/product-tile/product-tile.component';
import { ScentFamily } from '../../core/models';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductTileComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  private catalog = inject(CatalogService);

  families: (ScentFamily | 'All')[] = ['All', 'Floral', 'Woody', 'Citrus', 'Oriental', 'Fresh'];
  genders = ['All', 'Feminine', 'Masculine', 'Unisex'];
  sorts = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'rating', label: 'Top Rated' },
  ];

  activeFamily = signal<ScentFamily | 'All'>('All');
  activeGender = signal<string>('All');
  activeSort = signal<string>('featured');

  products = computed(() => {
    let list = [...this.catalog.products];
    const fam = this.activeFamily();
    const gen = this.activeGender();

    if (fam !== 'All') list = list.filter((p) => p.family === fam);
    if (gen !== 'All') list = list.filter((p) => p.gender === gen);

    switch (this.activeSort()) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => Number(b.bestseller ?? 0) - Number(a.bestseller ?? 0));
    }
    return list;
  });

  setFamily(f: ScentFamily | 'All'): void {
    this.activeFamily.set(f);
  }

  setGender(g: string): void {
    this.activeGender.set(g);
  }

  onSort(event: Event): void {
    this.activeSort.set((event.target as HTMLSelectElement).value);
  }
}
