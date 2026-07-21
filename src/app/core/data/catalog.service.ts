import { Injectable } from '@angular/core';
import { Collection, Product, QuizQuestion, ScentFamily } from '../models';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly collections: Collection[] = [
    {
      id: 'noir-edit',
      name: 'The Noir Edit',
      subtitle: 'Deep & mysterious',
      description:
        'Our darkest, most magnetic extraits — for those who keep their secrets close.',
      gradient: 'linear-gradient(135deg, #12203a, #2f4a6e)',
      emoji: '🌙',
    },
    {
      id: 'the-elements',
      name: 'The Elements',
      subtitle: 'Vivid & elemental',
      description:
        'Scents drawn from water and fire — bold, expressive and impossible to ignore.',
      gradient: 'linear-gradient(135deg, #0f5a5a, #6a1030)',
      emoji: '💎',
    },
    {
      id: 'discovery',
      name: 'The Discovery',
      subtitle: 'Try them all',
      description:
        'Five signature secrets in one elegant set — the perfect way to find your scent.',
      gradient: 'linear-gradient(135deg, #12203a, #c9a96a)',
      emoji: '🎁',
    },
  ];

  readonly products: Product[] = [
    {
      id: 'azure-noir',
      name: 'Azure Noir',
      tagline: 'Midnight over open water',
      family: 'Fresh',
      gender: 'Masculine',
      price: 145,
      sizeMl: 50,
      description:
        'A cool, magnetic extrait where crisp sea air meets smoky darkness. Bergamot and lavender dive into ambergris and cedar — sophistication with a shadow.',
      notes: {
        top: ['Bergamot', 'Sea Notes'],
        heart: ['Lavender', 'Geranium'],
        base: ['Ambergris', 'Cedar'],
      },
      gradient: 'linear-gradient(160deg, #1b3a5b, #2f6f9f)',
      accent: '#2f6f9f',
      emoji: '🌌',
      bestseller: true,
      rating: 4.8,
      collectionId: 'noir-edit',
    },
    {
      id: 'wild-instinct',
      name: 'Wild Instinct',
      tagline: 'Untamed and unforgettable',
      family: 'Woody',
      gender: 'Masculine',
      price: 155,
      sizeMl: 50,
      description:
        'A bold, animalic extrait for the fearless. Spicy black pepper and cardamom smoulder into leather, tobacco and warm amber.',
      notes: {
        top: ['Black Pepper', 'Cardamom'],
        heart: ['Leather', 'Tobacco'],
        base: ['Amber', 'Oud'],
      },
      gradient: 'linear-gradient(160deg, #5a3a1f, #a9713f)',
      accent: '#a9713f',
      emoji: '🔥',
      bestseller: true,
      rating: 4.9,
      collectionId: 'noir-edit',
    },
    {
      id: 'ocean-drift',
      name: 'Ocean Drift',
      tagline: 'The sea, bottled',
      family: 'Fresh',
      gender: 'Unisex',
      price: 140,
      sizeMl: 50,
      description:
        'A weightless aquatic extrait that captures a breeze off the tide. Sea salt and citrus glide over marine accord, sage and sun-warmed driftwood.',
      notes: {
        top: ['Sea Salt', 'Grapefruit'],
        heart: ['Marine Accord', 'Sage'],
        base: ['Driftwood', 'White Musk'],
      },
      gradient: 'linear-gradient(160deg, #0f5a5a, #3fa9a0)',
      accent: '#3fa9a0',
      emoji: '🌊',
      isNew: true,
      rating: 4.7,
      collectionId: 'the-elements',
    },
    {
      id: 'crimson-crystal',
      name: 'Crimson Crystal',
      tagline: 'A jewel worn on skin',
      family: 'Floral',
      gender: 'Feminine',
      price: 150,
      sizeMl: 50,
      description:
        'A radiant, gem-bright extrait. Saffron and raspberry sparkle over Turkish rose and jasmine, melting into amber and vanilla.',
      notes: {
        top: ['Saffron', 'Raspberry'],
        heart: ['Turkish Rose', 'Jasmine'],
        base: ['Amber', 'Vanilla'],
      },
      gradient: 'linear-gradient(160deg, #6a1030, #c0416a)',
      accent: '#c0416a',
      emoji: '💎',
      bestseller: true,
      isNew: true,
      rating: 4.9,
      collectionId: 'the-elements',
    },
    {
      id: 'mystic-timber',
      name: 'Mystic Timber',
      tagline: 'A secret in the forest',
      family: 'Woody',
      gender: 'Unisex',
      price: 148,
      sizeMl: 50,
      description:
        'A serene, grounding extrait. Pink pepper and bergamot settle into cypress and vetiver, resting on creamy sandalwood and patchouli.',
      notes: {
        top: ['Pink Pepper', 'Bergamot'],
        heart: ['Cypress', 'Vetiver'],
        base: ['Sandalwood', 'Patchouli'],
      },
      gradient: 'linear-gradient(160deg, #26402e, #4f7a52)',
      accent: '#4f7a52',
      emoji: '🌲',
      rating: 4.7,
      collectionId: 'noir-edit',
    },
    {
      id: 'discovery-pack',
      name: 'Discovery Pack',
      tagline: 'Five signature secrets',
      family: 'Fresh',
      gender: 'Unisex',
      price: 45,
      sizeMl: 10,
      description:
        'All five Aromystic signature extraits in elegant 2ml travel vials — Azure Noir, Wild Instinct, Ocean Drift, Crimson Crystal and Mystic Timber. Fully redeemable against your first full-size bottle.',
      notes: {
        top: ['Bergamot', 'Sea Salt', 'Saffron'],
        heart: ['Rose', 'Leather', 'Cypress'],
        base: ['Amber', 'Sandalwood', 'Vanilla'],
      },
      gradient: 'linear-gradient(160deg, #12203a, #c9a96a)',
      accent: '#c9a96a',
      emoji: '🎁',
      rating: 4.9,
      collectionId: 'discovery',
    },
  ];

  readonly quiz: QuizQuestion[] = [
    {
      id: 'mood',
      question: 'What mood are you chasing today?',
      options: [
        { label: 'Cool & mysterious', family: 'Fresh', emoji: '🌌' },
        { label: 'Bold & daring', family: 'Woody', emoji: '🔥' },
        { label: 'Radiant & romantic', family: 'Floral', emoji: '💎' },
        { label: 'Calm & grounded', family: 'Woody', emoji: '🌲' },
        { label: 'Fresh & free', family: 'Fresh', emoji: '🌊' },
      ],
    },
    {
      id: 'setting',
      question: 'Where do you picture wearing it?',
      options: [
        { label: 'A candlelit rooftop', family: 'Woody', emoji: '🌃' },
        { label: 'A blooming garden soirée', family: 'Floral', emoji: '🌹' },
        { label: 'A midnight harbour', family: 'Fresh', emoji: '⚓' },
        { label: 'A walk through the pines', family: 'Woody', emoji: '🌲' },
        { label: 'A breezy coastal escape', family: 'Fresh', emoji: '🏖️' },
      ],
    },
    {
      id: 'secret',
      question: 'Your secret indulgence is...',
      options: [
        { label: 'Crisp ocean air', family: 'Fresh', emoji: '🌊' },
        { label: 'Warm leather & spice', family: 'Woody', emoji: '🧥' },
        { label: 'Deep red roses', family: 'Floral', emoji: '🌹' },
        { label: 'Rich sandalwood', family: 'Woody', emoji: '🪵' },
        { label: 'A twist of citrus', family: 'Fresh', emoji: '🍊' },
      ],
    },
  ];

  getProduct(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getCollection(id: string): Collection | undefined {
    return this.collections.find((c) => c.id === id);
  }

  byCollection(collectionId: string): Product[] {
    return this.products.filter((p) => p.collectionId === collectionId);
  }

  byFamily(family: ScentFamily): Product[] {
    return this.products.filter((p) => p.family === family);
  }

  get bestsellers(): Product[] {
    return this.products.filter((p) => p.bestseller);
  }

  get newArrivals(): Product[] {
    return this.products.filter((p) => p.isNew);
  }
}
