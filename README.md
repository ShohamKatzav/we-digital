# We Digital

We digital is an online store for computers and computer peripheral devices.

## Libraries

Alerts made with the library react-toastify.
Search a Product/Customer/Order made with the library mui/material.
Price slider made with multi-range-slider-react.
Select a product (Add a product to exist order) made with react-select.

## Login

In order to get service every user has to pass a simple identity proceess.
The user need to type username and password in the correct fields.
The user will get alerts for invalid input or fields which left empty.
Users information stored in JSON file.


## Navigate Bar

Every user has his own responsive bar.
User who authorized as admin will be able to see more options than customer in his bar.

## Navigate options for customer

### Home

Return to home page.

### My Orders

Every customer able to view and cancel his active orders by pressing the 'My Orders' navigate button.

### About

Information about the store and its services.

### Logout

Logout the connected user.

## Navigate options for admin

### Manage categories

In this page admin can Add/Edit/Remove categories which store in localStorage.
The user will get alerts for empty fields or invalid input ("Category already exist").

### Manage products
Admin can perform the actions Add/Edit/Remove for the products which store in localStorage.
The user will get alerts for empty fields or invalid input ("Products with the same name exist").

1) Add product:

In order to add a product, admin will have to provide the followin information:
* Product name
* Product category
* Product image (Default image, Image by url or Upload an image);
* Manufacturers name
* Price

2) Edit product:

Admin can edit every field from those which mentioned above by checking his checkbox and providing the new value;

3) Remove product:

Remove an item by selecting the item and clicking the "Remove Product" button.

### Manage orders

1) Add order:

After choosing a custumer and adding products the admin will create an order by clicking on the "Create order" button.

2) Edit order:

Allow the admin to change the owner of the order or the products in it.

3) Remove order:

Cancel the order.

4) Search order:

Search an order by Id or Owner. Orders grouped by owners.
Clicking on the search result will lead to order details page.

### Customers

Clickable table with the names of the users.
Click on user name will lead to user detail page.
In user details page admin can view active orders by clickng "Orders" button.

Admin can also search a user by his name in the page.
Clicking on the search result will lead to user details page.

## Home Page

### Categories bar

This bar include the categories which stored in localStorage.

## Shoping Cart

Include details for the current order.
The customer can creat the order or descard it.

## Category

In category page theres a table and inside it the products which belong to it.
The user can filter the products by manufacturer or price.
After choosing his product the customer will be able to add it to his shoping cart (session storage).

### Products search

User can search a product by his name.
All the products grouped by category.
Clicking on the search result will lead to products details page.

### Some of our products

With every reload 4 random products will be feature.

### Footer

Include ways to contact the store's staff.
