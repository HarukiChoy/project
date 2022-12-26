package com.example.be.controller;

import com.example.be.dto.AddNewTripDTO;
import com.example.be.dto.AirportDAO;
import com.example.be.dto.TripDAO;
import com.example.be.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(path = "trip")
@CrossOrigin(origins = "*")
public class TripController {
  public final TripService tripService;

  @Autowired
  public TripController(TripService tripService) {
    this.tripService = tripService;
  }

  @PostMapping("/new")
  public HashMap<String, Long> addTrip(@RequestBody AddNewTripDTO trip, HttpServletRequest req) throws Exception {
    HashMap<String, Integer> map = Auth.checkJwtValid(req);
    Integer userId = map.get("userId");
    return tripService.addTrip(trip, userId);
  }

  @GetMapping("/list")
  public List<TripDAO> getTripList (HttpServletRequest req) throws Exception {
    HashMap<String, Integer> map = Auth.checkJwtValid(req);
    Integer userId = map.get("userId");
    return tripService.getTripList(userId);
  }

  @GetMapping("/airportList")
  public List<AirportDAO> getAirportList () {
    return tripService.getAirportList();
  }

  @GetMapping("/profile/{id}")
  public TripDAO getTripProfileById(
    @PathVariable(name="id") String id,
    HttpServletRequest req
  ) throws Exception {
    HashMap<String, Integer> map = Auth.checkJwtValid(req);
    Integer userId = map.get("userId");
    return tripService.getTripProfileById(id, userId);
  }

  @PutMapping("/update")
  public TripDAO updateTripProfile(@RequestBody TripDAO nTrip, HttpServletRequest req) throws Exception {
    HashMap<String, Integer> map = Auth.checkJwtValid(req);
    Integer userId = map.get("userId");
    return tripService.updateTripProfile(nTrip, userId);
  }

}
