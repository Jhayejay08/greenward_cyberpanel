
           

            // Import the functions you need from the SDKs you need
            import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
            import { getDatabase, set, ref, get, child, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
            import { getAuth, createUserWithEmailAndPassword, deleteUser, signOut, reauthenticateWithCredential, EmailAuthProvider, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
            // TODO: Add SDKs for Firebase products that you want to use
            // https://firebase.google.com/docs/web/setup#available-libraries
          
      
            // var appId = sessionStorage.getItem('appId')
            // if (appId === '' || appId === null ) {
            //     window.location.href = "redirect.php"
            //     // window.location.href = 'index.html'
            //   }
              
            
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
            const fireAlertAudio = document.getElementById('fireAlertAudio');
            

            window.displayFirebaseDataSound = function() {
                // Function to read data from Firebase and display it in the h3 tag
                // function displayFirebaseDataSound() {
                    const soundAlertModal = new bootstrap.Modal(document.getElementById('soundAlert'));
                    const h3Element = document.getElementById('soundData');
                    const soundAlertCard = document.getElementById('soundalertCard');
                    const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();

                    //console.log('Selected Node sound:', selectedNodeVal);

                    const soundPath = `Nodes/${selectedNodeVal}/SoundSensor`;
                    //console.log('Firebase Path sound:', soundPath);
                // Assuming 'your_data_path' is the path to the data in your Firebase
                // const Sound = ref(db, 'Nodes/Node1/SoundSensor');
                const Sound = ref(db, soundPath);
                
                
                onValue(Sound, (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    
                    h3Element.innerText = data + " " + "dB"; // Update the content of the h3 tag

                    if(data < 64){
                        soundAlertModal.hide();
                        soundAlertCard.style.backgroundColor = '';

                        fireAlertAudio.pause();
                        fireAlertAudio.currentTime = 0;

                        // document.body.style.backgroundColor = 'yellow';
                    }else if( data >= 64 && data < 85 ){
                        soundAlertModal.show();
                        // document.body.style.backgroundColor = 'yellow';
                        soundAlertCard.style.backgroundColor = 'orange';

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
                        soundAlertModal.hide();
                        // document.body.style.backgroundColor = '';
                        soundAlertCard.style.backgroundColor = 'red';

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
                    h3Element.innerText = 'No data available';
                    document.body.style.backgroundColor = '';
                }
                }, (error) => {
                    console.error('Error getting data from Firebase:', error);
                });

                }

                

                // function displayFirebaseDataFlame() {
                window.displayFirebaseDataFlame = function() {
                    const fireAlertModal = new bootstrap.Modal(document.getElementById('fireAlert'));
                    // const fireAlertModal = new bootstrap.Modal(document.getElementById('fireAlert'));
                    const h3Element = document.getElementById('flameData');
                    const fireAlertCard = document.getElementById('firealertCard');
                    const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();

                    //console.log('Selected Node fire:', selectedNodeVal);

                    const firePath = `Nodes/${selectedNodeVal}/FlameSensor`;
                    
                    //console.log('Firebase Path sound:', firePath);

                // Assuming 'your_data_path' is the path to the data in your Firebase
                const Flame = ref(db, firePath);

                onValue(Flame, (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    if (data === 0) {
                    h3Element.innerText = 'No fire detected';
                    // document.body.style.backgroundColor = '';
                    fireAlertCard.style.backgroundColor = '';
                    // fireAlertModal.hide();
                    fireAlertModal.hide();
                    fireAlertAudio.pause();
                    fireAlertAudio.currentTime = 0;

                    } else if (data === 1) {
                        h3Element.innerText = 'Fire detected! Take immediate action.';
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
                        fireAlertCard.style.backgroundColor = 'red';
                        // document.body.style.backgroundColor = 'red';
                    } else {
                        h3Element.innerText = 'Invalid data received';
                        fireAlertCard.style.backgroundColor = '';
                    }

                } else {
                    h3Element.innerText = 'No data available';
                    fireAlertCard.style.backgroundColor = '';
                }
                }, (error) => {
                    console.error('Error getting data from Firebase:', error);
                });

                }


                window.displayFirebaseDataSmoke = function() {
                // function displayFirebaseDataSmoke() {
                    const h3Element = document.getElementById('smokeData');
                    const smokeAlertCard = document.getElementById('smokealertCard');
                    const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();
                    const smokePath = `Nodes/${selectedNodeVal}/SmokeSensor`;
                    const smokeAlertModal = new bootstrap.Modal(document.getElementById('smokeAlert'));


                    //console.log('Selected Node smoke:', selectedNodeVal);
                    //console.log('Firebase Path sound:', smokePath);

                // Assuming 'your_data_path' is the path to the data in your Firebase
                const Smoke = ref(db, smokePath);

                onValue(Smoke, (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    h3Element.innerText = data + " " + "%"; // Update the content of the h3 tag
                    if(data < 39){
                        smokeAlertModal.hide();
                        smokeAlertCard.style.backgroundColor = '';

                        fireAlertAudio.pause();
                        fireAlertAudio.currentTime = 0;

                    }else if(data >= 39 && data < 50){
                        smokeAlertModal.show();
                        smokeAlertCard.style.backgroundColor = 'orange';

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
                        smokeAlertModal.show();
                        smokeAlertCard.style.backgroundColor = 'red';

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
                    h3Element.innerText = 'No data available';
                }
                }, (error) => {
                    console.error('Error getting data from Firebase:', error);
                });

                }


                window.displayFirebaseDataGPS = function() {
                // function displayFirebaseDataGPS() {
                    // const h3Element = document.getElementById('GPS');
                    const mapLinkElement = document.getElementById('mapLink');
                    const selectedNodeVal = document.getElementById('selectedNode').innerText.trim();
                    const mapPath = `Nodes/${selectedNodeVal}/location`;

                    //console.log('Selected Node gps:', selectedNodeVal);
                    //console.log('Firebase Path sound:', mapPath);

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

                
            window.onload = function () {
                GetAllPhoneNumbersRealTime();
               
                // // Call the function to display data on page load
                // displayFirebaseDataSound();
                // displayFirebaseDataFlame();
                // displayFirebaseDataSmoke();
                // displayFirebaseDataGPS();

            window.changeNodeText = function(nodeText) {
            document.getElementById('selectedNode').innerText = nodeText; 
            // Delay the execution of displayFirebaseData functions
      
                displayFirebaseDataSound();
                displayFirebaseDataFlame();
                displayFirebaseDataSmoke();
                displayFirebaseDataGPS();


  
            }
                
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
                //console.log(error.message);
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
                        //console.log(emailProfile);
                        // Handle the case where email is missing or invalid
                    }
                    });


                    
document.addEventListener('DOMContentLoaded', function() {
    // Function to dynamically populate the dropdown menu with options based on Firebase data
    function populateDropdown() {
        const dropdownMenu = document.getElementById('dropdownMenu');

        // Clear existing options
        dropdownMenu.innerHTML = '';

        // Get the data of parent "Nodes" from Firebase
        const nodesRef = ref(db, 'Nodes');
        get(nodesRef).then(snapshot => {
            if (snapshot.exists()) {
                // Loop through each child node
                snapshot.forEach(childSnapshot => {
                    const nodeName = childSnapshot.key;

                    // Create a new dropdown item
                    const dropdownItem = document.createElement('li');
                    dropdownItem.innerHTML = `<a class="dropdown-item" href="javascript:;" onclick="changeNodeText('${nodeName}')">${nodeName}</a>`;

                    // Append the dropdown item to the dropdown menu
                    dropdownMenu.appendChild(dropdownItem);
                });
            } else {
                // If no nodes exist, display a message or handle accordingly
                const dropdownItem = document.createElement('li');
                dropdownItem.innerText = 'No nodes found';
                dropdownMenu.appendChild(dropdownItem);
            }
        }).catch(error => {
            console.error("Error fetching nodes:", error);
            // Handle error accordingly
        });
    }

    // Call the populateDropdown function to initially populate the dropdown
    populateDropdown();
});

// Function to handle changing the selected node
function changeNodeText(nodeName) {
    document.getElementById('selectedNode').innerText = nodeName;
    // Add any other functionality you want to perform when a node is selected
}
    