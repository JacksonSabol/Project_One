$(document).ready(function () {


  // This example requires the Places library. Include the libraries=places
// // parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQHbqilN4MFV6-QYxw3-Xay9BJbPBZvt8&libraries=places"></script>

// https://maps.googleapis.com/maps/api/place/nearbysearch/json
//   ?location=-33.8670522,151.1957362
//   &radius=500
//   &types=food
//   &name=harbour
//   &key=AIzaSyBQHbqilN4MFV6-QYxw3-Xay9BJbPBZvt8

// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -33.866, lng: 151.196},
//     zoom: 15
//   });
// console.log("hello");

//   var infowindow = new google.maps.InfoWindow();
//   var service = new google.maps.places.PlacesService(map);

//   service.getDetails({
//     placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
//   }, function(place, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//       var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location
//       });
//       google.maps.event.addListener(marker, 'click', function() {
//         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
//           'Place ID: ' + place.place_id + '<br>' +
//           place.formatted_address + '</div>');
//         infowindow.open(map, this);
//       });
//     }
//   });
// }

// // hide well when page loads
  $(".well").hide();

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDLk-BHKWaXv4zCAWa9Ekc51UalnuS5yjo",
    authDomain: "travelbook-1543375707755.firebaseapp.com",
    databaseURL: "https://travelbook-1543375707755.firebaseio.com",
    projectId: "travelbook-1543375707755",
    storageBucket: "travelbook-1543375707755.appspot.com",
    messagingSenderId: "329432180812"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Get elements
  var txtEmail = document.getElementById('txtEmail');
  var txtPassword = document.getElementById('txtPassword');
  var btnLogin = document.getElementById('btnLogin');
  var btnSignUp = document.getElementById('btnSignUp');
  var btnLogout = document.getElementById('btnLogout');

  //Add login event
  btnLogin.addEventListener('click', e => {
    //Get email and password
    var email = txtEmail.value;
    var pass = txtPassword.value;
    var auth = firebase.auth();
    //Sign in
    var promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });


  //Add signup Event
  btnSignUp.addEventListener('click', e => {
    var email = txtEmail.value;
    var pass = txtPassword.value;
    var auth = firebase.auth();

    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => {
      // Console log "Email already exists"
      console.log(e.message);
      // Hide sign up button since user is already authenticated
      btnSignUp.classList.add('hide');
    });
  });

  // btnLogout.addEventListener('click', e => {
  //   event.preventDefault() 
  //   firebase.auth().signOut();
  //   //Add a real time listener
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       console.log(firebase);
  //       btnLogout.classList.remove('hide');
  //     } else {
  //       console.log('not logged in');
  //     }
  //   });

  // const auth = firebase.auth();
  // auth.signInWithEmailAndPassword(email, pass);
  // auth.createUserWithEmailAndPassword(email, pass);
  // auth.onAuthStateChanged(firebaseUser => { });

  // Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. You can also check out the chrome extenstion (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  // ------------------------------------ profile page ------------------------------------
  $("#yelp-submit").on("click", function () {
    event.preventDefault();


    // grab a hold of the values the users input (the location and category)
    var location = $("#location").val();
    // Start with category of restaurants for testing
    var category = $("#category").val();
    //   // Make an AJAX call to the Yelp API based on your research. 
    //   // Try and get a response back that returns a series of business fitting 
    //   // within a specified location and category.

    $.ajax({
      url: 'https://api.yelp.com/v3/businesses/search?location=' + location + '&term=' + category + '',
      method: "GET",
      headers: {
        authorization: "Bearer zTc8hKel4T1UcSNchYEMflSNuuZ4B6NErA4ebwBx5NE2WCMlTAC8YOpimFb5osb45soTdnkhO0bi1841cHisFdjLD0ihQhs47ZQH6q4CfBj-wJJAZlzIa5btBYv4W3Yx",
      }
    }).then(function (response) {
      console.log(response);


      for (var i = 0; i < response.businesses.length; i++) {

        // Now that we're able to get the information we want, it's time to render it to the page.
        $("#well").append('<img class="thumbnail" src="' + response.businesses[i].image_url + '"/><h2 class="name">' + response.businesses[i].name + '</h2><p class="phone">' + response.businesses[i].display_phone + '</p><p class="address">' + response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code + '</p><p class="url">' + response.businesses[i].url + '</p><hr>')
      }
    });
  });




  // --------------------- index page ------------------------------------
  $("#submit-search-form").on("click", function () {


// show well when submit button is cliked
$(".well").show();

    //Will stop the page from refreshing so we can grab the values input by the user
    event.preventDefault()

    // grab a hold of the values the users input (the location and category)
    var location = $("#location").val();
    var category = $("#category").val();

    // Console.log() the values and see if they match what you entered into the form.
    console.log(location);
    console.log(category);


    // Make an AJAX call to the Yelp API with location and category as query parameters

    $.ajax({
      url: 'https://api.yelp.com/v3/businesses/search?location=' + location + '&term=' + category + '',
      method: "GET",
      headers: {
        authorization: "Bearer zTc8hKel4T1UcSNchYEMflSNuuZ4B6NErA4ebwBx5NE2WCMlTAC8YOpimFb5osb45soTdnkhO0bi1841cHisFdjLD0ihQhs47ZQH6q4CfBj-wJJAZlzIa5btBYv4W3Yx",
      }
    }).then(function (response) {
      console.log(response)


      for (var i = 0; i < response.businesses.length; i++) {
        // Assign variables to hold API information
        var imgURL = response.businesses[i].image_url;
        var businessName = response.businesses[i].name;
        var businessPhone = response.businesses[i].display_phone;
        var businessAddress = response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code;
        var businessURL = response.businesses[i].url;

        // Dynamically generate a new table
        var newTable = $("<table width='100%'>");
        // Dynamically generate a table row to append cells to
        var newRow = $("<tr>").attr({"class": "table-row-list", "width": "100%"});
        // Dynamically generate a table cell to append information to
        var leftCell = $("<td>").attr("width", "90%");
        // Assign variable to dynamically generate a horizontal rule
        var spacer = $("<hr>");
        // Append image tag to leftCell
        leftCell.append($("<img>").attr({"src": imgURL, "class": "thumbnailAPI", "alt": businessName}));
        // Append business name to leftCell
        leftCell.append($("<a>").attr({"href": businessURL, "class": "business-name", "target": "_blank"}).html("<h3 class=''>" + businessName + "</h3>"));
        // Append business phone number to leftCell
        leftCell.append($("<p>").attr("class", "phone").text(businessPhone));
        // Append business address to leftCell
        leftCell.append($("<p>").attr("class", "address").text(businessAddress));
        // Dynamically generate a table cell to append an add button to
        var rightCell = $("<td>").attr({"width": "10%", "align": "center"});
        // Dynamically generate a button tag
        var addBtn = $("<button>");
        // Dynamically generate a span tag
        var addSpan = $("<span>");
        // Add class to button
        addBtn.addClass("add-button");
        // rightCell.attr("data-key", myKey);
        // Add Bootstrap plus sign class to span
        addSpan.addClass("glyphicon glyphicon-plus-sign");
        // Add hide function to span
        addSpan.attr("aria-hidden", "true");
        // Append span to rightCell
        addBtn.append(addSpan);
        // Append button to rightCell
        rightCell.append(addBtn);
        // Append leftCell to newRow
        newRow.append(leftCell);
        // Append rightCell to newRow
        newRow.append(rightCell);
        // Append newRow to newTable
        newTable.append(newRow, spacer);
        // Append newTable to well div
        $(".well").append(newTable);
        // Now that we're able to get the information we want, it's time to render it to the page.
        // $(".well").append('<img class="thumbnail" src="' + response.businesses[i].image_url + '"/><h2 class="name">' + response.businesses[i].name + '</h2><p class="phone">' + response.businesses[i].display_phone + '</p><p class="address">' + response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code + '</p><a href="' + response.businesses[i].url + '" target="_blank"><p class="url">Link to Business</p><hr>');
      }






      // Add + button to the side of each item listed in the div well
      // + button when clicked will trigger a function
      // that function will push the data from the API call to Firebase to "store" it as an "interest" by location
      // The profile page will call this information (interests) from Firebase and display it by location (like a list of "likes")

      // For index page div well 
      // Code below creates a generic table just for reference and a remove button - change this code to create a table with a + button

      //create row to store user input and moment calculations
      // var myRow = $("<tr>");
      // //store firebase key in the row
      // myRow.attr("id", myKey);
      // //append user input
      // myRow.append($("<td>").html(trainName));
      // myRow.append($("<td>").html(destination));
      // myRow.append("<td class='text-center'>" + frequency + "</td>");
      // myRow.append($("<td class='text-center'>").html(nextTrain.format("HH:mm")));
      // myRow.append($("<td class='text-center'>").html(minutesAway));
      // //delete button
      // var myData = $("<td class='text-center'>");
      // var myBtn = $("<button>");
      // var mySpan = $("<span>");
      // myBtn.addClass("remove-button");
      // myBtn.attr("data-key", myKey);
      // mySpan.addClass("glyphicon glyphicon-minus-sign");
      // mySpan.attr("aria-hidden", "true");
      // myBtn.append(mySpan);
      // myData.append(myBtn);
      // myRow.append(myData);

      // //append row to id table-body
      // $("#table-body").append(myRow);

      //remove train on click
      // 	$("body").on("click", ".remove-button", function(){
      //     //remove data from firebase associated with this buttons key
      //      database.ref().child($(this).attr("data-key")).remove();
      // });
      // //watcher for child removed - deletes train
      // database.ref().on("child_removed", function(snapshot) {
      //   //save the key as a variable
      //   var myKey = snapshot.key;
      //   //remove row with id that matches key of child that was removed
      //   $("#"+myKey).remove();
      // });

    });
  });
});

      //   //   //Will stop the page from refreshing so we can grab the values input by the user
      //   event.preventDefault()

      //   //   // grab a hold of the values the users input (the location and category)
      //   var location = $(this).attr("#data-name");
      //   // Start with category of restaurants for testing
      //   var category = "italian";

      //   //   // Console.log() the values and see if they match
      //   console.log(location);
      //   //   console.log(category);

      //   //   // Make an AJAX call to the Yelp API based on your research. 
      //   //   // Try and get a response back that returns a series of business fitting 
      //   //   // within a specified location and category.

      //   $.ajax({
      //     url: 'https://api.yelp.com/v3/businesses/search?location=' + location + '&term=' + category + '',
      //     method: "GET",
      //     headers: {
//     });
//   });
// });