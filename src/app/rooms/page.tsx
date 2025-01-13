'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  // Fetch rooms data from Supabase
  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase.from('rooms').select('*');
      if (error) {
        setError(error.message);
      } else {
        setRooms(data);
      }
    };

    fetchRooms();
  }, []);

  // Error handling
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  // Loading state
  if (!rooms.length) {
    return <p className="text-center">Loading rooms...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-8">Our Rooms</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white shadow-lg rounded-lg p-6">
              {/* Fixed the image src issue by trimming and encoding the URL */}
              <Image
                src={`/images/rooms/${encodeURIComponent(room.photo_url.trim())}`}
                alt={room.name}
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold">{room.name}</h2>
              <p className="text-gray-600 mt-2">{room.description}</p>
              <p className="text-lg font-bold mt-4">${room.price_per_night} / night</p>
              <Link
                href={`/rooms/${room.id}`}
                className="mt-4 block text-center bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
