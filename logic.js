
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBIM3LvZkG6dyWcbOZwjsZId-jjgrcAV6M",
    authDomain: "trainschedule-abcd0.firebaseapp.com",
    databaseURL: "https://trainschedule-abcd0.firebaseio.com",
    storageBucket: "trainschedule-abcd0.appspot.com",
    messagingSenderId: "345143468187"
  };

  firebase.initializeApp(config);


 // Reference to the database service
    var database = firebase.database();

  // Create global variables to hold data
  var trainName, destination, firstTrainTime, 
  frequency = 0;

    // On site visit
    $("#addTrainBtn").on("click", add);


      // Adding initial load

      function add (){
         event.preventDefault();
         // firstTrainTime =  $("#firstTrainTime").val();



        var newTrain = {
             trainName: $("#trainName").val(),
             destination: $("#destination").val(),
             firstTrainTime: $("#firstTrainTime").val(),
             // firstTrainTime: firstTrainTime,
             frequency: $("#frequency").val()

        };
      

        database.ref().push(newTrain);
      };
         

    // Create Firebase "watcher" "child_added"
        database.ref().on("child_added", function(snapshot){
        

            console.log(snapshot.val().trainName);
            var myTrainObject = snapshot.val();
            // Calculating minutesAway
            console.log(firstTrainTime);
         var firstTrainTimeConverted = moment (parseInt(myTrainObject.firstTrainTime), "hh:mm")//.subtract(1, "years");
              console.log(firstTrainTimeConverted);
              // Current Time
              var currentTime = moment();
              console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
              // Difference between the times
              var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
              console.log("DIFFERENCE IN TIME: " + diffTime);
              // Time apart (remainder)
              var remainder = diffTime % parseInt(myTrainObject.frequency);
              console.log(remainder);
              // Minute Until Train
              var minutesAway = parseInt(myTrainObject.frequency) - remainder;
              console.log("minutesAway: " + minutesAway);
              // Next Arrival
              var nextArrival = moment().add(minutesAway, "minutes");
              nextArrival = moment(nextArrival).format("hh:mm")
              console.log("nextArrival: " + moment(nextArrival).format("hh:mm"));


        var trainRow = "<tr>" + 
            "<td>" + snapshot.val().trainName + "</td>" +
            "<td>" + snapshot.val().destination + "</td>" +
            // "<td>" + snapshot.val().firstTrainTime + "</td>" +
            "<td>" + snapshot.val().frequency + "</td>" +
            "<td>" + nextArrival + "</td>" +
            "<td>" + minutesAway + "</td>" +


          "</tr>";    

            $("#trainContainer").append(trainRow);       
            
        });
              // Calcuating nextArrival and minutesAway
              // Assumptions
              // var frequency = 3;
              // // Time is 3:30 AM
              // var firstTrainTime = "03:30";
              // First Time (pushed back 1 year to make sure it comes before current time)
             


     