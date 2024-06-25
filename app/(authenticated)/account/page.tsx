import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, getUserBookings, UserData, BookingData } from '@/lib/firestore';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useListState } from '@mantine/hooks';

export default function AccountPage() {
    const [user, setUser] = useState<User>();
    const [profile, setProfile] = useState<UserData>();
    const [bookings, bookingsHandler] = useListState<BookingData>();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                loadUserProfile(user.uid);
                loadUserBookings(user.uid);
            }
        });
    }, []);

    const loadUserProfile = async (userId: string) => {
        try {
            const userProfile = await getUserProfile(userId);
            setProfile(userProfile);
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    };

    const loadUserBookings = async (userId: string) => {
        try {
            const userBookings = await getUserBookings(userId);
            bookingsHandler.setState(userBookings);
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
    };

    const handleProfileUpdate = async (e: React.ChangeEvent) => {
        e.preventDefault();
        try {
            if (user && profile) {
                await updateUserProfile(user.uid, profile);
                alert('Profile updated successfully!');
            }

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    // Add JSX for displaying and editing user profile and bookings
    // ...

    return (
        <div>
            <h2>Booking History</h2>
            {bookings.map(booking => (
                <div key={booking.id}>
                    <p>Hotel: {booking.name}</p>
                    <p>Booking Date: {booking.time?.toString()}</p>
                    {/* <p>Payment ID: {booking.paymentId}</p> */}
                </div>
            ))}
        </div>
    );
};