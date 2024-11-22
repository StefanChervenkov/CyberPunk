
import page from "../../node_modules/page/page.mjs";
import { render, html } from "../../node_modules/lit-html/lit-html.js";
import { authenticateUser } from "../middleware/auth.js";
import { validateForm } from "../utils/formValidation.js";
const root = document.getElementById('main-element');
const baseUrl = 'http://localhost:3030';




export default async function logoutView(ctx) {
    const options = {
        headers: {
            'X-Authorization': localStorage.accessToken
        }
    }

    const response = await fetch(`${baseUrl}/users/logout`, options);

    if (response.status == 204) {
        
        localStorage.clear();
        page.redirect('/');


    }
}


