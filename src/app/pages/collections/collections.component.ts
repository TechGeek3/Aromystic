import { Component, inject } from '@angular/core';
import { CatalogService } from '../../core/data/catalog.service';
import { ProductTileComponent } from '../../shared/product-tile/product-tile.component';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [ProductTileComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent {
  private catalog = inject(CatalogService);
  collections = this.catalog.collections;

  productsOf(id: string) {
    return this.catalog.byCollection(id);
  }
}
