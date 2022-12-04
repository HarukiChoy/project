package com.example.be.dto;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Entity(name="RateDAO")
@Table(name = "rate")
public class RateDAO {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;
  @Column(name="chi", nullable = false, columnDefinition = "varchar(20)")
  private String chi;
  @Column(name="eng", nullable = false, columnDefinition = "varchar(10)")
  private String eng;
  @Column(name="buy", nullable = false, columnDefinition = "varchar(10)")
  private String buy;
  @Column(name="sell", nullable = false, columnDefinition = "varchar(10)")
  private String sell;

  @Column(name="scrapped_at", nullable = false, columnDefinition = "timestamp")
  private Date scrappedTimestamp;


  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getChi() {
    return chi;
  }

  public void setChi(String chi) {
    this.chi = chi;
  }

  public String getEng() {
    return eng;
  }

  public void setEng(String eng) {
    this.eng = eng;
  }

  public String getBuy() {
    return buy;
  }

  public void setBuy(String buy) {
    this.buy = buy;
  }

  public String getSell() {
    return sell;
  }

  public void setSell(String sell) {
    this.sell = sell;
  }

  public Date getScrappedTimestamp() {
    return scrappedTimestamp;
  }

  public void setScrappedTimestamp(Date scrappedTimestamp) {
    this.scrappedTimestamp = scrappedTimestamp;
  }

  @Override
  public String toString() {
    return "RateDAO{" +
      "id=" + id +
      ", chi='" + chi + '\'' +
      ", eng='" + eng + '\'' +
      ", buy='" + buy + '\'' +
      ", sell='" + sell + '\'' +
      ", scrappedTimestamp=" + scrappedTimestamp +
      '}';
  }
}
