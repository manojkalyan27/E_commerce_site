const api = async ({endpoint,method ="GET"}) =>{
    try{
        const base = "https://fakestoreapi.com" ;
        const url = base + endpoint;    
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
        const products = await api({endpoint:"/products"});
         showProducts(products);            
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
    const {tittle,category,image,rating,price} = item;
    const {rate} = rating;

    let card = $(`<div class="product_card">
                <div class="product_image_box">
                    <img src="${image}">
                </div>

                <div class="product_content">
                    <p class="product_tittle">${tittle}</</p>
                    <p class="product_brand">${category} </p>
                    <p class="product_price">Price: ${price}/-</p>
                    <p class="product_rating">${"🌟".repeat(Math.ceil(rate))}</p>

                </div>
            </div>`)

            return card;
}


getProducts();