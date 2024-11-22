import page from "../node_modules/page/page.mjs"
import { authMiddleware } from "./middleware/auth.js";
import { setNavigation } from "./middleware/navigation.js";
import { shareState } from "./middleware/sharedState.js";
import { createItemView } from "./views/createItemView.js";
import { dashboardView } from "./views/dashboardView.js";
import { detailsView } from "./views/detailsView.js";
import { deleteItem, editItemView } from "./views/editItemView.js";
import homeView from "./views/homeView.js";
import loginView from "./views/loginView.js";
import logoutView from "./views/logoutView.js";
import registerView from "./views/registerView.js";


//Middleware

page(authMiddleware);
page(setNavigation);
page(shareState);

//Routes
page('/', homeView);

// Auth routes
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);

//Dashboard routes
page('/dashboard', dashboardView)
page('/dashboard/item/edit', editItemView)
page('/dashboard/item/delete/:itemId', deleteItem)
page('/data/cyberpunk/:id', detailsView)



page('/dashboard/item/create', createItemView)



// Start the routing
page.start();
