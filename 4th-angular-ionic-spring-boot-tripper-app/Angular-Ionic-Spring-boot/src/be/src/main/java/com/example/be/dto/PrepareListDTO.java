package com.example.be.dto;

import java.io.Serializable;

public class PrepareListDTO implements Serializable {

  private Integer tripId;
  private String content;

  public PrepareListDTO() {}

  public PrepareListDTO(Integer userId, String content) {
    this.tripId = userId;
    this.content = content;
  }

  public Integer getTripId() {
    return tripId;
  }

  public void setTripId(Integer tripId) {
    this.tripId = tripId;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
