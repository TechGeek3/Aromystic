import { Component, computed, inject, signal } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/data/catalog.service';
import { ProductTileComponent } from '../../shared/product-tile/product-tile.component';
import { Product, ScentFamily } from '../../core/models';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [RouterLink, ProductTileComponent, LowerCasePipe],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss',
})
export class DiscoverComponent {
  private catalog = inject(CatalogService);
  questions = this.catalog.quiz;

  current = signal(0);
  answers = signal<ScentFamily[]>([]);
  finished = signal(false);

  progress = computed(() =>
    Math.round((this.current() / this.questions.length) * 100)
  );

  result = computed<{ family: ScentFamily; matches: Product[] } | null>(() => {
    if (!this.finished()) return null;
    const tally = new Map<ScentFamily, number>();
    for (const f of this.answers()) {
      tally.set(f, (tally.get(f) ?? 0) + 1);
    }
    let winner: ScentFamily = 'Floral';
    let max = -1;
    for (const [family, count] of tally) {
      if (count > max) {
        max = count;
        winner = family;
      }
    }
    const matches = this.catalog.byFamily(winner);
    return { family: winner, matches };
  });

  choose(family: ScentFamily): void {
    this.answers.update((a) => [...a, family]);
    if (this.current() + 1 >= this.questions.length) {
      this.finished.set(true);
    } else {
      this.current.update((c) => c + 1);
    }
  }

  restart(): void {
    this.current.set(0);
    this.answers.set([]);
    this.finished.set(false);
  }
}
