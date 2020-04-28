    // get id of product in url && get all data of this id
    var myurl = this.location.href
    var selectedurl = myurl.split("?")[1]
    var urlParams = new URLSearchParams(selectedurl)
    var selectedid = urlParams.get("id")

    let get_data_product =  ( ) => {
        let xhr = new XMLHttpRequest();
        let Method = 'GET'
        let Url = 'https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json'
        xhr.open( Method , Url );
        xhr.send();
        xhr.onerror = (err) => {
        console.error(err);
        }
        xhr.onload = () => {
            if(xhr.status == 200){
                let RES = JSON.parse(xhr.response);
                let MYDATA = RES.ProductCollection ;
                
                let view_obj = search_id(MYDATA,selectedid);
                dispaly(view_obj)
                add_Quantity_View(view_obj)
            }
        }
    }
    get_data_product ();


    function search_id (array,id)
    {
        for (let i=0 ;i<array.length ; i++)
        {
            if (array[i].ProductId == id)
            {
                return array[i] ;
            }
        }
        console.log("No Item For this id");
    }


    function dispaly(obj_display) 
    {
        let view_img = document.getElementById('view_img');
        view_img.setAttribute('src',obj_display.ProductPicUrl);
        let view_h5 = document.getElementById('view_h5');
        view_h5.innerHTML = obj_display.Name;
        let view_Description = document.getElementById('view_Description');
        view_Description.innerHTML = obj_display.Description ;
        let view_h3 = document.getElementById('view_h3');
        view_h3.innerHTML = '$' + obj_display.Price ;

        let view_Input = document.getElementById('view_Input');
        view_Input.setAttribute('max',obj_display.Quantity);
        console.log(view_Input);
    }

     function add_Quantity_View (data){
    $('#add_Cart').on('click',function(){
        
            cart = JSON.parse(localStorage.getItem('ShoppingCart'))
            num = $('#view_Input').val();
            
            let id = data.ProductId;
            let url = data.ProductPicUrl;
            let name = data.Name;
            let price = data.Price;
            let max    = data.Quantity;

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
    })
};
