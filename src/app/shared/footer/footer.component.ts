import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container footer-grid">
        <div class="fcol brand">
          <div class="flogo">
            <span class="flogo-badge"><img src="logo.png" alt="Aromystic" /></span>
            <span>Aromystic</span>
          </div>
          <p>The scent of secrets — artisan extraits de parfum crafted to enchant, layer by layer.</p>
          <div class="socials">
            <a href="https://instagram.com/aromystic.in" target="_blank" rel="noopener" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Pinterest">📌</a>
            <a href="#" aria-label="TikTok">🎵</a>
          </div>
        </div>

        <div class="fcol">
          <h4>Explore</h4>
          <a routerLink="/shop">Shop All</a>
          <a routerLink="/collections">Collections</a>
          <a routerLink="/discover">Discover Your Scent</a>
          <a routerLink="/our-story">Our Story</a>
        </div>

        <div class="fcol">
          <h4>Help</h4>
          <a routerLink="/contact">Contact Us</a>
          <a href="#">Shipping &amp; Returns</a>
          <a href="#">FAQ</a>
          <a href="#">Track Order</a>
        </div>

        <div class="fcol newsletter">
          <h4>Join the Secret</h4>
          <p>Get 10% off your first bottle and early access to new drops.</p>
          <form class="nl-form" (submit)="$event.preventDefault()">
            <input type="email" placeholder="Your email" aria-label="Email" required />
            <button type="submit" class="btn btn-primary">Join</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom container">
        <span>© {{ year }} Aromystic. All secrets reserved.</span>
        <span>Made with 🤍 · Mock showcase</span>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background: var(--navy); color: rgba(255,255,255,.8); padding: 4rem 0 1.5rem; margin-top: 3rem; }
    .footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1.4fr; gap: 2.5rem; }
    .flogo { display: flex; align-items: center; gap: .6rem; font-family: var(--font-serif); font-size: 1.4rem; color: var(--gold); }
    .flogo-badge { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; box-shadow: 0 0 0 1.5px rgba(201,169,106,.5); flex-shrink: 0; }
    .flogo-badge img { width: 100%; height: 150%; object-fit: cover; object-position: center 22%; }
    .brand p { color: rgba(255,255,255,.6); font-size: .9rem; margin: 1rem 0; max-width: 32ch; }
    .socials { display: flex; gap: .6rem; }
    .socials a { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,.08); border: 1px solid rgba(201,169,106,.3); transition: transform .2s ease, background .2s ease; }
    .socials a:hover { transform: translateY(-3px); background: rgba(201,169,106,.25); }
    .fcol h4 { font-size: 1rem; margin: 0 0 1rem; color: #fff; }
    .fcol a { display: block; color: rgba(255,255,255,.6); font-size: .88rem; padding: .3rem 0; transition: color .2s ease; }
    .fcol a:hover { color: var(--gold); }
    .newsletter p { color: rgba(255,255,255,.6); font-size: .88rem; margin: 0 0 1rem; }
    .nl-form { display: flex; gap: .5rem; }
    .nl-form input { flex: 1; border: 1px solid rgba(255,255,255,.2); border-radius: 50px; padding: .7rem 1rem; font-family: var(--font-sans); background: rgba(255,255,255,.06); color: #fff; }
    .nl-form input::placeholder { color: rgba(255,255,255,.45); }
    .nl-form input:focus { outline: 2px solid var(--gold); }
    .footer-bottom { display: flex; justify-content: space-between; padding-top: 2.5rem; margin-top: 2.5rem; border-top: 1px solid rgba(255,255,255,.12); font-size: .8rem; color: rgba(255,255,255,.5); }
    @media (max-width: 820px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .footer-bottom { flex-direction: column; gap: .5rem; text-align: center; }
    }
  `],
})
export class FooterComponent {
  year = new Date().getFullYear();
}
