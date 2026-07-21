import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from '../models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();

  readonly count = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity, 0)
  );

  readonly total = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity * i.product.price, 0)
  );

  add(product: Product, quantity = 1): void {
    this.items.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...items, { product, quantity }];
    });
  }

  remove(productId: string): void {
    this.items.update((items) =>
      items.filter((i) => i.product.id !== productId)
    );
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this.items.update((items) =>
      items.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  }

  clear(): void {
    this.items.set([]);
  }
}
