import { db } from './firebase'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

const eventsCollection = collection(db, 'events')

export const fetchEvents = async () => {
  const snapshot = await getDocs(eventsCollection)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const addEvent = async (event) => {
  await addDoc(eventsCollection, event)
}

export const deleteEvent = async (id) => {
  const eventDoc = doc(db, 'events', id);
  await deleteDoc(eventDoc);
};

export const updateEvent = async (id, updatedEvent) => {
  const eventDoc = doc(db, 'events', id);
  await updateDoc(eventDoc, updatedEvent);
};
