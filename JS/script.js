let products;

const api = async ({endpoint,method ="GET"}) =>{
    const base = "https://fakestoreapi.com" ;
    const url = base + endpoint; 
    
    try{   
        const res = await fetch(url,{
            method,
        });

        if(res.status >= 2 && res.status < 400){
             const resData = await res.json();
            
            return resData;
        }else{
            throw new Error();
        }        
    }
    catch(e){
        console.log(`ERROR in ${url}: ${ e}`);
        throw e;
    }
};

const getProducts = async ()=>{
    try{
        products = await api({endpoint:"/products"});
         showProducts(products); 
         handleFilter();           
    }catch(e){
        console.log("ERROR!", e);
    }
    
};

const showProducts = (products) => {

    const productContainer = $('#products_container');
    const productsElement = products.map((item)=>{
        const productCard = createCard(item);
        return productCard;
    })
    productContainer.append(productsElement);    
}

const createCard = (item) => {
    const {title,category,image,rating,id,price} = item;
    const {rate} = rating;

    let card = $(`<div class="product_card">
                <div class="product_image_box">
                    <img src="${image}">
                </div>

                <div class="product_content">
                    <p class="product_tittle">${title}</</p>
                    <p class="product_brand">${category} </p>
                    <p class="product_price">Price: ${price}/-</p>
                    <p class="product_rating">${"🌟".repeat(Math.ceil(rate))}</p>

                </div>
            </div>`)

           card.on('click',()=>{
            const path = location.href;
            location.href = path.replace("dynamic","product") + `?id=${id}`;
           })

           return card;
}

const clearProducts = ()=>{
    $('#products_container').empty();
    console.log("hello")
}

const handleFilter = ()=>{
    const filterList = $("#product_filter");

    filterList.on("change",(event)=>{
        const {value} = event.target;
        let filteredProducts;
        
        if(value === "all"){
            filteredProducts = products;
        }else{
            filteredProducts = products.filter((item)=>
                Math.ceil(item.rating.rate) === parseInt(value)
            )
        }
        clearProducts();
        showProducts(filteredProducts);
    })
}

getProducts();