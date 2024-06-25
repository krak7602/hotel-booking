"use client"
import React, { useState, useEffect } from 'react';
import { getHotels } from '@/lib/firestore';
import { useListState } from '@mantine/hooks';
import { SearchFilter, HotelData } from '@/lib/firestore';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"


export default function HotelList() {
    const [hotels, hotelsHandler] = useListState<HotelData>([]);
    const [filters, setFilters] = useState<SearchFilter>({});

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const initiateBooking = (hotel: HotelData) => {
        console.log('Booking initiated for:', hotel);
    };


    useEffect(() => {
        const fetchHotels = async () => {
            const hotelData = await getHotels(filters);
            hotelsHandler.setState(hotelData);
        };

        fetchHotels();
    }, [filters]);

    return (
        <div className='container mx-auto my-6 px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-row gap-3'>
                <Card className=' flex-none h-full'>
                    <CardHeader>
                        <CardTitle>Filter</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className='flex flex-col gap-4'>
                                <div className=' flex flex-col'>
                                    <div className=' text-sm pb-1'>Price: 0 - {filters.price? filters.price : 200000}</div>
                                    <Slider defaultValue={[200000]} max={200000} step={5000} name='price' onChange={handleFilterChange} />
                                </div>
                                <div className=' flex flex-col'>
                                    <div className=' text-sm pb-1'>Min Capacity: {filters.capacity? filters.capacity : 2000}</div>
                                    <Slider defaultValue={[2000]} max={2000} step={100} name='capacity' onChange={handleFilterChange} />
                                </div>
                                <div className=' flex flex-col'>
                                    <div className=' text-sm pb-1'>Rating: {filters.rating? filters.rating : 0}</div>
                                    <Slider defaultValue={[0]} max={5} step={0.01} name='rating' onChange={handleFilterChange} />
                                </div>
                                {/* <Input type="number" name="price" placeholder="Max Price" onChange={handleFilterChange} /> */}
                                {/* <Input type="number" name="capacity" placeholder="Min Capacity" onChange={handleFilterChange} /> */}
                                {/* <Input type="number" name="rating" placeholder="Min Rating" onChange={handleFilterChange} /> */}
                            </div>
                        </form>
                    </CardContent>
                    {/* <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter> */}
                </Card>
                <div className='flex flex-wrap gap-4'>
                    {hotels.map(hotel => (
                        <div key={hotel.id} className='bg-yellow-400 rounded-xl p-3 grow'>
                            <h3>{hotel.name}</h3>
                            <p>Price: {hotel.price}</p>
                            <p>Capacity: {hotel.capacity}</p>
                            <p>Rating: {hotel.rating}</p>
                            <button onClick={() => initiateBooking(hotel)}>Book Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
