const api = async ({path,method ="GET"}) =>{
    const base = "https://fakestoreapi.com" ;
    const url = base + path; 
    
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
        const search = new URLSearchParams(location.search)
        const id = search.get('id');
    
        if(id){
            const data = await api({
                path : `/products/?id${id}`,
            });
            showProducts(data);
        }else{
            throw new Error("Product not valid");
        }
    }
    catch(e){
        console.log(e.message);        
    }
};


// const showProducts =  (product)=>{

//     const imageEl = $("#product_image");
//     const titleEl = $('#product_title');
//     const categoryEl = $('#product_category');
//     const descriptionEl = $('#product_description');
//     const priceEl = $('#product_price');
//     const ratingEl = $('#product_rate');
//     const reviewsEl = $('#product_reviews')

// const {title,description,image,price,rating,category} = product;
// const {rate,count} = rating;

// imageEl.attr('src',image) // attr is a function in JQuery to set soure attribute to image
 
// titleEl.html(title) // similar to innerHTML 
// categoryEl.html(category)
// descriptionEl.html(description)
// priceEl.html(`Price: ${Math.ceil(price)}`);
// ratingEl.html(`${rate} star: ${"⭐".repeat(Math.ceil(rate))}`)
// reviewsEl.html(`Reviews: ${count}`)

// };

const showProducts = (product) => {
    const imageEl = $("#product_img");
  
    const titleEl = $("#product_title");
  
    const categoryEl = $("#product_category");
  
    const descriptionEl = $("#product_description");
  
    const priceEl = $("#product_price");
  
    const ratingEl = $("#product_rate");
  
    const reviewsEl = $("#product_reviews");
  
    const { title, price, description, rating, category, image } = product;
    let { rate, count } = rating;
    rate = Math.ceil(rate);
  
    document.title = `Quickerce | ${title}`;
  
    imageEl.attr("src", image);
    imageEl.attr("alt", title);
  
    titleEl.html(title);
  
    categoryEl.html(category);
  
    descriptionEl.html(description);
    priceEl.html(`Price: ${Math.ceil(price)}$`);
    ratingEl.html(`${rate} star: ${"⭐".repeat(rate)}`);
    reviewsEl.html(`${count} reviews`);
  };

getProducts();