import page from "../../node_modules/page/page.mjs";
import { html, render } from "../../node_modules/lit-html/lit-html.js";
const baseUrl = 'http://localhost:3030';
const root = document.getElementById('main-element');

const editItemTemplate = (item, ctx) => html`
    <section id="edit">
        <div class="form form-item">
            <h2>Edit Your Item</h2>
            <form class="edit-form" @submit=${(e) => editItem(e, ctx)}>
                <input type="text" name="item" id="item" placeholder="Item" value=${item.item} />
                <input type="text" name="imageUrl" id="item-image" value=${item.imageUrl} placeholder="Your item Image URL" />
                <input type="text" name="price" id="price" value=${item.price} placeholder="Price in Euro" />
                <input type="text" name="availability" id="availability" value=${item.availability} placeholder="Availability Information" />
                <input type="text" name="type" id="type" value=${item.type} placeholder="Item Type" />
                <textarea id="description" name="description" placeholder="More About The Item" rows="10" cols="50">${item.description}</textarea>
                <button type="submit">Edit</button>
            </form>
        </div>
    </section>`;



export async function editItemView(ctx) {
    const currentItem = ctx.sharedState.currentItem;

    render(editItemTemplate(currentItem, ctx), root);


}

async function editItem(e, ctx) {
    e.preventDefault();
    const currentItem = ctx.sharedState.currentItem;


    const formData = new FormData(document.querySelector('.edit-form'));
    const formDataObj = Object.fromEntries(formData.entries());

    const hasEmptyValue = Object.values(formDataObj).some(value => value == '');

    if (hasEmptyValue) {
        return alert('All fields are mandatory!');
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.accessToken,
        },
        body: JSON.stringify(formDataObj)
    }



    const response = await fetch(`${baseUrl}/data/cyberpunk/${currentItem._id}`, options);
    if (response.ok) {
        page.redirect(`/data/cyberpunk/${currentItem._id}`);
    }

}


export async function deleteItem(ctx) {
    const userConfirmed = confirm('Are you sure that you want to delete the item?');

    if (userConfirmed) {
        const itemId = ctx.params.itemId;

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': localStorage.accessToken,
            }
        }

        const response = await fetch(`${baseUrl}/data/cyberpunk/${itemId}`, options);

        if (response.ok) {
            page.redirect('/dashboard');
        }
    } else {
        console.log('Do not want to delete! ');
        
    }



}


