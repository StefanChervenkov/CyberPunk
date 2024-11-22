
import page from "../../node_modules/page/page.mjs";
import { render, html } from "../../node_modules/lit-html/lit-html.js";
import { authenticateUser } from "../middleware/auth.js";
import { validateForm } from "../utils/formValidation.js";
const root = document.getElementById('main-element');

const template = html`
       <!-- Login Page (Only for Guest users) -->
      <section id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form" @submit=${handleSubmit}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
      </section>`;


async function handleSubmit(e) {
    e.preventDefault();

    //Get the form data
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
        // Validate form data
        validateForm(email, password);

        //Authenticate (login) user
        const data = await authenticateUser(email, password, 'login');

        page.redirect('/');


    } catch (error) {
        alert(error.message);
    }
    
}

export default function loginView(ctx) {

    render(template, root);
}         