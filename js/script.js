
//Email Newsletter Form
function capture () {
  event.preventDefault();
  var email = document.customerInfo.email.value;
  console.log("Thanks for signing up for our mailing list, " + email + "!")
}
//End Email Newsletter Form


	$(".add-to-cart").click(function(event){
	  event.preventDefault();
	  var name = $(this).attr("data-name");
	  var price = Number($(this).attr("data-price"));

	  addItemToCart(name, price, 1);
	  displayCart();
	});


	$("#clear-cart").click(function(event){
		clearCart();
		displayCart();
	});



function displayCart(){
  var cartArray = listCart();
  var output = "";

  for (var i in cartArray) {
    output += "<li><span class='cart-item-name'>"
		+cartArray[i].name + "</span><br>"
		+" "+cartArray[i].count
    +" (items)"
    +" <button title='Add Item' class='plus-item' data-name='"
    +cartArray[i].name+"'>+</button>"
    +" <button  title='Subtract Item'class='subtract-item' data-name='"
    +cartArray[i].name+"'>-</button>"
    +" <button  title='Remove Item From Cart' class='delete-item' data-name='"
		+cartArray[i].name+"'>x</button>"
    + "<br />"
	//	+" x "+cartArray[i].price
    +" Subtotal"
		+" = "+cartArray[i].total
		+"</li>"
  }
  $("#show-cart").html(output);
  $("#count-cart").html( countCart() );
  $("#total-cart").html( totalCart() );
}


$("#show-cart").on("click", ".delete-item", function(event){
	var name = $(this).attr("data-name");
	removeItemFromCartAll(name);
	displayCart();
});


$("#show-cart").on("click", ".subtract-item", function(event){
	var name = $(this).attr("data-name");
	removeItemFromCart(name);
	displayCart();
});


$("#show-cart").on("click", ".plus-item", function(event){
	var name = $(this).attr("data-name");
	addItemToCart(name, 0, 1);
	displayCart();
});



//**********************************************
// Shopping Cart Functions

var cart = [];

var Item = function(name, price, count){
  this.name = name
  this.price = price
  this.count = count
};


//add item to cart
function addItemToCart(name, price, count){
  for (var i in cart){
    if (cart[i].name === name) {
      cart[i].count += count;
      return;
    }
  }
    var item = new Item(name, price, count);
    cart.push(item);
}

//remove item from cart
function removeItemFromCart(name){
  for (var i in cart){
    if (cart[i].name === name){
      cart[i].count --;
      if(cart[i].count === 0){
        cart.splice(i, 1);
      }
      break;
    }
  }
}

//remove ALL items from cart
function removeItemFromCartAll(name){
  for (var i in cart){
    if (cart[i].name === name){
      cart.splice(i, 1);
      break;
    }
  }
}


function clearCart(){
  cart = [];
}

function countCart(){
  var totalCount = 0;
  for (var i in cart){
    totalCount += cart[i].count;
  }
  return totalCount;
}

console.log( countCart() );


function totalCart(){
  var totalCost = 0;
  for (var i in cart){
    totalCost += cart[i].price * cart[i].count;
  }
  return totalCost.toFixed(2);
}


//list cart

function listCart(){
  var cartCopy = [];
  for (var i in cart){
    var item = cart[i];
    var itemCopy = {};
    for(var p in item){
      itemCopy[p] = item[p];
    }
	itemCopy.total = (item.price * item.count).toFixed(2);
    cartCopy.push(itemCopy);
  }
  return cartCopy;
}


displayCart();



//smooth scrolling
//
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
