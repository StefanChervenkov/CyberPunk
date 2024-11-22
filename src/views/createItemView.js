import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
const baseUrl = 'http://localhost:3030';
const root = document.getElementById('main-element');

const createItemTemplate = html`
    <section id="create">
        <div class="form form-item">
            <h2>Share Your item</h2> 
            <form class="create-form">
                <input type="text" name="item" id="item"  placeholder="Item"  />
                <input type="text" name="imageUrl" id="item-image"  placeholder="Your item Image URL" />
                <input type="text" name="price" id="price"  placeholder="Price in Euro" />
                <input type="text" name="availability" id="availability" placeholder="Availability Information" />
                <input type="text" name="type" id="type"  placeholder="Item Type" />
                <textarea id="description" name="description"    placeholder="More About The Item" rows="10" cols="50"></textarea>
                <button type="submit" @click=${createItem}>Add</button>
            </form>
        </div>
    </section>`;




export async function createItemView(ctx) {

    render(createItemTemplate, root);

    
    
    
}

async function createItem(e) {
    e.preventDefault();
    const formData = new FormData(document.querySelector('.create-form'));
    const formDataObj = Object.fromEntries(formData.entries());

    const hasEmptyValue = Object.values(formDataObj).some(value => value == '');

    if (hasEmptyValue) {
        return alert('All fields are mandatory!');
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.accessToken,
        },
        body: JSON.stringify(formDataObj)
    }

    const response = await fetch(`${baseUrl}/data/cyberpunk`, options);
    if (response.ok) {
        page.redirect('/dashboard');
    }
 
}


