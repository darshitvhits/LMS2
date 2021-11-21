const auth = require('../middlewares/auth');

module.exports = app => {
    const pages = require('../controllers/pages.controller');

// Create a new pages
app.post("/page",auth,pages.create);

// Retrieve all pages
app.get("/page", auth,pages.findAll);

// Retrieve a single pages with pagesId
app.get("/page/:pageId",auth, pages.findOne);

// Update a users with pagesId
app.put("/page/:pageId",auth, pages.update);

// Delete a users with pagesId
app.delete("/page/:pageId",auth,pages.delete);
};
