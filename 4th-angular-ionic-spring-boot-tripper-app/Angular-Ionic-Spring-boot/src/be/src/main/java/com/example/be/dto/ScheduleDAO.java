package com.example.be.dto;
import javax.persistence.*;

@Entity(name="ScheduleDAO")
@Table(name="schedule")
public class ScheduleDAO {

  @Id
  @SequenceGenerator(
    name = "schedule_seq",
    sequenceName = "schedule_seq",
    allocationSize = 1
  )
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "schedule_seq"
  )
  private Long id;

  @Column(name="trip_id", nullable = false)
  private Integer tripId;
  @Column(name="user_id", nullable = false)
  private Integer userId;
  @Column(name="date", nullable = false, columnDefinition = "char(10)")
  private String date;
  @Column(name="starting_time", nullable = false, columnDefinition = "char(3)")
  private String startingTime;
  @Column(name="location", nullable = false, columnDefinition = "varchar(100)")
  private String location;

  public ScheduleDAO() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getTripId() {
    return tripId;
  }

  public void setTripId(Integer tripId) {
    this.tripId = tripId;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getStartingTime() {
    return startingTime;
  }

  public void setStartingTime(String startingTime) {
    this.startingTime = startingTime;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }
}
