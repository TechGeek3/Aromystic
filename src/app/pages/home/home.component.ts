import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/data/catalog.service';
import { ProductTileComponent } from '../../shared/product-tile/product-tile.component';
import { CollectionTileComponent } from '../../shared/collection-tile/collection-tile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductTileComponent, CollectionTileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private catalog = inject(CatalogService);
  collections = this.catalog.collections;
  bestsellers = this.catalog.bestsellers;
  newArrivals = this.catalog.newArrivals;

  perks = [
    { icon: '🌿', title: 'Clean Ingredients', text: 'Vegan, cruelty-free & responsibly sourced.' },
    { icon: '🎁', title: 'Free Gift Wrap', text: 'Every secret arrives beautifully wrapped.' },
    { icon: '🚚', title: 'Free Shipping', text: 'Complimentary delivery over $75.' },
    { icon: '↩️', title: '30-Day Returns', text: 'Not enchanted? Send it back, no fuss.' },
  ];

  testimonials = [
    { name: 'Isla M.', text: 'Veiled Rose is my signature now. Strangers stop me to ask what I’m wearing!', emoji: '🌹' },
    { name: 'Rohan K.', text: 'Noir Amber is dangerously good. Lasts all day and turns heads everywhere.', emoji: '🖤' },
    { name: 'Priya S.', text: 'The scent quiz matched me perfectly with Citrine Glow. Pure sunshine.', emoji: '🍋' },
  ];
}
