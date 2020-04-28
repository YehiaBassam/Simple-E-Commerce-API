let dataFromLocal = JSON.parse(localStorage.getItem('ShoppingCart'))


// loop for Objects
for (var key in dataFromLocal)
{
    let id = dataFromLocal[key].id
    let url = dataFromLocal[key].Url
    let name = dataFromLocal[key].Name
    let price = dataFromLocal[key].Price
    let quantity = dataFromLocal[key].No_of_product
    let max       = dataFromLocal[key].Max
    

    // Container && row
    let container_all = document.createElement('div');
    let row_all = document.createElement('div');
    container_all.classList.add('container');
    row_all.classList.add('row');
    $(container_all).append(row_all);
    $('#cartItems').append(container_all);


    // Img && Name
    let div_img_name = document.createElement('div');
    div_img_name.classList.add('col-md-3','d-flex');

    let div_img = document.createElement('div');
    div_img.classList.add('col-md-8','mb-3');
    let div_name = document.createElement('div');
    div_name.classList.add('col-md-12','d-flex','align-items-center');
    $(div_img_name).append(div_img);
    $(div_img_name).append(div_name);

    let myimg = document.createElement('img');
    myimg.setAttribute('src',url);
    myimg.setAttribute('class','img-fluid');
    myimg.setAttribute('style','border:2px solid gray');
    $(div_img).append(myimg);
    let myname = document.createElement('p');
    myname.innerHTML = name;
    $(div_name).append(myname);
    $(row_all).append(div_img_name);


    // Price
    let div_price = document.createElement('div');
    div_price.classList.add('col-md-3', 'd-flex', 'justify-content-end','align-items-center');
    let par_price = document.createElement('p');
    par_price.innerHTML ='$' + price ;
    $(div_price).append(par_price);
    $(row_all).append(div_price);

    // Quantity
    let div_input = document.createElement('div');
    div_input.classList.add('col-md-3','d-flex','align-items-center','mb-3');
    let input_quan = document.createElement('input');
    input_quan.setAttribute('type','number');
    input_quan.setAttribute('min','1');
    input_quan.setAttribute('max',max);
    input_quan.setAttribute('value',quantity);
    input_quan.setAttribute('style','border-radius: 20px');
    input_quan.classList.add('input-group-text','w-75');
    $(div_input).append(input_quan);
    $(row_all).append(div_input);

    $(input_quan).on("change", function() {
        cart = JSON.parse(localStorage.getItem('ShoppingCart'))
        num = $(this).val();
        location.reload()
        cart[id] =
            {
            id:id,
            No_of_product: num,
            Name:name,
            Url:url,
            Price:price,
            Max:max
            }
        localStorage.setItem('ShoppingCart',JSON.stringify(cart))
     });
    

    // Total_Price
    let div_Total_Price = document.createElement('div');
    div_Total_Price.classList.add('col-md-3', 'd-flex', 'justify-content-end','align-items-center');
    let par_Total_Price = document.createElement('p');
    par_Total_Price.innerHTML = '$' + Number(quantity) * price;
    $(div_Total_Price).append(par_Total_Price);
    $(row_all).append(div_Total_Price);
}

   
    
    let total_cost = 0 ;
    let total_quantity = 0;

    // Cart Total 
    for (var key in dataFromLocal)
{
    let price = dataFromLocal[key].Price ;
    let quantity = dataFromLocal[key].No_of_product ;
    
    total_cost += price * quantity ;
    total_quantity += Number(quantity)  ;
}

let total = document.getElementById('Cart_total_cost');
total.innerHTML = '$' + total_cost;



$('#purchasing').on('click',function(){
    if (total_cost >0 ){
document.getElementById('confirm').innerHTML = "Your purchases have been added, thanks for purchasing from our site";
document.getElementById('confirm').classList.add('text-success','font-weight-bold');
localStorage.setItem('ShoppingCart',JSON.stringify({})) ;
}
else alert('Please Select your Products first');
})

