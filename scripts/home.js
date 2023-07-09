var authButton = document.getElementById("authButton");
var restaurents = document.getElementById("restaurents");

fetchAllResturents();

var token = localStorage.getItem("token");

if(token)
{
  authButton.innerText = "Logout";
}
else
{
  authButton.innerText = "Login";
}

authButton.addEventListener("click", function()
{
  
  if(token)
  {
    logoutUser()
    return
  }

  window.location.href = "/pages/login.html";

})

function logoutUser()
{
  localStorage.removeItem("token");
  window.location.reload();
}



function fetchAllResturents()
{
  var request = new XMLHttpRequest();

  request.open("GET", "https://foodbukka.herokuapp.com/api/v1/restaurant")
  request.send();

  request.addEventListener("load", function()
  {
    if( request.status === 200 )
    {
      showAllResults( JSON.parse(request.responseText) )
    }
    else
    {
      console.log("something went wrong")
      // error handling
    }
  });

}

function showAllResults(reestaurentData)
{
  reestaurentData.Result.forEach(function(restaurent)
  {
    var container = document.createElement("div");
    container.classList.add("restaurentContainer");

    var name = document.createElement("h2");
    name.innerText = restaurent.businessname;
    name.classList.add("businessname");
    container.appendChild(name);

    var inner_container = document.createElement("div");
    inner_container.classList.add("inner_container");

    var image = document.createElement("img");
    image.setAttribute("src", restaurent.image)
    image.classList.add("resturentimage");
    inner_container.appendChild(image);


    var right_container = document.createElement("div");
    right_container.classList.add("right_container");

    var address = document.createElement("p");
    address.innerText = "Address: "+restaurent.address;
    right_container.appendChild(address);

    var phone = document.createElement("p");
    phone.innerText = "Phone: "+restaurent.phone;
    right_container.appendChild(phone);

    var Email = document.createElement("p");
    Email.innerText = "Email: "+restaurent.email;
    right_container.appendChild(Email);
    
    var Review = document.createElement("p");
    Review.innerText = "Reviews: "+restaurent.reviews;
    right_container.appendChild(Review);

    var menu = document.createElement("a");
    menu.innerHTML = "<button>Menu</button>";
    menu.setAttribute("href", "/pages/menu.html");
    menu.classList.add("menu_btn");
    right_container.appendChild(menu);

    
    right_container.appendChild(menu);
    
    inner_container.appendChild(right_container);
    container.appendChild(inner_container)

    restaurents.appendChild(container);
  });
}

