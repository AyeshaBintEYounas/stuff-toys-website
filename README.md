# Stuff Toys — Static Website Assignment

## Pages
- `index.html` — Home
- `about.html` — About + FAQ accordion
- `products.html` — Products + search/sort + cart buttons
- `gallery.html` — Gallery + image modal
- `contact.html` — Contact form + client-side validation
- `cart.html` — JavaScript localStorage cart

## Folder structure
```
Stuff-Toys-Website/
├── index.html
├── about.html
├── products.html
├── gallery.html
├── contact.html
├── cart.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── existing project images
└── README.md
```

## JavaScript features
1. Responsive hamburger navigation.
2. Client-side contact form validation.
3. Product search and sorting.
4. Gallery modal/lightbox.
5. FAQ accordion.
6. Add-to-cart, quantity changes, remove item and localStorage persistence.

## Run
Open `index.html` in a browser. No backend is required.

## Git/GitHub workflow
```bash
git init
git add .
git commit -m "Initial project setup"

git branch -M main
git branch feature-navbar
git branch feature-home
git branch feature-products
git branch feature-gallery
git branch feature-contact

# Work on each feature branch, then:
git add .
git commit -m "Add responsive navigation"
git checkout main
git merge feature-navbar

# Repeat for the other feature branches.
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Use meaningful commits such as:
- `Add responsive navigation and mobile menu`
- `Create responsive home page`
- `Add product search and sorting`
- `Add gallery modal interaction`
- `Add contact form validation`
- `Add localStorage shopping cart`
Website deployment update.
