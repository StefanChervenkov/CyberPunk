import { html, render } from "../../node_modules/lit-html/lit-html.js";
const navWrapper = document.getElementById('wrapper');


export function setNavigation(ctx, next) {
    const isLoggedIn = ctx.user;
    
    const userNavTemplate = html`
    <header>
      <!-- Navigation -->
      <a id="logo" href="/"><img id="logo" src="./images/logo.png" alt="img" /></a>
      <nav>
        <div>
          <a href="/dashboard">Market</a>
        </div>

        <!-- Logged-in users -->
        <div class="user">
          <a href="/dashboard/item/create">Sell</a>
          <a href="/logout">Logout</a>
        </div>

        
      </nav>
    </header>
    `;
    const guestNavTemplate = html`
    <header>
      <!-- Navigation -->
      <a id="logo" href="/"><img id="logo" src="./images/logo.png" alt="img" /></a>
      <nav>
        <div>
          <a href="/dashboard">Market</a>
        </div>


        <!-- Guest users -->
        <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </nav>
    </header>
    `;


    if (isLoggedIn) {
        render(userNavTemplate, navWrapper);
        
    } else {
        render(guestNavTemplate, navWrapper)
        
    }
    
    next();
}