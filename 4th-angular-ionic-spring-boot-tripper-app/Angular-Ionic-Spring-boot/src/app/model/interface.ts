export interface Trip {
  fromDate: string;
  departureIATA: string;
  toDate: string;
  arrivalIATA: string;
  departureFlight: string;
  fromDepartureTime: string;
  fromArrivalTime: string;
  arrivalFlight: string;
  toDepartureTime: string;
  toArrivalTime: string;
}

export interface TripWithId {
  id: number;
  fromDate: string;
  departureIATA: string;
  toDate: string;
  arrivalIATA: string;
  departureFlight: string;
  fromDepartureTime: string;
  fromArrivalTime: string;
  arrivalFlight: string;
  toDepartureTime: string;
  toArrivalTime: string;
}

export interface PrepareList {
  id: number;
  content: string;
  isDone: boolean;
}

export interface Airport {
  id: number;
  name: string;
  iata_code: string;
}
