

import page from "../../node_modules/page/page.mjs"
import { render, html } from "../../node_modules/lit-html/lit-html.js";
import { validateForm } from "../utils/formValidation.js";
import { authenticateUser } from "../middleware/auth.js";

const root = document.getElementById('main-element');

const template = html`
         <!-- Register Page (Only for Guest users) -->
      <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="register-form" @submit=${handleSubmit}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>`;




//Handle the form submission

async function handleSubmit(e) {
    e.preventDefault();

    //Get the form data
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('re-password');




    try {
        // Validate form Data
        validateForm(email, password, repeatPassword);

        //Authenticate (register) user
        const data = await authenticateUser(email, password, 'register');

        page.redirect('/');

    }
    catch (err) {
        alert(err.message);
    }

}
export default async function registerView(ctx) {

    render(template, root);
}         