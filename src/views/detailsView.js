import { html, nothing, render } from "../../node_modules/lit-html/lit-html.js";
const baseUrl = 'http://localhost:3030';
const root = document.getElementById('main-element');


const detailsTemplate = (item, isCreator) => html`
    <!-- Details page -->

    <section id="details">
      <div id="details-wrapper">
        <div>
          <img id="details-img" src=${item.imageUrl} alt="itemPicture" />
          <p id="details-title"> ${item.item} </p>
        </div>
        <div id="info-wrapper">
          <div id="details-description">
            <p class="details-price">Price: €${item.price}</p>
            <p class="details-availability">
              ${item.availability}
            </p>
            <p class="type">Type: ${item.type}</p>
            <p id="item-description">
              ${item.description}
            </p>
          </div>
          ${isCreator ? html`
          <div id="action-buttons">
            <a href="/dashboard/item/edit" id="edit-btn">Edit</a>
            <a href=${`/dashboard/item/delete/${item._id}`} id="delete-btn">Delete</a>
          </div>` : nothing}

        </div>
      </div>
    </section>`;


export async function detailsView(ctx) {
  const itemId = ctx.params.id;
  const response = await fetch(`${baseUrl}/data/cyberpunk/${itemId}`);
  const itemData = await response.json();

  //add the current item to the context
  ctx.sharedState.currentItem = itemData; 
  
  //check if the current user is the creator
  const isCreator = ctx.user ? ctx.user._id === itemData._ownerId : false;

  render(detailsTemplate(itemData, isCreator), root);

}

// {
//     "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
//     "item": "Synoptic Eye Tablet",
//     "imageUrl": "/images/tablet.png",
//     "price": "1000",
//     "availability": "Premium retailers, exclusive online stores",
//     "type": "Premium Tech",
//     "description": "The Synoptic Eye is an essential tool for any cyberpunk, providing a portal to the digital world and enhancing your perception of reality. Its holographic display projects information onto your field of vision, making it easy to stay connected and in control, even in the midst of the urban jungle.",
//     "_createdOn": 1617194210928,
//     "_id": "1840a313-225c-416a-817a-9954d4609f7c"
// }