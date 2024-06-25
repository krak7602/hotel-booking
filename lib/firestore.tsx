// firestore.js
import { database } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { collection, doc, updateDoc, getDoc,getDocs, query, where, orderBy, Firestore } from 'firebase/firestore';

export interface SearchFilter {
    price?: number,
    capacity?: number,
    rating?: number,
}

export interface HotelData {
    id: string,
    name?: string,
    price?: number,
    capacity?: number,
    rating?: number,
}

export interface UserData {
    id?: string, 
    name?: string,
    
}

export interface BookingData {
    id: string,
    name?: string,
    time?: Date,
}

export const getHotels = async (filters: SearchFilter) => {
    try {
        const hotelsRef = collection(database, 'hotels');
        let q = query(hotelsRef);
        if (filters) {
            if (filters.price) {
                // console.log("Price:", filters)
                q = query(q, where('price', '<=', Number(filters.price)));
            }
            if (filters.capacity) {
                q = query(q, where('capacity', '>=', Number(filters.capacity)));
            }
            if (filters.rating) {
                q = query(q, where('rating', '>=', Number(filters.rating)));
            }
        }

        q = query(q, orderBy('name'));
        // console.log("Query", q)

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting hotels:', error);
        throw error;
    }
};

export const updateUserProfile = async (userId:string, profileData: UserData) => {
  const userRef = doc(database, 'users', userId);
  await updateDoc(userRef, {"id": profileData.id, "name": profileData.name});
};

export const getUserProfile = async (userId: string) => {
  const userRef = doc(database, 'users', userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // Handle the case where the user does not exist
    throw new Error('User does not exist');
  }
};

export const getUserBookings = async (userId: string) => {
  const bookingsRef = collection(database, 'bookings');
  const q = query(bookingsRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};