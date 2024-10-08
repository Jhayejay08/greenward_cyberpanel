import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, get, ref, child, set, onValue, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


var appId = sessionStorage.getItem('appId')
if (appId === '' || appId === null ) {
    window.location.href = "redirect.php"
    // window.location.href = 'index.html'
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
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);


let emailInp = document.getElementById('emailInp');
let passwordInp = document.getElementById('passwordInp');
let loginForm = document.getElementById('loginForm');


let SignInUser = evt => {
  //console.log("Form submitted");
  evt.preventDefault();

  const alertBox = document.getElementById('alertBox');

  signInWithEmailAndPassword(auth, emailInp.value, passwordInp.value)
    .then((credentials) => {
      get(child(dbref, 'users/' + credentials.user.uid))
        .then((snapshot) => {
          if (snapshot.exists) {
            const user = snapshot.val();
            sessionStorage.setItem('user-info', JSON.stringify({
              firstname: user.firstname,
              lastname: user.lastname,
              phone: user.phone,
              user_type: user.user_type,
            }));
            sessionStorage.setItem('user-creds', JSON.stringify(credentials.user));

            // Update last_login in the database
            set(child(dbref, 'users/' + credentials.user.uid), {
              ...user, // keep existing data
              last_login: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
            })

            // var isAuthenticated = sessionStorage.getItem('user-info')

            // if (isAuthenticated === null || isAuthenticated === '') {
            //     this.route('index')
            // }

            // if (isAuthenticated.user_type === 0) {
            //     this.route('staff')

            // } else if(isAuthenticated.user_type === 1){
            //     // this.route('admin')
            //     window.location.href='admin.html'
            // }else{
            //     this.route('index')
            // }



            // var isAuthenticated = sessionStorage.getItem('user-info');

            // if (isAuthenticated) {
            //     // Assuming 'user-info' contains a JSON string with a 'usertype' property
            //     var userInfo = JSON.parse(isAuthenticated);

            //     if (userInfo.usertype === 0) {
            //         window.location.href = 'staff.html';
            //     } else if (userInfo.usertype === 1) {
            //         window.location.href = 'admin.html';
            //     } else {
            //         // Handle other user types or scenarios as needed
            //         window.location.href = 'index.html';
            //         console.error('Invalid user type');
            //     }
            // } else {
            //     // Handle the case when the user is not authenticated
            //     console.error('User not authenticated');
            // }

            //console.log('User Type:', user.user_type);

            // Check user_type and redirect accordingly
            if (user.user_type === 0) {
              window.location.href = 'staff.html';
            } else if (user.user_type === 1){
              window.location.href = 'admin.html';
            }


          } else {
            //console.log('User data not found in the database');
            showAlert('User data not found in the database');
            emailInp.value = '';
            passwordInp.value = '';
          }
        })
        .catch((error) => {
          console.error('Error getting user data:', error);
          showAlert('Authentication error: ' + error.message);
          emailInp.value = '';
          passwordInp.value = '';
        });
    })
    .catch((error) => {
      // // alert(error.message);
      // showAlert('Authentication error: ' + error.message);
      // console.log(error.code);
      // console.log(error.message);                 
      // passwordInp.value = '';
      // Handle specific error when email is not found
      if (error.code === 'auth/user-not-found') {
        showAlert('User not found. Please register.');
        emailInp.value = '';
        passwordInp.value = '';
      } else {
        showAlert('Authentication error: Email or password does not match!');
        // showAlert('Authentication error: ' + error.message);
        //console.log(error.code);
        //console.log(error.message);
        passwordInp.value = '';
      }
    });
}


loginForm.addEventListener('submit', SignInUser);

function showAlert(message) {
  const alertBox = document.getElementById('alertBox');
  alertBox.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
`;
}

// Function to clear text fields
function clearTextFields() {
  document.getElementById('emailInp').value = '';
  document.getElementById('passwordInp').value = '';
}

// Attach the clearTextFields function to the modal's hidden.bs.modal event
document.getElementById('signInModal').addEventListener('hidden.bs.modal', function () {
  clearTextFields();
  // location.reload();
});



// function GetAllDataRealTime(){
//   const dbref = ref(db,'contactNumber');

//   onValue(dbref,(snapshot)=>{
//       var phonenumbers = [];

//   // snapshot.forEach(childSnapshot=>{
//   //     users.push(childSnapshot.val());
//   // });

//   snapshot.forEach(childSnapshot => {
//   const phonenumber = childSnapshot.val();
//   phonenumber.uid = childSnapshot.key; // Add UID to the user object
//   phonenumbers.push(phonenumber);
//   });

//   console.log(phonenumbers);

//   })
// }



// function savePhoneNumbers(phoneNumbers) {
//   // Reference to the 'emergencyContacts' node
//   const emergencyContactsRef = ref(db, 'emergencyContacts');

//   phoneNumbers.forEach(phoneNumber => {
//     // Push each phone number as a new child node under 'emergencyContacts'
//     push(emergencyContactsRef, { phone: phoneNumber })
//       .then(() => {
//         console.log("Phone number saved to emergencyContacts node:", phoneNumber);
//       })
//       .catch((error) => {
//         console.error("Error saving phone number:", error);
//       });
//   });
// }

// function savePhoneNumbers(phoneNumbers) {
//   // Reference to the 'emergencyContacts' node
//   const emergencyContactsRef = ref(db, 'emergencyContacts');

//   const phoneNumbersWithoutUid = phoneNumbers.map(phoneNumberObj => phoneNumberObj.phone);

//   // Set the phone numbers under the 'emergencyContacts' node
//   set(emergencyContactsRef, phoneNumbersWithoutUid)
//     .then(() => {
//       console.log("Phone numbers saved to emergencyContacts node:", phoneNumbersWithoutUid);
//     })
//     .catch((error) => {
//       console.error("Error saving phone numbers:", error);
//     });
// }

// function GetAllPhoneNumbersRealTime() {
//   const dbref = ref(db, 'contactNumber');

//   onValue(dbref, (snapshot) => {
//     var phoneNumbers = [];

//     snapshot.forEach(childSnapshot => {
//       const phoneNumber = childSnapshot.val().phone; // Extract phone number
//       phoneNumbers.push(phoneNumber);

//     });
    
//          // Save phone numbers to the 'emergencyContacts' node
//          savePhoneNumbers(phoneNumbers);
    
//   });
// }

// function savePhoneNumbers(phoneNumbers) {
//   // Reference to the 'emergencyContacts' node
//   const emergencyContactsRef = ref(db, 'emergencyContacts');

//   // Set the phone numbers under the 'emergencyContacts' node
//   set(emergencyContactsRef, phoneNumbers)
//     .then(() => {
//       console.log("Phone numbers saved to emergencyContacts node:", phoneNumbers);
//     })
//     .catch((error) => {
//       console.error("Error saving phone numbers:", error);
//     });
// }




// window.onload = function () {

//   // // GetAllDataOnce();
//   // GetAllDataRealTime();

//   GetAllPhoneNumbersRealTime();
// }

