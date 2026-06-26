/* ========================================
   PRODUCTS PAGE - DYNAMIC PRODUCT LOADING
   ======================================== */
   

/**
 * Get URL parameter value
 * @param {string} param - Parameter name to retrieve
 * @returns {string|null} Parameter value or null if not found
 */
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Load products data from JSON file
 * @returns {Promise} Promise that resolves with products data
 */
async function loadProducts() {
    try {
        const response = await fetch('../../assets/data/products.json');
        if (!response.ok) {
            throw new Error('Failed to load products data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading products:', error);
        return { categories: [] };
    }
}

/**
 * Render products to the grid
 * @param {Array} products - Array of product objects to render
 */
function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!products || products.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <p>No products available in this category.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => {
        // Adjust image path from JSON context (root-relative) to products.html context
        const imagePath = product.image 
            ? `../../${product.image}`
            : '../../assets/images/product-card1.png';
        
        return `
        <div class="product-item">
            <img src="${imagePath}" 
                 alt="${product.name}" 
                 class="product-image"
                 onerror="this.src='../../assets/images/product-card1.png'">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description || 'Premium quality product'}</p>

                <div class="enquire-btn" onclick="enquireProduct('${product.id || ''}', '${product.name}')">
                    <i class="bi bi-arrow-up-right"></i>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

/**
 * Update page header based on category
 * @param {string} category - Category name
 * @param {Object} categoryData - Category data object
 */
function updatePageHeader(category, categoryData) {
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryDescription = document.getElementById('categoryDescription');
    
    if (categoryTitle && categoryData) {
        categoryTitle.textContent = categoryData.title || category;
    }
    
    if (categoryDescription && categoryData) {
        categoryDescription.textContent = categoryData.description || 'Browse our collection';
    }
}

/**
 * Enquire product - handle enquiry action
 * @param {string} productId - ID of the product
 * @param {string} productName - Name of the product
 */
function enquireProduct(productId, productName) {
    // Could be connected to a contact form or modal
    console.log(`Enquiry for: ${productName} (ID: ${productId})`);
    alert(`Thank you for your interest in ${productName}!\n\nPlease contact us for more information.`);
    // TODO: Implement actual enquiry functionality (e.g., scroll to contact form, open modal)
}

/**
 * Initialize products page
 */
async function initProductsPage() {
    const category = getUrlParam('category');
    
    if (!category) {
        document.getElementById('productsGrid').innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <p>No category specified. Please select a category from the home page.</p>
            </div>
        `;
        return;
    }

    // Load products data
    const data = await loadProducts();
    
    // Find category data
    const categoryData = data.categories?.find(
        cat => cat.id === category || cat.title.toLowerCase().replace(/\s+/g, '-') === category
    );
    
    if (categoryData) {
        updatePageHeader(category, categoryData);
        renderProducts(categoryData.products);
    } else {
        // If no exact match, show all products or a message
        console.warn(`Category "${category}" not found`);
        document.getElementById('productsGrid').innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <p>Category not found. Please try selecting another category.</p>
            </div>
        `;
    }
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', initProductsPage);




                