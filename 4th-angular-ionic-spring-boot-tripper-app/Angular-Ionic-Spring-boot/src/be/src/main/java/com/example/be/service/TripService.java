package com.example.be.service;

import com.example.be.dto.AddNewTripDTO;
import com.example.be.dto.AirportDAO;
import com.example.be.dto.TripDAO;
import com.example.be.repository.AirportRepository;
import com.example.be.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class TripService {
  private final TripRepository tripRepository;
  private final AirportRepository airportRepository;

  @Autowired
  public TripService(TripRepository tripRepository, AirportRepository airportRepository) {
    this.tripRepository = tripRepository;
    this.airportRepository = airportRepository;
  }

  public HashMap<String, Long> addTrip(AddNewTripDTO trip) throws Exception {
    if (trip.fromDate == null) {
      throw new Exception("Missing going to date.");
    }
    if (trip.departureIATA == null) {
      throw new Exception("Missing departure airport data.");
    }
    if (trip.toDate == null) {
      throw new Exception("Missing coming back date.");
    }
    if (trip.arrivalIATA == null) {
      throw new Exception("Missing arrival airport data.");
    }
    if (trip.departureFlight == null) {
      throw new Exception("Missing going to flight name.");
    }
    if (trip.fromDepartureTime == null) {
      throw new Exception("Missing going to departure time.");
    }
    if (trip.fromArrivalTime == null) {
      throw new Exception("Missing going to arrival time.");
    }
    if (trip.arrivalFlight == null) {
      throw new Exception("Missing coming back flight name.");
    }
    if (trip.toDepartureTime == null) {
      throw new Exception("Missing coming back departure time.");
    }
    if (trip.toArrivalTime == null) {
      throw new Exception("Missing coming back arrival time.");
    }
    TripDAO newTrip = new TripDAO();
    newTrip.setFromDate(trip.fromDate);
    newTrip.setDepartureIATA(trip.departureIATA);
    newTrip.setToDate(trip.toDate);
    newTrip.setArrivalIATA(trip.arrivalIATA);
    newTrip.setDepartureFlight(trip.departureFlight);
    newTrip.setFromDepartureTime(trip.fromDepartureTime);
    newTrip.setFromArrivalTime(trip.fromArrivalTime);
    newTrip.setArrivalFlight(trip.arrivalFlight);
    newTrip.setToDepartureTime(trip.toDepartureTime);
    newTrip.setToArrivalTime(trip.toArrivalTime);

    Long id;
    try {
      id = tripRepository.save(newTrip).getId();
    } catch (Exception e) {
      throw new SQLException("Failed to add a new trip to database.");
    }

    HashMap<String, Long> result = new HashMap<>();
    result.put("id", id);
    return result;
  }

  public List<TripDAO> getTripList() {
    return tripRepository.findAll();
  }

  public TripDAO getTripProfileById(String id) throws Exception {
    Long tripId = Long.valueOf(id);
    Optional<TripDAO> findTripById = tripRepository.findById(tripId);
    if (!findTripById.isPresent()) {
      throw new Exception("Trip not found.");
    }
    return tripRepository.findTripDAOSById(tripId);
  }

  public List<AirportDAO> getAirportList() {
    return airportRepository.findAll();
  }

  @Transactional
  public TripDAO updateTripProfile(TripDAO nTrip) {
    Long id = Long.valueOf(nTrip.getId());
    TripDAO trip = tripRepository.findTripDAOSById(id);
    if (nTrip.getFromDate() != null && nTrip.getFromDate().length() > 0) {
      trip.setFromDate(nTrip.getFromDate());
    }
    if (nTrip.getDepartureIATA() != null && nTrip.getDepartureIATA().length() > 0) {
      trip.setDepartureIATA(nTrip.getDepartureIATA());
    }
    if (nTrip.getToDate() != null && nTrip.getToDate().length() > 0) {
      trip.setToDate(nTrip.getToDate());
    }
    if (nTrip.getArrivalIATA() != null && nTrip.getArrivalIATA().length() > 0) {
      trip.setArrivalIATA(nTrip.getArrivalIATA());
    }
    if (nTrip.getDepartureFlight() != null && nTrip.getDepartureFlight().length() > 0) {
      trip.setDepartureFlight(nTrip.getDepartureFlight());
    }
    if (nTrip.getFromDepartureTime() != null && nTrip.getFromDepartureTime().length() > 0) {
      trip.setFromDepartureTime(nTrip.getFromDepartureTime());
    }
    if (nTrip.getFromArrivalTime() != null && nTrip.getFromArrivalTime().length() > 0) {
      trip.setFromArrivalTime(nTrip.getFromArrivalTime());
    }
    if (nTrip.getArrivalFlight() != null && nTrip.getArrivalFlight().length() > 0) {
      trip.setArrivalFlight(nTrip.getArrivalFlight());
    }
    if (nTrip.getToDepartureTime() != null && nTrip.getToDepartureTime().length() > 0) {
      trip.setToDepartureTime(nTrip.getToDepartureTime());
    }
    if (nTrip.getToArrivalTime() != null && nTrip.getToArrivalTime().length() > 0) {
      trip.setToArrivalTime(nTrip.getToArrivalTime());
    }
    return trip;
  }
}
