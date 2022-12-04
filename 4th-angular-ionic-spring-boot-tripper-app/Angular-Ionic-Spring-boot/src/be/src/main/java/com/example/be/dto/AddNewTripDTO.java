package com.example.be.dto;

import java.io.Serializable;

public class AddNewTripDTO implements Serializable {

  public String fromDate;
  public String departureIATA;
  public String toDate;
  public String arrivalIATA;
  public String departureFlight;
  public String fromDepartureTime;
  public String fromArrivalTime;
  public String arrivalFlight;
  public String toDepartureTime;
  public String toArrivalTime;
}
