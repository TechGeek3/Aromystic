import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Aromystic — The Scent of Secrets',
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./pages/shop/shop.component').then((m) => m.ShopComponent),
    title: 'Shop · Aromystic',
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
    title: 'Fragrance · Aromystic',
  },
  {
    path: 'collections',
    loadComponent: () =>
      import('./pages/collections/collections.component').then(
        (m) => m.CollectionsComponent
      ),
    title: 'Collections · Aromystic',
  },
  {
    path: 'our-story',
    loadComponent: () =>
      import('./pages/our-story/our-story.component').then(
        (m) => m.OurStoryComponent
      ),
    title: 'Our Story · Aromystic',
  },
  {
    path: 'discover',
    loadComponent: () =>
      import('./pages/discover/discover.component').then(
        (m) => m.DiscoverComponent
      ),
    title: 'Discover Your Scent · Aromystic',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    title: 'Contact · Aromystic',
  },
  { path: '**', redirectTo: '' },
];
