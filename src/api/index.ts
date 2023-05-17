import { API_KEY, API_URL } from "../constants";

export const searchEvents = async (keyword: string | null) => {
  const res = await fetch(`${API_URL}/events/search/?api_key=${API_KEY}&keyword=${keyword}`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json();
}

export const fetchEvent = async (id:string | string[] | undefined) => {
  const res = await fetch(`${API_URL}/events/${id}?api_key=${API_KEY}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export const fetchArtist = async (id:string | string[] | undefined) => {
  const res = await fetch(`${API_URL}/artist/${id}?api_key=${API_KEY}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};
