
const productApi = 'http://localhost:3000/products';
const categoryApi = 'https://dummyjson.com/products/categories';
const listCategories = document.querySelector('#categories');
const listProducts = document.querySelector('#products');
const searchBtn = document.querySelector('#search');
const option = document.querySelector('#optional');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const pageNum = document.querySelector('#pageNum');

let params = {
    sort: "",
    order: "",
    page: "1",
    limit: "12",
    q: "",
    category: "",
};

function getNewApi() {
    let category = "";
    if(params.category != "") {
        category = `&category=${params.category}`
    }
    let newApi = `${productApi}?_sort=${params.sort}&_order=${params.order}&_page=${params.page}&_limit=${params.limit}&q=${params.q}${category}`;
    return newApi;
}

function start() {
    getItemByApi(categoryApi, renderCategories);
    let newApi = getNewApi();
    getItemByApi(newApi, renderProducts);
    paginateProduct();
    searchItemByTitle();
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
    params.category = category;
    params.page = 1;
    pageNum.innerHTML = params.page;
    let newApi = getNewApi();
    getItemByApi(newApi, renderProducts);
}

function paginateProduct() {
    
    pageNum.innerHTML = params.page;
    nextBtn.addEventListener('click', function() {
        params.page++;
        pageNum.innerHTML = params.page;
        let newApi = getNewApi();
        getItemByApi(newApi, renderProducts);
    })

    prevBtn.addEventListener('click', function() {
        params.page--;
        if(params.page < 1) params.page = 1;
        pageNum.innerHTML = params.page;
        let newApi = getNewApi();
        getItemByApi(newApi, renderProducts);
    })
}

function searchItemByTitle() {
    searchBtn.addEventListener("click", function() {
        var name = document.querySelector('input[name="title"]').value;
        params.q = name;
        params.page = 1;
        pageNum.innerHTML = params.page;
        let newApi = getNewApi();
        getItemByApi(newApi, renderProducts);
    })
}

function sortByOption() {
    let pickOption = option.value;
    if(pickOption == 'default') {
        params.page = 1;
        pageNum.innerHTML = params.page;
        params.sort = "";
        params.order = "";
        let newApi = getNewApi();
        getItemByApi(newApi, renderProducts);
    }
    else if(pickOption == 'highToLow') {
        params.page = 1;
        pageNum.innerHTML = params.page;
        params.sort = 'price';
        params.order = 'desc';
        let newApi = getNewApi();
        getItemByApi(newApi, renderProducts);
    }
    else if(pickOption == 'lowToHigh') {
        params.page = 1;
        pageNum.innerHTML = params.page;
        params.sort = 'price';
        params.order = 'asc';
        let newApi = getNewApi();
        getItemByApi(newApi, renderProducts);
    }
    else if(pickOption == 'discount') {
        params.page = 1;
        pageNum.innerHTML = params.page;
        params.sort = 'discountPercentage';
        params.order = 'desc';
        let newApi = getNewApi();
        getItemByApi(newApi, renderProducts);
    }
}