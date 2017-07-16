 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC8RW2Sj2_brQehtA_R4dqxAAfi3Lce7L0",
    authDomain: "project1codingbootcamp.firebaseapp.com",
    databaseURL: "https://project1codingbootcamp.firebaseio.com",
    projectId: "project1codingbootcamp",
    storageBucket: "project1codingbootcamp.appspot.com",
    messagingSenderId: "561028997636"
  };

  firebase.initializeApp(config);

var database = firebase.database();



// Initial Values
var trainName = "";
var destination = "";
var firstTime = "";
var frequency = 0;

//on click 
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Get values from input fields
    trainName = $("#name-input").val().trim()
    destination = $("#destination-input").val().trim()
    firstTime = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
    frequency = $("#frequency-input").val().trim()

    var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency
  };

    database.ref().push(newTrain);
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency; 

    var firstTrainConvert = moment(firstTime, "HH:mm")
    var currentTime = moment().format("HH:mm");
    var timeDiff = moment().diff(moment(firstTrainConvert), "minutes");
    var timeRemainder = timeDiff % frequency;
    var minToTrain = frequency - timeRemainder;
    var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
    var nxTrainConvert = moment(nxTrain,["HH:mm"]).locale('en').format("h:mm A")


   $("#table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination +
     "</td><td>" + frequency + "</td><td>" + nxTrainConvert + "</td><td>" + minToTrain + "</td><tr>")

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


 