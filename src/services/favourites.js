import { doc, onSnapshot, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '../firebase.js'

export function subscribeToFavourites(uid, onData, onError) {
  return onSnapshot(
    doc(db, 'favourites', uid),
    (snap) => {
      onData(snap.exists() ? snap.data().items || [] : [])
    },
    onError,
  )
}

export function toggleFavouriteItem(uid, itemId, isFav) {
  return setDoc(
    doc(db, 'favourites', uid),
    { items: isFav ? arrayRemove(itemId) : arrayUnion(itemId) },
    { merge: true },
  )
}
