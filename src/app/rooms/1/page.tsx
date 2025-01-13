'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RoomDetailsPage({ params }: { params: { id: string } }) {
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRoom = async () => {
      const roomId = Number(params.id); // Convert the ID to a number
      const { data, error } = await supabase.from('rooms').select('*').eq('id', roomId).single();

      if (error || !data) {
        setError('Room not found.');
      } else {
        setRoom(data);
      }
    };

    fetchRoom();
  }, [params.id]);

  // Error handling
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-bold text-red-500">{error}</p>
      </div>
    );
  }

  // Loading state
  if (!room) {
    return <p className="text-center text-white">Loading room details...</p>;
  }

  // Render room details
  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Abstract animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-70 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-blue-500 to-purple-700 opacity-30 mix-blend-overlay"></div>

      <div className="relative z-10 max-w-5xl mx-auto py-10 px-4 text-white">
        <h1 className="text-4xl font-bold mb-6">{room.name}</h1>
        <Image
          src={`/images/rooms/${encodeURIComponent(room.photo_url.trim())}`}
          alt={room.name}
          width={800}
          height={500}
          className="rounded-lg mb-6"
        />
        <p className="text-lg mb-4">{room.description}</p>
        <p className="text-lg font-bold mb-2">Capacity: {room.capacity} people</p>
        <p className="text-lg font-bold mb-2">Bed Type: {room.bed_type}</p>
        <p className="text-lg font-bold mb-4 text-green-400">${room.price_per_night} / night</p>
        <button className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 transition duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
}
