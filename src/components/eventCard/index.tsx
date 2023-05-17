import React from 'react';
import Link from 'next/link';
import { Event } from 'types';
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";

interface EventCardProps {
  event: Event;
  keyword: string | null;
}

const EventCard = ({ event, keyword }: EventCardProps) => {
  const eventDate = new Date(event.date);
  const formattedEventDate = `${eventDate.getDate()}${["st", "nd", "rd"][((eventDate.getDate()+90)%100-10)%10-1]||"th"} ${eventDate.toLocaleString('default', { month: 'long' })}`;

  return (
    <article key={event.id} className="bg-white flex flex-col">
      <Link href={`/event/${event.id}?keyword=${keyword}`}>
        <img src={event.xlargeimageurl} alt={event.eventname} className="w-full" />
      </Link>
      <section className="p-4 flex flex-col flex-grow">
        <Link href={`/event/${event.id}?keyword=${keyword}`}>
          <h2 className="text-center text-xl font-bold">{event.eventname}</h2>
        </Link>
        <p className="mt-4 text-gray-400 text-sm">{event.description.length > 40 ? event.description.substring(0, 40) + "..." : event.description}</p>
        <ul className="mt-4 pb-4 text-gray-400">
          <li className="py-1 flex items-center"><FaRegCalendarAlt className="mr-2 fill-gray-600" />{event.venue.name}</li>
          <li className="py-1 flex items-center fill-gray-600"><FaMapMarkerAlt className="mr-2" />{formattedEventDate}</li>
        </ul>

        <Link className="bg-brand p-2 text-center w-full rounded text-white block mt-auto" href={`/event/${event.id}?keyword=${keyword}`}>
          view details
        </Link>
      </section>
    </article>
  );
}

export default EventCard;