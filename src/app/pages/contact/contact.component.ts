import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  submitted = signal(false);

  faqs = [
    { q: 'How long does shipping take?', a: 'Orders ship within 1–2 business days. Standard delivery arrives in 3–5 days, free over $75.' },
    { q: 'Are your perfumes cruelty-free?', a: 'Always. Every Aromystic fragrance is 100% vegan and never tested on animals.' },
    { q: 'Can I return a fragrance?', a: 'Yes — you have 30 days to send it back for a full refund, even if opened.' },
    { q: 'Do you offer samples?', a: 'Discovery sets with 2ml vials of all eight scents are coming soon. Join our newsletter to be first to know.' },
  ];
  openFaq = signal<number | null>(0);

  toggle(i: number): void {
    this.openFaq.update((v) => (v === i ? null : i));
  }

  submit(): void {
    this.submitted.set(true);
  }
}
