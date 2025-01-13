'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RoomDetailsPage({ params }: { params: { id: string } }) {
  const [room, setRoom] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRoom = async () => {
      const { data, error } = await supabase.from('rooms').select('*').eq('id', params.id).single();
      if (error) {
        router.push('/rooms');
      } else {
        setRoom(data);
      }
    };

    fetchRoom();
  }, [params.id, router]);

  if (!room) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">{room.name}</h1>
        <Image
          src={`/images/rooms/${room.photo_url}`}
          alt={room.name}
          width={800}
          height={500}
          className="rounded-lg shadow-md"
        />
        <p className="text-gray-700 mt-4">{room.description}</p>
        <p className="text-lg font-bold mt-4">Capacity: {room.capacity} people</p>
        <p className="text-lg font-bold mt-4">Bed Type: {room.bed_type}</p>
        <p className="text-lg font-bold mt-4 text-green-600">${room.price_per_night} / night</p>
        <button
          className="mt-6 bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
