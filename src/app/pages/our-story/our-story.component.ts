import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-our-story',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './our-story.component.html',
  styleUrl: './our-story.component.scss',
})
export class OurStoryComponent {
  values = [
    { icon: '🌿', title: 'Consciously Crafted', text: 'Vegan, cruelty-free and made with responsibly sourced ingredients.' },
    { icon: '🧪', title: 'Master Perfumery', text: 'Blended by artisan noses in small batches for depth and longevity.' },
    { icon: '💫', title: 'Made to Mean', text: 'Every scent tells a story — designed to become uniquely yours.' },
    { icon: '♻️', title: 'Thoughtful Packaging', text: 'Refillable bottles and recyclable materials, because secrets should last.' },
  ];

  steps = [
    { no: '01', title: 'The Whisper', text: 'Every fragrance begins as a feeling — a memory, a mood, a secret worth keeping.' },
    { no: '02', title: 'The Blend', text: 'Our perfumers layer rare naturals and modern molecules until the story sings.' },
    { no: '03', title: 'The Reveal', text: 'Bottled by hand and wrapped with care, ready to unfold on your skin.' },
  ];
}
