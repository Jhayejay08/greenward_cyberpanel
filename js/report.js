 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 import { getDatabase, set, ref, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
 import { getAuth, createUserWithEmailAndPassword, deleteUser, signOut, reauthenticateWithCredential, EmailAuthProvider, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 var appId = sessionStorage.getItem('appId')
 if (appId === '' || appId === null ) {
     window.location.href = "redirect.php"
   }
   
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: sessionStorage.getItem('apiKey'),
   authDomain: sessionStorage.getItem('authDomain'),
   databaseURL: sessionStorage.getItem('databaseURL'),
   projectId: sessionStorage.getItem('projectId'),
   storageBucket: sessionStorage.getItem('storageBucket'),
   messagingSenderId: sessionStorage.getItem('messagingSenderId'),
   appId: sessionStorage.getItem('appId')
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getDatabase(app);
 const auth = getAuth(app);


 function openViewModal(button) {
   // Get the row associated with the clicked button
   var row = button.closest('tr');

   // Get data from the row
   var nodeNum = row.cells[1].innerText;
   var soundValue = row.cells[2].innerText;
   var flameValue = row.cells[3].innerText;
   var smokeValue = row.cells[4].innerText;
   var dateTime = row.cells[5].innerText;

   // Update the modal with data from the selected row
   document.getElementById('nodeView').value = nodeNum;
   document.getElementById('soundView').value = soundValue;
   document.getElementById('fireView').value = flameValue;
   document.getElementById('smokeView').value = smokeValue;
   document.getElementById('datetimeView').value = dateTime;

   // Open the "View Report" modal
   var viewReportModal = new bootstrap.Modal(document.getElementById('viewReportModal'));
   viewReportModal.show();
 }

 // var userNo = 0;
             var tbody = document.getElementById('tbody1');
             var num = 0;

             function AddItemToTable(nodeNum, Sound, Flame, Smoke, dateTime){
                 let trow = document.createElement('tr');
                 let td1 = document.createElement('td'); 
                 let td2 = document.createElement('td'); 
                 let td3 = document.createElement('td'); 
                 let td4 = document.createElement('td'); 
                 let td5 = document.createElement('td'); 
                 let td6 = document.createElement('td');
                 let td7 = document.createElement('td');

                 td1.innerHTML =++ num;
                 td2.innerHTML = nodeNum;
                 td3.innerHTML = getSoundText(Sound);
                 td4.innerHTML = getFlameText(Flame);
                 td5.innerHTML = getSmokeText(Smoke);
                 td6.innerHTML = dateTime;
                 

                 let editButton = document.createElement('button');
                 editButton.className = 'btn btn-primary btn-sm ';
                 editButton.innerHTML = 'View';
                 editButton.addEventListener('click', function () {
                        
                   openViewModal(this);

                     });

                 td7.appendChild(editButton);

                 trow.appendChild(td1);
                 trow.appendChild(td2);
                 trow.appendChild(td3);
                 trow.appendChild(td4);
                 trow.appendChild(td5);
                 trow.appendChild(td6);
                 trow.appendChild(td7);

                 tbody.appendChild(trow);
             }

             function getSmokeText(value) {
                 if (value >= 39 && value <= 49) {
                     return '<span style="color: orange;">' + value + ' %' + '</span>';
                 } else if (value >= 50) {
                     return '<span style="color: red;">' + value + ' %' +'</span>';
                 } else {
                     return value + " %";
                 }
             }

             function getSoundText(value) {
                 if (value >= 64 && value <= 85) {
                     return '<span style="color: orange;">' + value + ' dB' + '</span>';
                 } else if (value > 85) {
                     return '<span style="color: red;">' + value + ' dB' +'</span>';
                 } else {
                     return value + " dB";
                 }
             }

             function getFlameText(value) {
                 if (value === 1) {
                     return '<span style="color: red;">Fire Detected</span>';
                 } else {
                     return 'No Fire Detected';
                 }
             }

             function AddAllItemsToTable(TheReport){
                 num=0;
                 TheReport.sort(function (a, b) {
                 var dateA = new Date(a.dateTime);
                 var dateB = new Date(b.dateTime);
                 return dateB - dateA;
             });

                 tbody.innerHTML="";

                 TheReport.forEach(element => {
                     AddItemToTable(element.NodeNumber, element.SoundSensor, element.FlameSensor, element.SmokeSensor, element.dateTime);
                     
                 });
             }


           //  window.filterTable = function(){
           //         // Get the selected date from the input
           //         var filterDate = document.getElementById('filterDateInput').value;

           //         // If the filter date is not empty
           //         if (filterDate) {
           //             // Convert the selected date to a JavaScript Date object
           //             var selectedDate = new Date(filterDate);

           //             // Filter the rows based on the selected date
           //             var rows = tbody.getElementsByTagName('tr');
           //             for (var i = 0; i < rows.length; i++) {
           //                 var rowDate = new Date(rows[i].getElementsByTagName('td')[5].innerHTML); // Assuming the date is in the 5th column (index 4)
                           
           //                 // Compare the date and hide/show the row accordingly
           //                 if (rowDate.toDateString() === selectedDate.toDateString()) {
           //                     rows[i].style.display = '';
           //                 } else {
           //                     rows[i].style.display = 'none';
           //                 }
           //             }
           //         } else {
           //             // If the filter date is empty, show all rows
           //             var rows = tbody.getElementsByTagName('tr');
           //             for (var i = 0; i < rows.length; i++) {
           //                 rows[i].style.display = '';
           //             }
           //         }
           //     }




//            window.filterTable = function () {
//    // Get the selected date from the input
//    var filterDate = document.getElementById('filterDateInput').value;

//    // If the filter date is not empty
//    if (filterDate) {
//        // Convert the selected date to a JavaScript Date object
//        var selectedDate = new Date(filterDate);

//        // Filter the rows based on the selected date
//        var rows = tbody.getElementsByTagName('tr');
//        var visibleRows = 0; // Counter for visible rows

//        for (var i = 0; i < rows.length; i++) {
//            var rowDate = new Date(rows[i].getElementsByTagName('td')[5].innerHTML); // Assuming the date is in the 6th column (index 5)

//            // Compare the date and hide/show the row accordingly
//            if (rowDate.toDateString() === selectedDate.toDateString()) {
//                rows[i].style.display = '';
//                visibleRows++;
//                // Update the row number for visible rows
//                rows[i].getElementsByTagName('td')[0].innerHTML = visibleRows;
//            } else {
//                rows[i].style.display = 'none';
//            }
//        }
//    } else {
//        // If the filter date is empty, show all rows
//        var rows = tbody.getElementsByTagName('tr');
//        for (var i = 0; i < rows.length; i++) {
//            rows[i].style.display = '';
//            // Update the row number for all rows
//            rows[i].getElementsByTagName('td')[0].innerHTML = i + 1;
//        }
//    }
// }

// window.filterTable = function () {
//     alert("filter clicked");
//     // Get the selected date from the input
//     var filterDate = document.getElementById('filterDateInput').value;

//     // Get the selected sensor type from the dropdown
//     var sensorType = document.getElementById('filterDropdownButton').value.toLowerCase();

//     // If the filter date is not empty
//     if (filterDate) {
//         // Convert the selected date to a JavaScript Date object
//         var selectedDate = new Date(filterDate);

//         // Filter the rows based on the selected date and sensor type
//         var rows = tbody.getElementsByTagName('tr');
//         var visibleRows = 0; // Counter for visible rows

//         for (var i = 0; i < rows.length; i++) {
//             var rowDate = new Date(rows[i].getElementsByTagName('td')[5].innerHTML); // Assuming the date is in the 6th column (index 5)
//             var rowSensorType = rows[i].getElementsByTagName('td')[2].innerHTML.toLowerCase(); // Assuming the sensor type is in the 3rd column (index 2)

//             // Compare the date and sensor type, and hide/show the row accordingly
//             if (rowDate.toDateString() === selectedDate.toDateString() && rowSensorType === sensorType) {
//                 rows[i].style.display = '';
//                 visibleRows++;
//                 // Update the row number for visible rows
//                 rows[i].getElementsByTagName('td')[0].innerHTML = visibleRows;
//             } else {
//                 rows[i].style.display = 'none';
//             }
//         }
//     } else {
//         // If the filter date is empty, show all rows based on the selected sensor type
//         var rows = tbody.getElementsByTagName('tr');
//         var visibleRows = 0; // Counter for visible rows

//         for (var i = 0; i < rows.length; i++) {
//             var rowSensorType = rows[i].getElementsByTagName('td')[2].innerHTML.toLowerCase(); // Assuming the sensor type is in the 3rd column (index 2)

//             // Compare the sensor type, and hide/show the row accordingly
//             if (rowSensorType === sensorType) {
//                 rows[i].style.display = '';
//                 visibleRows++;
//                 // Update the row number for visible rows
//                 rows[i].getElementsByTagName('td')[0].innerHTML = visibleRows;
//             } else {
//                 rows[i].style.display = 'none';
//             }
//         }
//     }
// }




window.filterTable = function () {
    // Get the selected date from the input
    var filterDate = document.getElementById('filterDateInput').value;
 
    // If the filter date is not empty
    if (filterDate) {
        // Convert the selected date to a JavaScript Date object
        var selectedDate = new Date(filterDate);
 
        // Filter the rows based on the selected date
        var rows = tbody.getElementsByTagName('tr');
        var visibleRows = 0; // Counter for visible rows
 
        for (var i = 0; i < rows.length; i++) {
            var rowDate = new Date(rows[i].getElementsByTagName('td')[5].innerHTML); // Assuming the date is in the 6th column (index 5)
 
            // Compare the date and hide/show the row accordingly
            if (rowDate.toDateString() === selectedDate.toDateString()) {
                rows[i].style.display = '';
                visibleRows++;
                // Update the row number for visible rows
                rows[i].getElementsByTagName('td')[0].innerHTML = visibleRows;
            } else {
                rows[i].style.display = 'none';
            }
        }
    } else {
        // If the filter date is empty, show all rows
        var rows = tbody.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {
            rows[i].style.display = '';
            // Update the row number for all rows
            rows[i].getElementsByTagName('td')[0].innerHTML = i + 1;
        }
    }
 }




             function GetAllDataOnce(){
                 const dbref = ref(db);

                 get(child(dbref, "Reports"))
                 .then((snapshot)=>{
                     var reports = [];

                     // snapshot.forEach(childSnapshot=>{
                     //     users.push(childSnapshot.val());
                     // });

                     snapshot.forEach(childSnapshot => {
                     // const user = childSnapshot.val();
                     // user.uid = childSnapshot.key; // Add UID to the user object
                     reports.push(childSnapshot.val());
                 });
                   
                     AddAllItemsToTable(reports);
                 })
                 .catch((error) => {
                 console.error("Error getting data: ", error);
                 });
             }

             function GetAllDataRealTime(){
                 const dbref = ref(db,'Reports');

                 onValue(dbref,(snapshot)=>{
                     var reports = [];

                 // snapshot.forEach(childSnapshot=>{
                 //     users.push(childSnapshot.val());
                 // });

                 snapshot.forEach(childSnapshot => {
                 // const user = childSnapshot.val();
                 // user.uid = childSnapshot.key; // Add UID to the user object
                 reports.push(childSnapshot.val());
                 });

                 // Apply filtering if a date is selected
                 var filterDate = document.getElementById('filterDateInput').value;
                 if (filterDate) {
                     var selectedDate = new Date(filterDate);
                     reports = reports.filter(report => {
                         var rowDate = new Date(report.dateTime);
                         return rowDate.toDateString() === selectedDate.toDateString();
                     });
                 }
               
                 AddAllItemsToTable(reports);

                 })
             }



             //alert even in this page start
           const fireAlertAudio = document.getElementById('fireAlertAudio');
           

           window.displayFirebaseDataSound = function() {
               // Function to read data from Firebase and display it in the h3 tag
               // function displayFirebaseDataSound() {
                   const soundAlertModal = new bootstrap.Modal(document.getElementById('soundAlert'));
                   // const h3Element = document.getElementById('soundData');
                   // const soundAlertCard = document.getElementById('soundalertCard');
                   // const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();

                   // console.log('Selected Node sound:', selectedNodeVal);

                   // const soundPath = `Nodes/${selectedNodeVal}/SoundSensor`;
                   // console.log('Firebase Path sound:', soundPath);
               // Assuming 'your_data_path' is the path to the data in your Firebase
               // const Sound = ref(db, 'Nodes/Node1/SoundSensor');
               const Sound = ref(db, "Nodes/Node1/SoundSensor");
               
               
               onValue(Sound, (snapshot) => {
               const data = snapshot.val();
               if (data !== null) {
                   
                   // h3Element.innerText = data + " " + "dB"; // Update the content of the h3 tag

                   if(data < 64){
                       // soundAlertModal.show();
                       // soundAlertCard.style.backgroundColor = '';
                       soundAlertModal.hide();
                       fireAlertAudio.pause();
                       fireAlertAudio.currentTime = 0;

                       // document.body.style.backgroundColor = 'yellow';
                   }else if( data >= 64 && data < 85 ){
                       soundAlertModal.show();
                       // document.body.style.backgroundColor = 'yellow';
                       // soundAlertCard.style.backgroundColor = 'orange';

                        // Check if the audio is paused or has ended
                        if (fireAlertAudio.paused || fireAlertAudio.ended) {
                           // Play the audio and set up the loop
                           fireAlertAudio.play();
                           fireAlertAudio.addEventListener('ended', function () {
                               this.currentTime = 0;
                               this.play();
                           });
                       }

                   }else if(data => 85){
                       soundAlertModal.show();
                       // soundAlertModal.hide();
                       // document.body.style.backgroundColor = '';
                       // soundAlertCard.style.backgroundColor = 'red';

                        // Check if the audio is paused or has ended
                        if (fireAlertAudio.paused || fireAlertAudio.ended) {
                           // Play the audio and set up the loop
                           fireAlertAudio.play();
                           fireAlertAudio.addEventListener('ended', function () {
                               this.currentTime = 0;
                               this.play();
                           });
                       }

                   }
                   
               } else {
                   // h3Element.innerText = 'No data available';
                   // document.body.style.backgroundColor = '';
               }
               }, (error) => {
                   console.error('Error getting data from Firebase:', error);
               });

               }

               

               // function displayFirebaseDataFlame() {
               window.displayFirebaseDataFlame = function() {
                   
                   const fireAlertModal = new bootstrap.Modal(document.getElementById('fireAlert'));
                   // const h3Element = document.getElementById('flameData');
                   // const fireAlertCard = document.getElementById('firealertCard');
                   // const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();

                   // console.log('Selected Node fire:', selectedNodeVal);

                   // const firePath = `Nodes/${selectedNodeVal}/FlameSensor`;
                   
                   // console.log('Firebase Path sound:', firePath);

               // Assuming 'your_data_path' is the path to the data in your Firebase
               const Flame = ref(db, "Nodes/Node1/FlameSensor");
                
               onValue(Flame, (snapshot) => {
               const data = snapshot.val();
               if (data !== null) {
                   if (data === 0) {
                   // h3Element.innerText = 'No fire detected';
                   // // document.body.style.backgroundColor = '';
                   // fireAlertCard.style.backgroundColor = '';
                   fireAlertModal.hide();
                   fireAlertAudio.pause();
                   fireAlertAudio.currentTime = 0;

                   } else if (data === 1) {
                       // h3Element.innerText = 'Fire detected! Take immediate action.';
                       // You can also trigger additional actions/alerts here
                       fireAlertModal.show();
                       
                       // Check if the audio is paused or has ended
                       if (fireAlertAudio.paused || fireAlertAudio.ended) {
                           // Play the audio and set up the loop
                           fireAlertAudio.play();
                           fireAlertAudio.addEventListener('ended', function () {
                               this.currentTime = 0;
                               this.play();
                           });
                       }
                       // fireAlertCard.style.backgroundColor = 'red';
                       // document.body.style.backgroundColor = 'red';
                   } else {
                       // h3Element.innerText = 'Invalid data received';
                       // fireAlertCard.style.backgroundColor = '';
                   }

               } else {
                   // h3Element.innerText = 'No data available';
                   // fireAlertCard.style.backgroundColor = '';
               }
               }, (error) => {
                   console.error('Error getting data from Firebase:', error);
               });

               }


               window.displayFirebaseDataSmoke = function() {
               // function displayFirebaseDataSmoke() {
                   // const h3Element = document.getElementById('smokeData');
                   // const smokeAlertCard = document.getElementById('smokealertCard');
                   // const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();
                   // const smokePath = `Nodes/${selectedNodeVal}/SmokeSensor`;

                   // console.log('Selected Node smoke:', selectedNodeVal);
                   // console.log('Firebase Path sound:', smokePath);
                   const smokeAlertModal = new bootstrap.Modal(document.getElementById('smokeAlert'));
               // Assuming 'your_data_path' is the path to the data in your Firebase
               const Smoke = ref(db, "Nodes/Node1/SmokeSensor");

               onValue(Smoke, (snapshot) => {
               const data = snapshot.val();
               if (data !== null) {
                   // h3Element.innerText = data + " " + "%"; // Update the content of the h3 tag
                   if(data < 39){
                       // smokeAlertCard.style.backgroundColor = '';
                       smokeAlertModal.hide();
                       fireAlertAudio.pause();
                       fireAlertAudio.currentTime = 0;

                   }else if(data >= 39 && data < 50){
                       // smokeAlertCard.style.backgroundColor = 'orange';
                       smokeAlertModal.show();
                       // Check if the audio is paused or has ended
                       if (fireAlertAudio.paused || fireAlertAudio.ended) {
                           // Play the audio and set up the loop
                           fireAlertAudio.play();
                           fireAlertAudio.addEventListener('ended', function () {
                               this.currentTime = 0;
                               this.play();
                           });
                       }

                   }else if(data >= 50){
                       // smokeAlertCard.style.backgroundColor = 'red';
                       smokeAlertModal.show();
                       // Check if the audio is paused or has ended
                       if (fireAlertAudio.paused || fireAlertAudio.ended) {
                           // Play the audio and set up the loop
                           fireAlertAudio.play();
                           fireAlertAudio.addEventListener('ended', function () {
                               this.currentTime = 0;
                               this.play();
                           });
                       }

                   }


               } else {
                   // h3Element.innerText = 'No data available';
               }
               }, (error) => {
                   console.error('Error getting data from Firebase:', error);
               });

               }



               window.displayFirebaseDataGPS11 = function() {
               // function displayFirebaseDataGPS() {
                   // const h3Element = document.getElementById('GPS');
                   const mapLinkElement = document.getElementById('mapLink11');
                   // const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();
                   const mapPath = `Nodes/Node1/mapLink`;

                   // console.log('Selected Node gps:', selectedNodeVal);
                   // console.log('Firebase Path sound:', mapPath);

               // Assuming 'your_data_path' is the path to the data in your Firebase
               const gps = ref(db, mapPath);

               onValue(gps, (snapshot) => {
               const data = snapshot.val();
               if (data !== null) {
                   mapLinkElement.href = data;
                   // h3Element.innerText = data;
               } else {
                   mapLinkElement.href = '#';
               }
               }, (error) => {
                   console.error('Error getting data from Firebase:', error);
               });

               }

               window.displayFirebaseDataGPS12 = function() {
               // function displayFirebaseDataGPS() {
                   // const h3Element = document.getElementById('GPS');
                   const mapLinkElement = document.getElementById('mapLink12');
                   // const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();
                   const mapPath = `Nodes/Node1/mapLink`;

                   // console.log('Selected Node gps:', selectedNodeVal);
                   // console.log('Firebase Path sound:', mapPath);

               // Assuming 'your_data_path' is the path to the data in your Firebase
               const gps = ref(db, mapPath);

               onValue(gps, (snapshot) => {
               const data = snapshot.val();
               if (data !== null) {
                   mapLinkElement.href = data;
                   // h3Element.innerText = data;
               } else {
                   mapLinkElement.href = '#';
               }
               }, (error) => {
                   console.error('Error getting data from Firebase:', error);
               });

               }

               window.displayFirebaseDataGPS13 = function() {
               // function displayFirebaseDataGPS() {
                   // const h3Element = document.getElementById('GPS');
                   const mapLinkElement = document.getElementById('mapLink13');
                   // const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();
                   const mapPath = `Nodes/Node1/mapLink`;

                   // console.log('Selected Node gps:', selectedNodeVal);
                   // console.log('Firebase Path sound:', mapPath);

               // Assuming 'your_data_path' is the path to the data in your Firebase
               const gps = ref(db, mapPath);

               onValue(gps, (snapshot) => {
               const data = snapshot.val();
               if (data !== null) {
                   mapLinkElement.href = data;
                   // h3Element.innerText = data;
               } else {
                   mapLinkElement.href = '#';
               }
               }, (error) => {
                   console.error('Error getting data from Firebase:', error);
               });

               }




                //alert for NODE 1 even in this page end



                //ALERT FOR NODE 2

                window.displayFirebaseDataSound2 = function() {
               // Function to read data from Firebase and display it in the h3 tag
               // function displayFirebaseDataSound() {
                   const soundAlertModal = new bootstrap.Modal(document.getElementById('soundAlert2'));
                   // const h3Element = document.getElementById('soundData');
                   // const soundAlertCard = document.getElementById('soundalertCard');
                   // const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();

                   // console.log('Selected Node sound:', selectedNodeVal);

                   // const soundPath = `Nodes/${selectedNodeVal}/SoundSensor`;
                   // console.log('Firebase Path sound:', soundPath);
               // Assuming 'your_data_path' is the path to the data in your Firebase
               // const Sound = ref(db, 'Nodes/Node1/SoundSensor');
               const Sound = ref(db, "Nodes/Node2/SoundSensor");
               
               
               onValue(Sound, (snapshot) => {
               const data = snapshot.val();
               if (data !== null) {
                   
                   // h3Element.innerText = data + " " + "dB"; // Update the content of the h3 tag

                   if(data < 64){
                       // soundAlertModal.show();
                       // soundAlertCard.style.backgroundColor = '';
                       soundAlertModal.hide();
                       fireAlertAudio.pause();
                       fireAlertAudio.currentTime = 0;

                       // document.body.style.backgroundColor = 'yellow';
                   }else if( data >= 64 && data <= 85 ){
                       soundAlertModal.show();
                       // document.body.style.backgroundColor = 'yellow';
                       // soundAlertCard.style.backgroundColor = 'orange';

                        // Check if the audio is paused or has ended
                        if (fireAlertAudio.paused || fireAlertAudio.ended) {
                           // Play the audio and set up the loop
                           fireAlertAudio.play();
                           fireAlertAudio.addEventListener('ended', function () {
                               this.currentTime = 0;
                               this.play();
                           });
                       }

                   }else if(data > 85){
                       soundAlertModal.show();
                       // soundAlertModal.hide();
                       // document.body.style.backgroundColor = '';
                       // soundAlertCard.style.backgroundColor = 'red';

                        // Check if the audio is paused or has ended
                        if (fireAlertAudio.paused || fireAlertAudio.ended) {
                           // Play the audio and set up the loop
                           fireAlertAudio.play();
                           fireAlertAudio.addEventListener('ended', function () {
                               this.currentTime = 0;
                               this.play();
                           });
                       }

                   }
                   
               } else {
                   // h3Element.innerText = 'No data available';
                   // document.body.style.backgroundColor = '';
               }
               }, (error) => {
                   console.error('Error getting data from Firebase:', error);
               });

               }

               

               // function displayFirebaseDataFlame() {
               window.displayFirebaseDataFlame2 = function() {
                   
                   const fireAlertModal = new bootstrap.Modal(document.getElementById('fireAlert2'));
                   // const h3Element = document.getElementById('flameData');
                   // const fireAlertCard = document.getElementById('firealertCard');
                   // const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();

                   // console.log('Selected Node fire:', selectedNodeVal);

                   // const firePath = `Nodes/${selectedNodeVal}/FlameSensor`;
                   
                   // console.log('Firebase Path sound:', firePath);

               // Assuming 'your_data_path' is the path to the data in your Firebase
               const Flame = ref(db, "Nodes/Node2/FlameSensor");
                
               onValue(Flame, (snapshot) => {
               const data = snapshot.val();
               if (data !== null) {
                   if (data === 0) {
                   // h3Element.innerText = 'No fire detected';
                   // // document.body.style.backgroundColor = '';
                   // fireAlertCard.style.backgroundColor = '';
                   fireAlertModal.hide();
                   fireAlertAudio.pause();
                   fireAlertAudio.currentTime = 0;

                   } else if (data === 1) {
                       // h3Element.innerText = 'Fire detected! Take immediate action.';
                       // You can also trigger additional actions/alerts here
                       fireAlertModal.show();
                       
                       // Check if the audio is paused or has ended
                       if (fireAlertAudio.paused || fireAlertAudio.ended) {
                           // Play the audio and set up the loop
                           fireAlertAudio.play();
                           fireAlertAudio.addEventListener('ended', function () {
                               this.currentTime = 0;
                               this.play();
                           });
                       }
                       // fireAlertCard.style.backgroundColor = 'red';
                       // document.body.style.backgroundColor = 'red';
                   } else {
                       // h3Element.innerText = 'Invalid data received';
                       // fireAlertCard.style.backgroundColor = '';
                   }

               } else {
                   // h3Element.innerText = 'No data available';
                   // fireAlertCard.style.backgroundColor = '';
               }
               }, (error) => {
                   console.error('Error getting data from Firebase:', error);
               });

               }


               window.displayFirebaseDataSmoke2 = function() {
               // function displayFirebaseDataSmoke() {
                   // const h3Element = document.getElementById('smokeData');
                   // const smokeAlertCard = document.getElementById('smokealertCard');
                   // const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();
                   // const smokePath = `Nodes/${selectedNodeVal}/SmokeSensor`;

                   // console.log('Selected Node smoke:', selectedNodeVal);
                   // console.log('Firebase Path sound:', smokePath);
                   const smokeAlertModal = new bootstrap.Modal(document.getElementById('smokeAlert2'));
               // Assuming 'your_data_path' is the path to the data in your Firebase
               const Smoke = ref(db, "Nodes/Node2/SmokeSensor");

               onValue(Smoke, (snapshot) => {
               const data = snapshot.val();
               if (data !== null) {
                   // h3Element.innerText = data + " " + "%"; // Update the content of the h3 tag
                   if(data < 39){
                       // smokeAlertCard.style.backgroundColor = '';
                       smokeAlertModal.hide();
                       fireAlertAudio.pause();
                       fireAlertAudio.currentTime = 0;

                   }else if(data >= 39 && data < 50){
                       // smokeAlertCard.style.backgroundColor = 'orange';
                       smokeAlertModal.show();
                       // Check if the audio is paused or has ended
                       if (fireAlertAudio.paused || fireAlertAudio.ended) {
                           // Play the audio and set up the loop
                           fireAlertAudio.play();
                           fireAlertAudio.addEventListener('ended', function () {
                               this.currentTime = 0;
                               this.play();
                           });
                       }

                   }else if(data >= 50){
                       // smokeAlertCard.style.backgroundColor = 'red';
                       smokeAlertModal.show();
                       // Check if the audio is paused or has ended
                       if (fireAlertAudio.paused || fireAlertAudio.ended) {
                           // Play the audio and set up the loop
                           fireAlertAudio.play();
                           fireAlertAudio.addEventListener('ended', function () {
                               this.currentTime = 0;
                               this.play();
                           });
                       }

                   }


               } else {
                   // h3Element.innerText = 'No data available';
               }
               }, (error) => {
                   console.error('Error getting data from Firebase:', error);
               });

               }


               window.displayFirebaseDataGPS21 = function() {
               // function displayFirebaseDataGPS() {
                   // const h3Element = document.getElementById('GPS');
                   const mapLinkElement = document.getElementById('mapLink21');
                   // const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();
                   const mapPath = `Nodes/Node2/mapLink`;

                   // console.log('Selected Node gps:', selectedNodeVal);
                   // console.log('Firebase Path sound:', mapPath);

               // Assuming 'your_data_path' is the path to the data in your Firebase
               const gps = ref(db, mapPath);

               onValue(gps, (snapshot) => {
               const data = snapshot.val();
               if (data !== null) {
                   mapLinkElement.href = data;
                   // h3Element.innerText = data;
               } else {
                   mapLinkElement.href = '#';
               }
               }, (error) => {
                   console.error('Error getting data from Firebase:', error);
               });

               }

               window.displayFirebaseDataGPS22 = function() {
               // function displayFirebaseDataGPS() {
                   // const h3Element = document.getElementById('GPS');
                   const mapLinkElement = document.getElementById('mapLink22');
                   // const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();
                   const mapPath = `Nodes/Node2/mapLink`;

                   // console.log('Selected Node gps:', selectedNodeVal);
                   // console.log('Firebase Path sound:', mapPath);

               // Assuming 'your_data_path' is the path to the data in your Firebase
               const gps = ref(db, mapPath);

               onValue(gps, (snapshot) => {
               const data = snapshot.val();
               if (data !== null) {
                   mapLinkElement.href = data;
                   // h3Element.innerText = data;
               } else {
                   mapLinkElement.href = '#';
               }
               }, (error) => {
                   console.error('Error getting data from Firebase:', error);
               });

               }

               window.displayFirebaseDataGPS23 = function() {
               // function displayFirebaseDataGPS() {
                   // const h3Element = document.getElementById('GPS');
                   const mapLinkElement = document.getElementById('mapLink23');
                   // const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();
                   const mapPath = `Nodes/Node2/mapLink`;

                   // console.log('Selected Node gps:', selectedNodeVal);
                   // console.log('Firebase Path sound:', mapPath);

               // Assuming 'your_data_path' is the path to the data in your Firebase
               const gps = ref(db, mapPath);

               onValue(gps, (snapshot) => {
               const data = snapshot.val();
               if (data !== null) {
                   mapLinkElement.href = data;
                   // h3Element.innerText = data;
               } else {
                   mapLinkElement.href = '#';
               }
               }, (error) => {
                   console.error('Error getting data from Firebase:', error);
               });

               }

                //alert NODE 2 even in this page end

                function GetAllPhoneNumbersRealTime() {
                    // console.log("hello");
                    const dbref = ref(db, 'contactNumber');
                  
                    onValue(dbref, (snapshot) => {
                      var phoneNumbers = [];
                  
                      snapshot.forEach(childSnapshot => {
                        const phoneNumber = childSnapshot.val().phone; // Extract phone number
                        phoneNumbers.push(phoneNumber);
                  
                      });
                      
                           // Save phone numbers to the 'emergencyContacts' node
                           savePhoneNumbers(phoneNumbers);
                      
                    });
                  }
                  
                  function savePhoneNumbers(phoneNumbers) {
                    // Reference to the 'emergencyContacts' node
                    const emergencyContactsRef = ref(db, 'emergencyContacts');
                  
                    // Set the phone numbers under the 'emergencyContacts' node
                    set(emergencyContactsRef, phoneNumbers)
                      .then(() => {
                        // console.log("Phone numbers saved to emergencyContacts node:", phoneNumbers);
                      })
                      .catch((error) => {
                        console.error("Error saving phone numbers:", error);
                      });
                  }

             // window.onload = GetAllDataRealTime;
             window.onload = function () {

                GetAllPhoneNumbersRealTime();

                 //GetAllDataRealTime();
                 displayFirebaseDataSound();
                 displayFirebaseDataFlame();
                 displayFirebaseDataSmoke();
                 displayFirebaseDataGPS11();
                 displayFirebaseDataGPS12();
                 displayFirebaseDataGPS13();
                 displayFirebaseDataSound2();
                 displayFirebaseDataFlame2();
                 displayFirebaseDataSmoke2();
                 displayFirebaseDataGPS21();
                 displayFirebaseDataGPS22();
                 displayFirebaseDataGPS23();
                // updateFullName();
             };




             
             auth.onAuthStateChanged((user) => {
           if (user) {
               // User is signed in
               const uid = user.uid;

               // Event listener for the "UserProfile" link click
               document.getElementById('UserProfile').addEventListener('click', () => {
                   // Reference to the user's data in the Realtime Database (Assuming 'users' is your node name)
                   var Profile = sessionStorage.getItem('user-creds');
                   var profileInfo = JSON.parse(Profile);
                   var user_uid = profileInfo.uid;
                   const userRef = ref(db, 'users/' + user_uid);

                   // Fetch the user data
                   get(userRef).then((snapshot) => {
                       const userData = snapshot.val();
                       if (userData) {
                           // Populate the form fields with the user data
                           document.getElementById('uidProfile').value = user_uid;
                           document.getElementById('editfirstNameProfile').value = userData.firstname;
                           document.getElementById('editlastNameProfile').value = userData.lastname;
                           document.getElementById('editemailInpProfile').value = userData.email;
                           document.getElementById('editphoneProfile').value = userData.phone;
                       } else {
                           console.log("User not found");
                           // Handle the case when the user is not found
                       }
                   }).catch((error) => {
                       //console.log("Error getting user information:", error);
                       // Handle the error
                   });
               });
           } else {
               // User is signed out
               // Handle signed-out state, if needed
           }
       });






            let editProfileForm = document.getElementById('editProfileForm');
            let phoneEditProfile = document.getElementById('editphoneProfile');

           //funtion to update user profile
           function UpdateUserProfile(event){
               event.preventDefault();

                   // Check if the phone number is more than 11 numeric digits
                   if (!/^\d{11}$/.test(phoneEditProfile.value)) {
                       alert("Phone number should consist of 11 numeric digits");
                       return;
                   }
                   
                   update(ref(db, 'users/' + document.getElementById('uidProfile').value), {
               firstname: document.getElementById('editfirstNameProfile').value.toUpperCase(),
               lastname: document.getElementById('editlastNameProfile').value.toUpperCase(),
               phone: document.getElementById('editphoneProfile').value,             
               })

               //let uid = document.getElementById('uidUser').value;
               // update(ref(db, 'users/' + userUid), {
               // firstname: fName,
               // lastname: lName,
               // phone: Phone,  
               // })
               .then(()=>{
                const trimmedPhoneNumber = document.getElementById('editphoneProfile').value.trim();
                const phoneNumber = '+63' + trimmedPhoneNumber.substring(1);

                   update(ref(db, 'contactNumber/' + document.getElementById('uidProfile').value), {
                   phone: phoneNumber
                   //document.getElementById('editphoneProfile').value,             
                   })

               // Alert user updated successfully
               alert('Profile updated successfully!');
               let editUserProfileModal = new bootstrap.Modal(document.getElementById('userProfileModal'));
               editUserProfileModal.hide();

               location.reload();
               })
               .catch((error)=>{
               alert(error.message);
               //console.log(error.code);
              // console.log(error.message);
               })

           }
         
           editProfileForm.addEventListener('submit', UpdateUserProfile);
               //  editUserbtn.addEventListener('submit', UpdateUser);



           //send reset password link through EMAIL Profile
                  

                   document.getElementById('resetPasswordLink').addEventListener('click', function() {
                       event.preventDefault();
                       // Remove the readonly attribute temporarily
                       document.getElementById('editemailInpProfile').removeAttribute('readonly');

                       let emailProfile = document.getElementById('editemailInpProfile').value;

                   if (emailProfile) {
                       sendPasswordResetEmail(auth, emailProfile)
                       .then(() => {
                           // Password reset email sent!
                           alert('Password reset email sent successfully!');
                          // console.log("Password reset email sent!");
                           // location.reload();
                           // Handle success, e.g., show a success message to the user
                       })
                       .catch((error) => {
                           const errorCode = error.code;
                           const errorMessage = error.message;
                           console.error("Error sending password reset email:", errorCode, errorMessage);
                           alert(`Error sending password reset email: ${errorCode} - ${errorMessage}`);
                           // Handle error, e.g., show an error message to the user
                       });
                   } else {
                       console.error("Invalid or missing email address.");
                       alert("Invalid or missing email address.");
                      // console.log(emailProfile);
                       // Handle the case where email is missing or invalid
                   }
                   });

                   

                   let addNodeForm = document.getElementById('addNodeForm');

                   let addNode = evt => {
                       evt.preventDefault();
                   
                       let nodeNameInput = document.getElementById('nodeName');
                       let nodeName = nodeNameInput.value.trim();
                   
                       // Check if the node name is provided
                       if (!nodeName) {
                           alert("Please provide a node name");
                           return;
                       }
                   
                       // Check if the node name already exists
                       const nodeRef = ref(db, 'Nodes/' + nodeName);
                       get(nodeRef).then(snapshot => {
                           if (snapshot.exists()) {
                               alert("Node name already exists. Please choose a different name.");
                               return;
                           }
                   
                           // Define the data structure for the node with default sensor values
                           let nodeData = {
                               FlameSensor: 0,
                               SmokeSensor: 0,
                               SoundSensor: 0,
                               mapLink: ''
                           };
                   
                           // Save node data to Firebase under "Nodes"
                           set(ref(db, 'Nodes/' + nodeName), nodeData)
                           .then(() => {
                               alert('Node added successfully!');
                               let addNodeModal = new bootstrap.Modal(document.getElementById('addnodeModal'));
                               addNodeModal.hide();
                   
                               location.reload(); // Reload the page or update UI as needed
                           })
                           .catch(error => {
                               alert("An error occurred while adding the node: " + error.message);
                           });
                       }).catch(error => {
                           alert("An error occurred while checking the existence of the node: " + error.message);
                       });
                   };
                   
                   addNodeForm.addEventListener('submit', addNode);





                                    // Retrieve first name and last name for Authorized Signatory
                    const firstNamePath = `users/k0IFkJoCviM6Xfh4utiG0fVerxq1/firstname`;
                    const lastNamePath = `users/k0IFkJoCviM6Xfh4utiG0fVerxq1/lastname`;

                    const firstNameRef = ref(db, firstNamePath);
                    const lastNameRef = ref(db, lastNamePath);

                    let firstName = '';
                    let lastName = '';

                    //const fullNameElement = document.getElementById('fullname');

                    onValue(firstNameRef, (snapshot) => {
                        firstName = snapshot.val() || '';
                        console.log('First Name:', firstName); // Logging first name to console
                    
                    }, (error) => {
                        console.error('Error getting first name from Firebase:', error);
                    });

                    onValue(lastNameRef, (snapshot) => {
                        lastName = snapshot.val() || '';
                        console.log('Last Name:', lastName); // Logging last name to console
                    
                    }, (error) => {
                        console.error('Error getting last name from Firebase:', error);
                    });

                    // Define printTableData in the global scope
                    window.printTableData = function() {
                        var table = document.querySelector("table").outerHTML;
                        var printWindow = window.open('', '', 'height=600,width=800');
                        printWindow.document.write('<html><head><title>Print Table</title>');
                        printWindow.document.write('<style>');
                        printWindow.document.write('body { font-family: Arial, sans-serif; margin: 20px; }');
                        printWindow.document.write('h1 { text-align: center; }');
                        printWindow.document.write('.header { text-align: center; margin-bottom: 20px; }');
                        printWindow.document.write('.header img { max-width: 100px; display: block; margin: 0 auto; }');
                        printWindow.document.write('table { width: 100%; border-collapse: collapse; margin-top: 20px; }');
                        printWindow.document.write('table, th, td { border: 1px solid black; }');
                        printWindow.document.write('th, td { padding: 10px; text-align: left; }');
                        printWindow.document.write('.signatory { margin-top: 100px; text-align: center; }'); // Adjusted margin-top for signatory
                        printWindow.document.write('.signatory p { margin: 5px 0; }'); // Additional styling for the signatory text
                        printWindow.document.write('</style>');
                        printWindow.document.write('</head><body>');
                        printWindow.document.write('<div class="header">');
                        printWindow.document.write('<img src="img/DENR.png" alt="Logo"> ');  // Replace with your image URL
                        printWindow.document.write('<h1>DENR-CENRO\n Department of Environment and Natural Resources\n Pasi II, Socorro, Oriental Mindoro</h1>');
                        printWindow.document.write('</div>');
                        printWindow.document.write('<h1>GreenWard Gathered Data</h1>');
                        printWindow.document.write(table);
                        printWindow.document.write('<div class="signatory">');
                        printWindow.document.write('<p>________________________</p>');
                        printWindow.document.write('<p>' + firstName + ' ' + lastName + '</p>');
                        printWindow.document.write('<p>Forester II/Chief, EMS</p>');
                        printWindow.document.write('</div>');
                        printWindow.document.write('</body></html>');
                        printWindow.document.close();
                        printWindow.print();
                    }

                                        

                
                    // // Call updateFullName when both first name and last name are retrieved
                    // function updateFullName() {
                    //     if (firstName !== '' && lastName !== '') {
                    //         printTableData(firstName, lastName);
                    //     }
                    // }




                
//   // Function to update the chart with new data
//   function updateChart(data) {
//     var soundData = [];
//     var smokeData = [];
//     var fireData = [];
//     var labels = [];

//     data.forEach(function(entry) {
//       if (entry.SoundSensor !== undefined && entry.SmokeSensor !== undefined && entry.FlameSensor !== undefined && entry.dateTime !== undefined) {
//         soundData.push(entry.SoundSensor);
//         fireData.push(entry.FlameSensor);
//         smokeData.push(entry.SmokeSensor);
//         labels.push(entry.dateTime);
//       } else {
//         console.warn('Invalid data entry:', entry);
//       }
//     });

//     console.log('Sound Data:', soundData);
//     console.log('Smoke Data:', smokeData);
//     console.log('Fire Data:', fireData);
//     console.log('Labels:', labels);

//     // Update the chart's series data and labels
//     chart.updateSeries([{
//       name: 'Sound',
//       type: 'area',
//       data: soundData
//     }, {
//       name: 'Smoke',
//       type: 'line',
//       data: smokeData
//     }, {
//       name: 'Fire',
//       type: 'line',
//       data: fireData
//     }]);

//     chart.updateOptions({
//       labels: labels
//     });
//   }

// //   // Reference to the database service
//   const sensorDataRef = ref(db, 'Reports');

// //   // Fetch data from Firebase
// //   onValue(sensorDataRef, (snapshot) => {
// //     const data = [];
// //     snapshot.forEach((childSnapshot) => {
// //       data.push(childSnapshot.val());
// //     });

// //     updateChart(data);
// //   });


// // Fetch data from Firebase once the page has loaded
// window.addEventListener('load', () => {
//     get(sensorDataRef).then((snapshot) => {
//       const data = [];
//       snapshot.forEach((childSnapshot) => {
//         data.push(childSnapshot.val());
//       });
  
//       updateChart(data);
//     }).catch((error) => {
//       console.error('Error fetching data:', error);
//     });
//   });

  
  //edit report modal.
  // Ensure that Firebase and Bootstrap are properly included in your project

// auth.onAuthStateChanged((user) => {
//     if (user) {
//         // User is signed in

//         // Event listener for the "ViewReport" button click
//         document.getElementById('ViewReport').addEventListener('click', () => {
//             // Assuming you have a way to get the datetime value for the report
//             var reportDateTime = document.getElementById('datetimeInput').value; // This needs to be correctly set

//             if (reportDateTime) {
//                 // Reference to the report data in the Realtime Database
//                 const reportRef = ref(db, 'reports/' + reportDateTime);

//                 // Fetch the report data
//                 get(reportRef).then((snapshot) => {
//                     const reportData = snapshot.val();
//                     if (reportData) {
//                         // Populate the modal fields with the report data
//                         document.getElementById('nodeView').value = reportData.node || '';
//                         document.getElementById('soundView').value = reportData.sound || '';
//                         document.getElementById('fireView').value = reportData.fire || '';
//                         document.getElementById('smokeView').value = reportData.smoke || '';
//                         document.getElementById('datetimeView').value = reportData.datetime || '';
//                     } else {
//                         console.log("Report not found");
//                         // Handle the case when the report is not found
//                     }
//                 }).catch((error) => {
//                     console.log("Error getting report information:", error);
//                     // Handle the error
//                 });
//             } else {
//                 console.log("No datetime value provided");
//                 // Handle the case when no datetime value is provided
//             }
//         });

//         // Event listener for the "Update" button click
//         document.getElementById('updateReportButton').addEventListener('click', () => {
//             // Handle the update functionality here
//             console.log("Update button clicked");
//             // You can add logic to update the report or perform other actions
//         });

//     } else {
//         // User is signed out
//         // Handle signed-out state, if needed
//     }
// });
document.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // Event listener for the "Update" button click
            const updateReportButton = document.getElementById('updateReportButton');
            if (updateReportButton) {
                updateReportButton.addEventListener('click', () => {
                    const datetime = document.getElementById('datetimeView').value; // Use the correct input field for datetime
                    const updatedNode = document.getElementById('nodeView').value;
                    const updatedSound = document.getElementById('soundView').value;
                    const updatedFire = document.getElementById('fireView').value;
                    const updatedSmoke = document.getElementById('smokeView').value;

                    if (datetime) {
                        // Construct the report ID
                        const reportId = `${updatedNode}-${datetime}`;
                        const reportRef = ref(db, 'Reports/' + reportId);

                        // Update the record with new values
                        set(reportRef, {
                            NodeNumber: updatedNode,
                            SoundSensor: updatedSound,
                            FlameSensor: updatedFire,
                            SmokeSensor: updatedSmoke,
                            dateTime: datetime
                        }).then(() => {
                            alert('Report updated successfully!');
                        }).catch((error) => {
                            console.error('Error updating report:', error);
                            alert('Failed to update report. Please try again.');
                        });
                    } else {
                        alert('No datetime value provided.');
                    }
                });
            } else {
                console.error('Update button not found');
            }
        } else {
            // User is signed out
            alert('You must be signed in to update reports.');
        }
    });
});


// This will ensure the script waits for the DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // Define your refreshFilter function here
    function refreshFilter() {
        var rows = document.getElementById("tbody1").getElementsByTagName("tr");
        var headers = document.getElementsByTagName("th");

        // Show all columns
        for (var i = 0; i < headers.length; i++) {
            headers[i].style.display = "";
        }

        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].getElementsByTagName("td");

            // Show all columns
            for (var j = 0; j < cells.length; j++) {
                cells[j].style.display = "";
            }
        }

        // Call the GetAllDataRealTime function to reload the data
        GetAllDataRealTime();
    }

    // Make sure the function is globally accessible
    window.refreshFilter = refreshFilter;
});