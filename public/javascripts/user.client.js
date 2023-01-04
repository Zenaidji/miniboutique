let description;
let price;
let username;
let items;
let currentBudget
let currentName
let currentId;
let sellerId;
let t;
let objectSelledPrice;
let button;
let itemId;


const setup = () => {
    //document.getElementById('buy').style.visibility="hidden";
    initialiseUserData()
    userConnected()
    getOthersObjects()
    description = document.getElementById("objectDescription");
    price = document.getElementById("price")
    username = document.getElementById('username');
    items = document.getElementById('items');
    userConnected()
    document.getElementById('sellItem').addEventListener('click', sell);
    //document.getElementById('buy').addEventListener('click', objectData);
    document.getElementById('logout').addEventListener('click', logout);

}
window.addEventListener('DOMContentLoaded', setup);

const initialiseUserData = async() => {
    const body = JSON.stringify();
    const requestOptions = {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: body
    };
    const response = await fetch('/user/me', requestOptions);
    if (response.ok) {
        const updatedUser = await response.json();
        console.log(updatedUser)
        currentName = updatedUser.name
        currentId = updatedUser.userId
        currentBudget = updatedUser.amount
        userConnected();
        // document.getElementById('description').innerHTML = `${(currentName)} is connected with ${currentBudget} $ and id ${currentId}`
    } else {
        const error = await response.json()
        handleError(error);
    }
}
const sell = async() => {
    console.log("sell user")
    const userData = {
        name: description.value,
        price: price.value,
        ownerId: currentId
    };
    const body = JSON.stringify(userData);

    const requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: body
    };
    const response = await fetch(`/objects/create`, requestOptions);
    if (response.ok) {
        const createdUser = await response.json();
        console.log(createdUser.ownerId)
        console.log(`object registered : ${JSON.stringify(createdUser)}`);
        getOthersObjects()
    } else {
        const error = await response.json()
        handleError(error);
    }
}

const getOthersObjects = async() => {
    console.log("all objects")

    const body = JSON.stringify();
    const objectsTable = document.getElementById('items');
    objectsTable.textContent = '';
    const requestOptions = {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        body: body
    };
    const response = await fetch(`/objects`, requestOptions);
    if (response.ok) {
        const list = await response.json();
        for (let object of list) {
            const ObjectElement = buildObjectElement(object);
            objectsTable.appendChild(ObjectElement);
        }
    } else {
        const error = await response.json()
        handleError(error);
    }
}
const buildObjectElement = object => {
    const objectElement = document.createElement('tr');
    objectElement.className = 'object';
    objectElement.appendChild(buildTD(object.name, 'name'));
    objectElement.appendChild(buildTD(object.price, 'price'));
    const getButton = buildButton('buy');
    getButton.setAttribute("data-id", object.ownerId);
    getButton.addEventListener('click', () => objectData(object._id));
    objectElement.appendChild(getButton);
    /** 
    const updateButton = buildButton('update PUT');
    updateButton.addEventListener('click', () => updateBook(book));
    bookElement.appendChild(updateButton);
    const deleteButton = buildButton('delete (DELETE)');
    deleteButton.addEventListener('click', () => deleteBook(book._id, deleteButton));
    bookElement.appendChild(deleteButton);**/
    return objectElement;
}
const buildTD = (content, className) => {
    const TDelement = document.createElement('td');
    TDelement.textContent = content;
    TDelement.className = className;
    return TDelement;
}
const buildButton = label => {
    const button = document.createElement('button');
    button.textContent = label;
    return button;
}
const logout = async() => {
    const requestOptions = {
        method: 'GET',
    };
    const response = await fetch(`/access/logout`, requestOptions);
    if (response.ok) {
        window.location.href = '/';
    }
}
const handleError = error => {
    if (error.redirectTo)
        window.location.href = error.redirectTo;
    else
        console.log(`erreur : ${error.message}`);
}
const userConnected = async() => {


    document.getElementById('description').innerHTML = `user:${(currentName)}  amount:${currentBudget}$ id ${currentId}`
}

//

const buy = async(objectId) => {
    itemId = objectId
    console.log(itemId);
    console.log(objectData)
    console.log(objectSelledPrice, currentBudget)
    if (objectSelledPrice <= currentBudget) {
        console.log(sellerId)
        const body = JSON.stringify();
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: body
        };
        const response = await fetch(`/objects/buy/${itemId}`, requestOptions);
        if (response.ok) {
            const objectData = await response.json();
            getOthersObjects()
            setCurrentBudget()
        } else {
            const error = await response.json()
            handleError(error);
        }
    } else {
        console.log(objectSelledPrice, currentBudget);
        console.log("vous n'avez pas assez d'argent pour effectuer cet achat")
    }
}
const setCurrentBudget = async() => {
        const body = JSON.stringify();
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: body
        };
        const response = await fetch(`/user/setBuyerBudget/${objectSelledPrice}`, requestOptions);
        if (response.ok) {
            const objectData = await response.json();
        } else {
            const error = await response.json()
            handleError(error);
        }
    }
    // object data
const objectData = async(objectid) => {
    itemId = objectid

    console.log("itemid", itemId)
    const body = JSON.stringify();
    const objectsTable = document.getElementById('items');
    objectsTable.textContent = '';
    const requestOptions = {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        body: body
    };
    const response = await fetch(`/objects/objectData/${itemId}`, requestOptions);

    if (response.ok) {
        const list = await response.json();

        console.log("list")
        console.log(list)
        objectSelledPrice = list.price;
        console.log("price", objectSelledPrice)
        sellerId = list.ownerId;
        buy(itemId);
    } else {
        const error = await response.json()
        handleError(error);
    }
}




/**const getAllObjects= async ()=>{
  console.log("all objects")
  const body = JSON.stringify();
  const requestOptions = {
                         method :'GET',
                         headers : { "Content-Type": "application/json" },
                         body : body
                       };
  const response = await fetch(`/objects`, requestOptions);
  if (response.ok) {
    const list = await response.json();
    itemsList=JSON.stringify(list)
   // window.location.href('/objects')
    for (const item of list){
      let res=buttonCreation(button,item._id)
      const a=res.outerHTML
      console.log(res.getAttribute('data-id'))
      res.addEventListener("click",buy)
      items.innerHTML+=`<tr><th>Joueur</th><td>${item.name}</td><td>${item.price}</td></tr>${a}`;
    console.log(`list of items : ${JSON.stringify(list)}`);
  }
  document.getElementById("buy").addEventListener("click",buy)
}
  else {
    const error = await response.json();
    console.log(`erreur : ${error.message}`);
    document.getElementById('problem').textContent = `erreur : ${error.message}`;
  }
  }**/