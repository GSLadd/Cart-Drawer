// Addtocart
function addtocart(item){
  var thisitem = $(item);
  var productid = $(item).data('id');
  var first_text = $(item).find('.addtotext-btn').text();
  jQuery.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data:{
      id: productid,
      quantity: 1,
    },
    dataType: 'json',
    beforeSend: function(){
      thisitem.find('.addtotext-btn').css('opacity','0');
      thisitem.find(".loader-class").addClass('showloader');
    },
    complete: function(){
        thisitem.find('.addtotext-btn').css('opacity','1');
      thisitem.find(".loader-class").removeClass('showloader');
    },
    success: function(json){
      getCartHtml();
    },
    error: function(json){
      alert('sorry please try again');
    }
  });
} 

function getCartHtml(){
  jQuery.ajax({
    type: 'GET',
    url: '/cart',
    dataType: 'html',
    success: function(cart){    
      $('.cart-drawer-content').html($(cart).find('.cart-drawer-content').html());
      $('.main-cart-drawer').addClass('slide-sidecart');
      $('body').addClass('body-stop-custom');
      $('.cart-drawer-overlay').addClass('cart-drawer-overlay-on');
      jQuery.getJSON('/cart.js', function(cart) {
        $('.cart-count-bubble span:eq(0)').html(cart.item_count);
      });
    },
  });
}

// Quantity plus
function plseqty(item){
  var update = $(item);
  var productid = $(item).data('id');
  var test = parseInt($(item).parents('.input-box').find('.input-top-cart').val());
  var quantityp = test + 1;
  jQuery.ajax({  
    type: 'POST',
    url: '/cart/change.js',
    data:{
      id: productid,
      quantity: quantityp
    },
    dataType: 'json',
    beforeSend: function(){
      $(item).find('.cart-drawer-spiner').show();
    },
    success: function(productid){
      getCartHtml();      
    },
    error: function(json){
      $(item).find('.cart-drawer-spiner').hide();
      alert('sorry please try again');
    }
  });
}


// Quantity Minus
function minusqty(itemminus){
  var update = $(itemminus);
  var productid = $(itemminus).data('id');
  var test = parseInt($(itemminus).parents('.input-box').find('.input-top-cart').val());
  var quantityp = test - 1;
  jQuery.ajax({  
    type: 'POST',
    url: '/cart/change.js',
    data:{
      id: productid,
      quantity: quantityp
    },
    dataType: 'json',
    beforeSend: function(){
      $(itemminus).find('.cart-drawer-spiner').show();
    },
    success: function(productid){
      getCartHtml();      
    },
    error: function(json){
      $(itemminus).find('.cart-drawer-spiner').hide();
      alert('sorry please try again');
    }
  });
}

// Remove Item
function removitem(remov){
  var productid = $(remov).data('id');
  jQuery.ajax({  
    type: 'POST',
    url: '/cart/change.js',
    data:{
      id: productid,
      quantity: 0
    },
    dataType: 'json',
    beforeSend: function(){
      $(remov).find('.cart-drawer-spiner').show();
    },
    success: function(productid){
      getCartHtml();      
    },
    error: function(json){
      $(remov).find('.cart-drawer-spiner').hide();
      alert('sorry please try again');
    }
  });
}

$(document).on('click', 'header [href="/cart"]' ,function(event){
  event.preventDefault();
  $('body').addClass('body-stop-custom');
  $('.cart-drawer-overlay').addClass('cart-drawer-overlay-on');
  $('.main-cart-drawer').addClass('slide-sidecart');
});

$(document).on('click', '.cart-drawer-overlay' ,function(event){
  $('body').removeClass('body-stop-custom');
  $('.cart-drawer-overlay').removeClass('cart-drawer-overlay-on');
  $('.main-cart-drawer').removeClass('slide-sidecart');
});

function functionclode(item){
  $('body').removeClass('body-stop-custom');
  $('.cart-drawer-overlay').removeClass('cart-drawer-overlay-on');
  $('.main-cart-drawer').removeClass('slide-sidecart');
}
