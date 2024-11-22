
import { render, html } from "../../node_modules/lit-html/lit-html.js";
const root = document.getElementById('main-element');

const template = html`
        <!-- Home page -->
        <section id="hero">
        <img src="./images/home.png" alt="home" />
        <p>We know who you are, we will contact you</p>
         </section>`;





export default function homeView(ctx) {
    render(template, root);
}         