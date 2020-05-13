console.log('init-firebase..');


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKM2dLbDeYzAkpWOMxqLcic3alzb668qw",
  authDomain: "jark-8543b.firebaseapp.com",
  databaseURL: "https://jark-8543b.firebaseio.com",
  projectId: "jark-8543b",
  storageBucket: "jark-8543b.appspot.com",
  messagingSenderId: "1019241416430",
  appId: "1:1019241416430:web:565f549e68f96c278c95ff"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true; 
    },
    uiShown: () => {
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};


// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

