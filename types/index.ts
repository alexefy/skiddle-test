export interface FetchedData {
  error: number;
  totalcount: string;
  pagecount: number;
  results: Event[];
  elastic: {
    timing: number;
  };
  requestId: string;
};

export interface Venue {
  id: number;
  name: string;
  address: string;
  town: string;
  postcode_lookup: string;
  postcode: string;
  country: string;
  phone: string;
  latitude: number;
  longitude: number;
  type: string;
  rating: number;
  reviewCount: number;
}

export interface OpeningTimes {
  doorsopen: string;
  doorsclose: string;
  lastentry: string;
}

export interface Rep {
  enabled: boolean;
}

export interface Event {
  id: string;
  listingid: string;
  uniquelistingidentifier: string;
  hascollapsedresults: boolean;
  countcollapsedresults: number;
  EventCode: string;
  eventname: string;
  cancelled: string;
  cancellationDate: string;
  cancellationType: string;
  cancellationReason: string;
  rescheduledDate: string;
  venue: Venue;
  imageurl: string;
  largeimageurl: string;
  xlargeimageurl: string;
  xlargeimageurlWebP: string;
  link: string;
  date: string;
  startdate: string;
  enddate: string;
  description: string;
  openingtimes: OpeningTimes;
  minage: string;
  imgoing: null | boolean; // Assuming this could also be a boolean
  goingtos: number;
  goingtocount: string;
  tickets: boolean;
  entryprice: string;
  eventvisibility: string;
  ticketUrl: string;
  rep: Rep;
  headerHex: string;
  healthAndSafety: any[]; // Replace with the actual type if you know it
}

export interface Artist {
  artistid: string;
  imageurl: string;
  name: string;
  spotifyartisturl: string;
  spotifymp3url: string;
  description: string
};

export interface Genre {
  genreid: string;
  name: string;
};

export interface Going {
  name: string;
  profileimageurl: string;
};

export interface EventDetail {
  MinAge: string;
  artists: Artist[];
  cancellationDate: string;
  cancellationReason: string;
  cancellationType: string;
  cancelled: string;
  date: string;
  dateEnd: string;
  dateStart: string;
  description: string;
  enddate: string;
  entryprice: string;
  eventVisibility: string;
  eventname: string;
  genres: Genre[];
  going: Going[];
  goingtos: number;
  groupingid: string;
  headerhex: string;
  healthAndSafety: any[];
  id: string;
  imageurl: string;
  imgoing: number;
  largeimageurl: string;
  link: string;
  listingid: string;
  openingtimes: OpeningTimes;
  paymentPlanTCs: string;
  rep: { enabled: boolean };
  rescheduledDate: string;
  seatingPlanID: string;
  startdate: string;
  ticketStatus: string;
  ticketUrl: string;
  tickets: boolean;
  venue: Venue;
};