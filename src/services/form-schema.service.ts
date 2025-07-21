// import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//   apiKey: 'YOUR_KEY',
//   authDomain: 'YOUR_PROJECT.firebaseapp.com',
//   projectId: 'YOUR_PROJECT_ID',
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

export async function getFormSchema(formName: string) {
//   const ref = doc(db, 'forms', formName);
//   const snap = await getDoc(ref);
//   if (snap.exists()) return snap.data().schema;
//   throw new Error('Schema not found');
console.log(`Fetching schema for form: ${formName}`);
}

export async function saveFormSchema(formName: string, schema: any) {
//   const ref = doc(db, 'forms', formName);
//   await setDoc(ref, {
//     schema,
//     updatedAt: new Date(),
//     createdBy: 'admin@example.com',
//   });
console.log(`Saving schema for form: ${formName}`, schema);
}