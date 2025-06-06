import { db } from './firebase'
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore'

const sosRef = collection(db, 'sosRequests')

export const fetchSOSRequests = async () => {
  const q = query(sosRef, orderBy('time', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export const addSOSRequest = async (sosData) => {
  const newSos = {
    ...sosData,
    time: serverTimestamp(),
    status: 'active'
  }
  await addDoc(sosRef, newSos)
}
