import admin from 'firebase-admin'
import serviceAccount from '../config/storage';


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://netflix-6fba9.firebaseio.com"
});

const db = admin.database();
const dbRef = db.ref('movies');

export default dbRef;