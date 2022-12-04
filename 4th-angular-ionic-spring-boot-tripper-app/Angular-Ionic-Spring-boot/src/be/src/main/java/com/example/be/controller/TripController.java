package com.example.be.controller;

import com.example.be.dto.AddNewTripDTO;
import com.example.be.dto.AirportDAO;
import com.example.be.dto.TripDAO;
import com.example.be.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(path = "trip")
public class TripController {
  public final TripService tripService;

  @Autowired
  public TripController(TripService tripService) {
    this.tripService = tripService;
  }

  @CrossOrigin(origins = "*")
  @PostMapping("/new")
  public HashMap<String, Long> addTrip(@RequestBody AddNewTripDTO trip) throws Exception {
    return tripService.addTrip(trip);
  }

  @CrossOrigin(origins = "*")
  @GetMapping("/list")
  public List<TripDAO> getTripList () {
    return tripService.getTripList();
  }

  @CrossOrigin(origins = "*")
  @GetMapping("/airportList")
  public List<AirportDAO> getAirportList () {
    return tripService.getAirportList();
  }

  @CrossOrigin(origins = "*")
  @GetMapping("/profile/{id}")
  public TripDAO getTripProfileById(
    @PathVariable(name="id") String id
  ) throws Exception {
    return tripService.getTripProfileById(id);
  }

  @CrossOrigin(origins = "*")
  @PutMapping("/update")
  public TripDAO updateTripProfile(@RequestBody TripDAO nTrip) {
    return tripService.updateTripProfile(nTrip);
  }
}
