
var productApi = 'http://localhost:3000/products';
var categoryApi = 'https://dummyjson.com/products/categories';

function start() {
    getItemByApi(categoryApi, renderCategories);
    getItemByApi(productApi + '?_page=1&_limit=12', renderProducts);
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');
    const pageNum = document.querySelector('#pageNum');

    var page = 1;
    pageNum.innerHTML = page;

    nextBtn.addEventListener('click', function() {
        page++;
        pageNum.innerHTML = page;
        getItemByApi(productApi + '?_page=' + page + '&_limit=12', renderProducts);
    })

    prevBtn.addEventListener('click', function() {
        page--;
        pageNum.innerHTML = page;
        getItemByApi(productApi + '?_page=' + page + '&_limit=12', renderProducts);
    })
    
    
}

start();


function getItemByApi(api,callback) {
    fetch(api)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(callback);
}

function renderCategories(category) {
    var listCategories = document.querySelector('#categories');
    let htmls = category.map(function(item) {
        return `
            <li id="category-item" class="inner-item" onclick="getProductByCategory('${item}')">
                ${item}
            </li>
        `
    })
    let htmlString = htmls.join('');
    listCategories.innerHTML = htmlString;
}

function renderProducts(product) {
    var listProducts = document.querySelector('#products');
    let htmls = product.map(function(item) {
        return `
            <div class="inner-product">
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="inner-title">${item.title}</div>
                <div class="inner-info">
                    <div class="inner-price">${item.price}$</div>
                    <div class="inner-stock">Còn lại: ${item.stock}</div>
                </div>
                <div class="inner-discount">-${item.discountPercentage}%</div>
            </div>
        `
    })
    let htmlString = htmls.join('');
    listProducts.innerHTML = htmlString;
}

function getProductByCategory(category) {
    let newApi = productApi + '?category=' + category;
    getItemByApi(newApi, renderProducts);
}


function searchItemByTitle() {
    var searchBtn = document.querySelector('#search');
    searchBtn.addEventListener("click", function() {
        var name = document.querySelector('input[name="title"]').value;
        let searchApi = productApi + "?title=" + name;
        getItemByApi(searchApi, renderProducts);
    })
}

function sortByOption() {
    var option = document.querySelector('#optional');
    let pickOption = option.value;
    if(pickOption == 'default') {
        getItemByApi(productApi, renderProducts);
    }
    else if(pickOption == 'highToLow') {
        getItemByApi(productApi + '?_sort=price&_order=desc', renderProducts);
    }
    else if(pickOption == 'lowToHigh') {
        getItemByApi(productApi + '?_sort=price&_order=asc', renderProducts);
    }
    else if(pickOption == 'discount') {
        getItemByApi(productApi + '?_sort=discountPercentage&_order=desc', renderProducts);
    }
}