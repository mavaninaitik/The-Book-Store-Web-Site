// --- DATA ---
const booksData = [
    { id: 1, title: 'The Shadow of the Wind', author: 'Carlos Ruiz Zafón', price: 18.99, genre: 'Thriller', cover: 'https://img1.od-cdn.com/ImageType-400/1523-1/509/813/CA/%7B509813CA-82D9-4E47-928D-F50A0324B4E6%7DImg400.jpg' },
    { id: 2, title: 'Project Hail Mary', author: 'Andy Weir', price: 22.50, genre: 'Sci-Fi', cover: 'https://imgv2-1-f.scribdassets.com/img/word_document/769865584/original/216x287/cbdb54937e/1756015642?v=1' },
    { id: 3, title: 'The Name of the Wind', author: 'Patrick Rothfuss', price: 20.00, genre: 'Fantasy', cover: 'https://m.media-amazon.com/images/I/611iKJa7a-L.jpg' },
    { id: 4, title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', price: 25.00, genre: 'History', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1420585954l/23692271.jpg' },
    { id: 5, title: 'Dune', author: 'Frank Herbert', price: 19.99, genre: 'Sci-Fi', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1434908555l/234225.jpg' },
    { id: 6, title: 'Circe', author: 'Madeline Miller', price: 17.50, genre: 'Fantasy', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565909496l/35959740.jpg' },
    { id: 7, title: 'Gone Girl', author: 'Gillian Flynn', price: 15.00, genre: 'Thriller', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554086139l/19288043.jpg' },
    { id: 8, title: 'The Guns of August', author: 'Barbara W. Tuchman', price: 21.00, genre: 'History', cover: 'https://m.media-amazon.com/images/I/71vkxIftlzL._UF1000,1000_QL80_.jpg' },
    { id: 9, title: 'Mistborn: The Final Empire', author: 'Brandon Sanderson', price: 22.99, genre: 'Fantasy', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc9qkQGrpgajgmvr0QzeqQpRjDWNYGy2N3h0NiBt8SjB5rzkVmvW-b0s9vUJQqmpqs-VU&usqp=CAU' },
    { id: 10, title: 'The Martian', author: 'Andy Weir', price: 16.99, genre: 'Sci-Fi', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1413706054l/18007564.jpg' },
    { id: 11, title: 'The Silent Patient', author: 'Alex Michaelides', price: 14.99, genre: 'Thriller', cover: 'https://emedicodiary.com/images/books/64cc1fc52646aa176937d4ae350e11fa.jpg' },
    { id: 12, title: 'Educated: A Memoir', author: 'Tara Westover', price: 18.00, genre: 'History', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635l/35133922.jpg' },
    { id: 13, title: 'Pride and Prejudice', author: 'Jane Austen', price: 12.99, genre: 'Romance', cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351l/1885.jpg' },
    { id: 14, title: 'The Notebook', author: 'Nicholas Sparks', price: 15.50, genre: 'Romance', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvzEo4TuYA7wo3JaGJi4cKRv4LJbVjBXYrzQ&s' }
];

let cart = [];

// --- PAGE NAVIGATION ---
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');

function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active', 'fade-in');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.id === `nav-${pageId}`) {
            link.classList.add('active');
        }
    });

    const newPage = document.getElementById(pageId);
    if (newPage) {
        newPage.classList.add('active');
        // Use a short timeout to allow the display property to change before adding animation class
        setTimeout(() => newPage.classList.add('fade-in'), 10);
    }
     // Close mobile menu on navigation
    document.getElementById('mobile-menu').classList.add('hidden');
}

// --- BOOK RENDERING & SEARCH ---
const featuredBooksContainer = document.getElementById('featured-books');
const booksGridContainer = document.getElementById('books-grid');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');

function createBookCard(book) {
    return `
        <div class="book-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src="${book.cover}" alt="Cover of ${book.title}" class="w-full h-72 object-cover">
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-xl font-bold font-serif mb-1">${book.title}</h3>
                <p class="text-slate-600 mb-4">by ${book.author}</p>
                <div class="mt-auto gap-5 flex justify-between items-center">
                    <span class="text-2xl font-bold text-[#D35400]">$${book.price.toFixed(2)}</span>
                    <button class="btn-secondary  px-4 py-2 rounded-lg font-semibold text-sm" onclick="addToCart(${book.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

function renderBooks(genreFilter = 'all', searchTerm = '') {
    booksGridContainer.innerHTML = '';
    
    let filteredBooks = genreFilter === 'all' 
        ? booksData 
        : booksData.filter(book => book.genre === genreFilter);

    const lowercasedSearchTerm = searchTerm.toLowerCase().trim();
    if (lowercasedSearchTerm) {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(lowercasedSearchTerm) || 
            book.author.toLowerCase().includes(lowercasedSearchTerm)
        );
    }
    
    if(filteredBooks.length === 0) {
         booksGridContainer.innerHTML = `<p class="text-center text-slate-500 col-span-full py-10 text-lg">No books found matching your criteria.</p>`;
    } else {
         filteredBooks.forEach(book => {
            booksGridContainer.innerHTML += createBookCard(book);
        });
    }
}

function renderFeaturedBooks() {
    // This check is necessary because the element only exists on the home page
    if (featuredBooksContainer) {
        const featured = booksData.slice(0, 4);
        featuredBooksContainer.innerHTML = '';
        featured.forEach(book => {
            featuredBooksContainer.innerHTML += createBookCard(book);
        });
    }
}

// --- FILTERING & SEARCH EVENT LISTENERS ---
const filterButtons = document.querySelectorAll('.filter-btn');

function handleSearchAndFilter() {
    const searchTerm = searchInput.value;
    const activeGenreButton = document.querySelector('.filter-btn.active');
    const genreFilter = activeGenreButton ? activeGenreButton.dataset.genre : 'all';
    renderBooks(genreFilter, searchTerm);
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => {
            btn.classList.remove('active', 'bg-[#D35400]', 'text-white');
            btn.classList.add('bg-white', 'text-slate-700');
        });
        button.classList.add('active', 'bg-[#D35400]', 'text-white');
        button.classList.remove('bg-white', 'text-slate-700');
        handleSearchAndFilter();
    });
});

if (searchButton && searchInput) {
    searchButton.addEventListener('click', handleSearchAndFilter);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleSearchAndFilter();
        }
    });
}


// --- CART LOGIC ---
const cartCountElement = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items-list');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartShippingEl = document.getElementById('cart-shipping');
const cartTotalEl = document.getElementById('cart-total');
const orderSummaryContainer = document.getElementById('order-summary-container');


function addToCart(bookId) {
    const book = booksData.find(b => b.id === bookId);
    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...book, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    updateCart();
}

function updateCartQuantity(bookId, newQuantity) {
    const item = cart.find(i => i.id === bookId);
    if (item) {
        item.quantity = newQuantity;
        if(item.quantity <= 0) {
           removeFromCart(bookId);
        } else {
           updateCart();
        }
    }
}

function updateCart() {
    renderCartItems();
    updateCartSummary();
    if(cartCountElement) {
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

function renderCartItems() {
    if (cartItemsList) { // Check if we are on a page with a cart
        if (cart.length === 0) {
            cartItemsList.innerHTML = '';
            emptyCartMessage.style.display = 'block';
            orderSummaryContainer.style.display = 'none'; // Hide summary if cart is empty
        } else {
            emptyCartMessage.style.display = 'none';
            orderSummaryContainer.style.display = 'block';
            cartItemsList.innerHTML = cart.map(item => `
                <div class="flex items-center gap-6 border-b py-4">
                    <img src="${item.cover}" alt="${item.title}" class="w-20 h-28 object-cover rounded-md">
                    <div class="flex-grow">
                        <h4 class="font-bold text-lg">${item.title}</h4>
                        <p class="text-sm text-slate-500">${item.author}</p>
                        <button class="text-white bg-orange-500 p-1 rounded text-sm mt-1 hover:bg-orange-800" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                    <div class="flex items-center gap-2">
                         <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${item.id}, this.valueAsNumber)" class="w-16 p-2 border rounded-md text-center">
                    </div>
                    <p class="font-semibold text-lg w-24 text-right">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `).join('');
        }
    }
}

function updateCartSummary() {
    if (cartSubtotalEl) { // Check if we are on a page with a cart summary
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = cart.length > 0 ? 5.00 : 0;
        const total = subtotal + shipping;

        cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        cartShippingEl.textContent = `$${shipping.toFixed(2)}`;
        cartTotalEl.textContent = `$${total.toFixed(2)}`;
        
        const checkoutBtn = document.getElementById('checkout-btn');
        checkoutBtn.disabled = cart.length === 0;
        if (cart.length === 0) {
             checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
             checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
}

// --- CHECKOUT AND MODAL ---
const checkoutFormContainer = document.getElementById('checkout-form-container');
const cartContentContainer = document.getElementById('cart-content');
const successModal = document.getElementById('success-modal');
const paymentForm = document.getElementById('payment-form');

function showCheckoutForm() {
    if (checkoutFormContainer && cartContentContainer) {
        checkoutFormContainer.classList.remove('hidden');
        cartContentContainer.classList.add('hidden');
    }
}

if(paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        successModal.classList.remove('hidden');
        successModal.querySelector('div').classList.add('scale-100');
        
        cart = [];
        updateCart();
        checkoutFormContainer.classList.add('hidden');
        cartContentContainer.classList.remove('hidden');
        paymentForm.reset();
    });
}

function closeModal() {
    if (successModal) {
        successModal.classList.add('hidden');
        successModal.querySelector('div').classList.remove('scale-100');
        showPage('home');
    }
}

// --- MOBILE MENU ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}


// --- INITIAL LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedBooks();
    renderBooks();
    showPage('home');
    updateCart(); // Initialize cart view on load
});

