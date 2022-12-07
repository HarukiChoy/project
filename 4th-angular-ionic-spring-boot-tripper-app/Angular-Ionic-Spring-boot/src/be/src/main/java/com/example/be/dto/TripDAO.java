package com.example.be.dto;
import javax.persistence.*;

@Entity(name = "TripDAO")
@Table(name = "trip")
public class TripDAO {

  @Id
  @SequenceGenerator(
    name = "trip_seq",
    sequenceName = "trip_seq",
    allocationSize = 1
  )
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "trip_seq"
  )
  private Long id;

  @Column(name = "user_id")
  private Integer userId;
  @Column(name="from_date", nullable = false, columnDefinition = "char(10)")
  private String fromDate;
  @Column(name="departure_iata", nullable = false, columnDefinition = "char(3)")
  private String departureIATA;
  @Column(name="to_date", nullable = false, columnDefinition = "char(10)")
  private String toDate;
  @Column(name="arrival_iata", nullable = false, columnDefinition = "char(3)")
  private String arrivalIATA;
  @Column(name="departure_flight", nullable = false, columnDefinition = "varchar(10)")
  private String departureFlight;
  @Column(name="from_departure_time", nullable = false, columnDefinition = "char(5)")
  private String fromDepartureTime;
  @Column(name="from_arrival_time", nullable = false, columnDefinition = "char(5)")
  private String fromArrivalTime;
  @Column(name="arrival_flight", nullable = false, columnDefinition = "varchar(10)")
  private String arrivalFlight;
  @Column(name="to_departure_time", nullable = false, columnDefinition = "char(5)")
  private String toDepartureTime;
  @Column(name="to_arrival_time", nullable = false, columnDefinition = "char(5)")
  private String toArrivalTime;

  public TripDAO() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public String getFromDate() {
    return fromDate;
  }

  public void setFromDate(String fromDate) {
    this.fromDate = fromDate;
  }

  public String getDepartureIATA() {
    return departureIATA;
  }

  public void setDepartureIATA(String departureIATA) {
    this.departureIATA = departureIATA;
  }

  public String getToDate() {
    return toDate;
  }

  public void setToDate(String toDate) {
    this.toDate = toDate;
  }

  public String getArrivalIATA() {
    return arrivalIATA;
  }

  public void setArrivalIATA(String arrivalIATA) {
    this.arrivalIATA = arrivalIATA;
  }

  public String getDepartureFlight() {
    return departureFlight;
  }

  public void setDepartureFlight(String departureFlight) {
    this.departureFlight = departureFlight;
  }

  public String getFromDepartureTime() {
    return fromDepartureTime;
  }

  public void setFromDepartureTime(String fromDepartureTime) {
    this.fromDepartureTime = fromDepartureTime;
  }

  public String getFromArrivalTime() {
    return fromArrivalTime;
  }

  public void setFromArrivalTime(String fromArrivalTime) {
    this.fromArrivalTime = fromArrivalTime;
  }

  public String getArrivalFlight() {
    return arrivalFlight;
  }

  public void setArrivalFlight(String arrivalFlight) {
    this.arrivalFlight = arrivalFlight;
  }

  public String getToDepartureTime() {
    return toDepartureTime;
  }

  public void setToDepartureTime(String toDepartureTime) {
    this.toDepartureTime = toDepartureTime;
  }

  public String getToArrivalTime() {
    return toArrivalTime;
  }

  public void setToArrivalTime(String toArrivalTime) {
    this.toArrivalTime = toArrivalTime;
  }

  @Override
  public String toString() {
    return "TripDAO{" +
      "id=" + id +
      ", fromDate='" + fromDate + '\'' +
      ", departureIATA='" + departureIATA + '\'' +
      ", toDate='" + toDate + '\'' +
      ", arrivalIATA='" + arrivalIATA + '\'' +
      ", departureFlight='" + departureFlight + '\'' +
      ", fromDepartureTime='" + fromDepartureTime + '\'' +
      ", fromArrivalTime='" + fromArrivalTime + '\'' +
      ", arrivalFlight='" + arrivalFlight + '\'' +
      ", toDepartureTime='" + toDepartureTime + '\'' +
      ", toArrivalTime='" + toArrivalTime + '\'' +
      '}';
  }
}
