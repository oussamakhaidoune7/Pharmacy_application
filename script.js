let titel = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category =document.getElementById('category');
let btn = document.getElementById('btn');
let mood = 'create';
let tmp;

//get total
function getTotal()
{
    if(price.value != '' && taxes.value != '' && ads.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'greenyellow';
    }else{
        total.innerHTML = '';
        total.style.background = 'red';
    }
}

//creat product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}
btn.onclick = function(){
    let newData = {
        titel:titel.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(titel.value !='' && price.value !='' && category.value !='' && newData.count < 100){
        if(mood ==='create'){
            if(newData.count > 1){
                for(let i = 0; i < newData.count; i++){
                    dataPro.push(newData);
                }
                }else{
                 dataPro.push(newData);
                 clearData()
                }
        }else{
            dataPro[   tmp   ] = newData;
            mood = 'create';
            btn.innerHTML = 'create';
            count.style.display = 'block';
        } 

    }
   
    

    localStorage.setItem('product',     JSON.stringify(dataPro)          )
    clearData()
}

//clear inputs
function clearData(){
    titel.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read
function schowData()
{
    getTotal()
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].titel}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i}) id="update">update</button></td>
        <td><button onclick="deletData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody-table').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0)
    {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All(${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }

}   
schowData()

//delet
function deletData(i)
{
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    schowData()
}

function deleteAll()
{
    localStorage.clear()
    dataPro.splice(0)
    schowData()
}

//count
//update
function updateData(i)
{
    titel.value = dataPro[i].titel;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    btn.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}
//search
let searchMood = 'title';
function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id == 'search-title'){
        searchMood = 'title';

    }else{
        searchMood = 'category';

    }
    search.placeholder = 'Search By '+ searchMood;
    search.focus()
    search.value ='';
    schowData()     

}

function searchData(value)
{
    let table ='';
    for(let i = 0; i < dataPro.length; i++){
        if(searchMood == 'title'){

        }else{
            
        }

    }
    
   
    document.getElementById('tbody').innerHTML = table;

}
