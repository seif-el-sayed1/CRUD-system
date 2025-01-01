let title = document.getElementById("title");
let price = document.getElementById("price");
let discount = document.getElementById("discount");
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let search = document.getElementById("search")
let searchTitle = document.getElementById("searchTitle")
let searchCategory = document.getElementById("searchCategory")
let x
function getTotal() {
    total.innerHTML = +price.value - +discount.value;
    total.style.backgroundColor = "green"
    if (price.value === "") {
        total.innerHTML = "0";
        total.style.backgroundColor = "rgb(177, 12, 12)";
    }
}
// create product
let date;
if (localStorage.product != null) {
    date = JSON.parse(localStorage.product)
} else {
    date = [];
}
submit.onclick = function() {
    let info = {
        title: title.value.toLocaleLowerCase(),
        price: price.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLocaleLowerCase(),
    }
    if (title.value !== "" && price.value !== "" && category.value !== "") {
        if (count.value > 1) {
            for(i = 0; i < count.value; i++) {
                date.push(info)
            }
        } else {
            date.push(info)
        }
        refresh()
    }
    localStorage.setItem("product", JSON.stringify(date))
    total.style.backgroundColor = "rgb(177, 12, 12)"
    showData()
}
// clear 
function refresh() {
    title.value = "";
    price.value = "";
    discount.value = "";
    category.value = "";
    count.value = "";
    total.innerHTML = "0";
    search.value = "";
} 
// show data
function showData() {
    let table = "";
    for (i = 0; i < date.length; i++) {
        table += `<tr>
        <td>${i + 1}</td>
        <td>${(date[i].title)}</td>
        <td>${date[i].price}</td>
        <td>${date[i].discount}</td>
        <td>${date[i].total}</td>
        <td>${date[i].category}</td>
        <td><button onclick = "updateData(${i})">Update</button></td>
        <td><button onclick = "deleteData(${i})">Delete</button></td>
        </tr>`
    }
    let clearAll = document.getElementById("clearAll");
    document.getElementById("body").innerHTML = table;
    if (date.length > 0) {
        clearAll.style.display = "block";
        clearAll.innerHTML = `Delete All (${date.length})`
    } else {
        clearAll.style.display = "none";
    }
}
showData()
// delete one 
function deleteData(i) {
    date.splice(i, 1);
    count.style.display = "block";
    submit.style.display = "block";
    update.style.display = "none";
    localStorage.product = JSON.stringify(date);
    showData(); 
    refresh()
}
// deleteAll
clearAll.onclick = () => {
    localStorage.clear()
    date.splice(0)
    count.style.display = "block";
    submit.style.display = "block";
    update.style.display = "none";
    showData()
    refresh();
}
// update data 
let update = document.getElementById("update")
function updateData(i) {
    total.style.backgroundColor = "green"
    title.value = date[i].title;
    price.value = date[i].price;
    discount.value = date[i].discount;
    category.value = date[i].category;
    total.innerHTML = date[i].total;
    count.style.display = "none";
    submit.style.display = "none";
    update.style.display = "block";
    x = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}
update.onclick = () => {
    count.style.display = "block";
    submit.style.display = "block";
    update.style.display = "none";
    date[x].title = title.value;
    date[x].price = price.value;
    date[x].discount = discount.value;
    date[x].total = total.innerHTML;
    date[x].category = category.value;
    localStorage.product = JSON.stringify(date);
    total.style.backgroundColor = "rgb(177, 12, 12)"
    showData()
    refresh();
}
// search
function searchBytitle() {   
    showData();
    search.focus();
    search.style.display = "block";
    search.value = "";
    search.placeholder = "Search By Title";
    search.onkeyup = () => {
        let searchTable = "";
        for (j = 0; j < date.length; j++ ) {
            if (date[j].title.includes(search.value.toLocaleLowerCase())) {
                searchTable += `<tr>
                <td>${j + 1}</td>
                <td>${(date[j].title)}</td>
                <td>${date[j].price}</td>
                <td>${date[j].discount}</td>
                <td>${date[j].total}</td>
                <td>${date[j].category}</td>
                <td><button onclick = "updateData(${j})">Update</button></td>
                <td><button onclick = "deleteData(${j})">Delete</button></td>
                </tr>`
            }
        }
        document.getElementById("body").innerHTML = searchTable;
    }
}
function searchBycategory() {
    showData();
    search.focus();
    search.style.display = "block";
    search.value = "";
    search.placeholder = "Search By Category";
    search.onkeyup = () => {
        let searchTable = "";
        for (j = 0; j < date.length; j++ ) {
            if (date[j].category.includes(search.value.toLocaleLowerCase())) {
                searchTable += `<tr>
                <td>${j + 1}</td>
                <td>${(date[j].title)}</td>
                <td>${date[j].price}</td>
                <td>${date[j].discount}</td>
                <td>${date[j].total}</td>
                <td>${date[j].category}</td>
                <td><button onclick = "updateData(${j})">Update</button></td>
                <td><button onclick = "deleteData(${j})">Delete</button></td>
                </tr>`
            }
        }
        document.getElementById("body").innerHTML = searchTable;
    }
}