
  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyDKEQeWkZRWiUDx6Dku_SKJWA_6_twbw3c",
    authDomain: "traintime-144f7.firebaseapp.com",
    databaseURL: "https://traintime-144f7.firebaseio.com",
    projectId: "traintime-144f7",
    storageBucket: "",
    messagingSenderId: "701256649746"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


//  Button for adding Employees

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var des = $("#destination-input").val().trim();
  var firstTime = moment($("#first-input").val().trim(), "HH:mm").format("X");
  var freq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data

  var newTrain = {
    name: trainName,
    newDes: des,
    start: firstTime,
    rate: freq,
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(trainName.name);
  console.log(des.newDes);
  console.log(firstTime.start);
  console.log(freq.rate);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding tain to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var des = childSnapshot.val().newDes;
  var firstTime = childSnapshot.val().start;
  var freq = childSnapshot.val().rate;

  // Train Info

  console.log(trainName);
  console.log(des);
  console.log(firstTime);
  console.log(freq);

  // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + des + "</td><td>" +
  freq + "</td><td>");
});
