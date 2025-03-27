README for React Product Listing Project

Live Demo -  https://gaurav-product-listing-page.netlify.app/

Overview

This is a React-based web application for product listing and categorization. It features a dynamic UI with product categories, pagination, listing modes, and an interactive shopping cart. The app fetches data from a dummy API, making it easy to integrate and extend for real-world use cases.

Features

Product Listing: View products with grid and list layouts.

Category Filtering: Browse products by categories fetched dynamically.

Pagination: Navigate through products with efficient page control.

Search Query Integration: Sync page navigation with URL parameters for better user experience.

Cart Management: Add products to a shopping cart.


Components

Home: Main page for displaying products and categories.

CategriesListing: Sidebar for category navigation.

Productlisting: Dynamic product grid/list view.

Pagination: Handles product pagination.

API

The app uses dummyjson.com as the data source.

Categories: https://dummyjson.com/products/categories

Products: https://dummyjson.com/products or https://dummyjson.com/products/category/:slug

Customization

You can replace the dummy API with your backend by updating the API URLs in the fetchcategries and fetchproducts methods.

Technologies

Frontend: React, React Router, Context API

Styling: Tailwind CSS

HTTP Requests: Axios

Contribution

Feel free to fork this repository and submit pull requests for improvements or feature additions.
