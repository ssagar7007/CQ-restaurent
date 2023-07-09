var authButton = document.getElementById("authButton");
var container = document.getElementById("container");

menuList();

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

// var id = "62fdf171c326470004e72b2a";

function menuList()
{
    var request = new XMLHttpRequest();
    request.open("GET", "https://foodbukka.herokuapp.com/api/v1/menu");
    // request.open("GET", `https://foodbukka.herokuapp.com/api/v1/restaurant/${id}/menu`);
    request.send();

    request.addEventListener("load", function()
    {
        if( request.status === 200 )
        {
            showAllResults(JSON.parse(request.responseText));
            
        }
        else
        {
        console.log("something went wrong")
        
        }
    });
}

function showAllResults(foodList)
{ 
  console.log("menu");
  foodList.Result.forEach(function(food)
  {
    var item = document.createElement("div");
    item.classList.add("item");

    var name = document.createElement("h2");
    name.innerText = food.menuname;
    name.classList.add("businessname");
    item.appendChild(name);

    var part2 = document.createElement("div");
    part2.classList.add("part2");
      
    var image1 = document.createElement("img");
    image1.setAttribute("src", food.images[0])
    image1.classList.add("foodimage");
    part2.appendChild(image1);
      
    var image2 = document.createElement("img");
    image2.setAttribute("src", food.images[1])
    image2.classList.add("foodimage");
    part2.appendChild(image2);
      
    var image3 = document.createElement("img");
    image3.setAttribute("src", food.images[2])
    image3.classList.add("foodimage");
    part2.appendChild(image3);
      
    var desc = document.createElement("p");
    desc.innerText = food.description;
    desc.classList.add("desc");
    part2.appendChild(desc);
    
      item.appendChild(part2);

    container.appendChild(item);
  });
}



