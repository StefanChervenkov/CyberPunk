
import { html, render } from "../../node_modules/lit-html/lit-html.js";
const baseUrl = 'http://localhost:3030';
const root = document.getElementById('main-element');

const itemTemplate = (item) => html`
    <div class="item">
        <img src=${item.imageUrl} alt="itemPicture" />
        <h3 class="model"> ${item.item} </h3>
        <div class="item-info">
          <p class="price">Price: €${item.price}</p>
          <p class="availability">
            ${item.availability}
          </p>
          <p class="type">Type: ${item.type} </p>
        </div>
        <a class="details-btn" href="/data/cyberpunk/${item._id}">Uncover More</a>
      </div>`;

const dashBoardTemplate = (items) => html`
<!-- Dashboard page -->
    <h3 class="heading">Market</h3>
    <section id="dashboard">
      ${items.map(itemTemplate)}
    </section>`;

const noItemsTemplate = html`<h3 class="empty">No Items Yet</h3>`;

export async function dashboardView(ctx) {
    const response = await fetch(`${baseUrl}/data/cyberpunk?sortBy=_createdOn%20desc`);
    if (response.status == 204) {
        render(noItemsTemplate, root);
        return;
    }
    
    const data = await response.json();
    
    render(dashBoardTemplate(data), root);


}

// {
//     "_ownerId": "847ec027-f659-4086-8032-5173e2f9c93a",
//     "item": "Sky Seeker Drone",
//     "imageUrl": "/images/drone.png",
//     "price": "1200",
//     "availability": "Mass-Market Retail, Online Marketplace",
//     "type": "Advanced Surveillance",
//     "description": "The Sky Seeker is an invaluable tool for exploration and surveillance. Its compact size and maneuverability make it ideal for navigating tight spaces and gathering data, while its high-resolution cameras provide clear images even in low-light conditions. With the Sky Seeker, you can stay ahead of the curve in the ever-changing world of cyberpunk.",
//     "_createdOn": 1617194295480,
//     "_id": "136777f5-3277-42ad-b874-76d043b069cb"
// }

