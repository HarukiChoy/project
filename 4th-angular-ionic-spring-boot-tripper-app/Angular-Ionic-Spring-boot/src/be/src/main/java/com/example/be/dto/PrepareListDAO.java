package com.example.be.dto;
import javax.persistence.*;

@Entity(name="PrepareListDAO")
@Table(name="prepare")
public class PrepareListDAO {

  @Id
  @SequenceGenerator(
    name="prepare_seq",
    sequenceName = "prepare_seq",
    allocationSize = 1
  )
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "prepare_seq"
  )
  private Long id;

  @Column(name = "trip_id", nullable = false)
  private Integer tripId;

  @Column(name="user_id", nullable = false)
  private Integer userId;

  @Column(name = "content", nullable = false, columnDefinition = "text")
  private String content;

  @Column(name="is_done", nullable = false, columnDefinition = "boolean")
  private Boolean isDone;


  public PrepareListDAO() {}

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

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Boolean getDone() {
    return isDone;
  }

  public void setDone(Boolean done) {
    isDone = done;
  }
}
