package com.example.be.dto;


import javax.persistence.*;

@Entity(name = "AirportDAO")
@Table(name = "airport")
public class AirportDAO {
  @Id
  @SequenceGenerator(
    name = "airport_seq",
    sequenceName = "airport_seq",
    allocationSize = 1
  )
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "airport_seq"
  )
  @Column(name="id", nullable = false)
  private Long id;

  @Column(name="name", nullable = false, columnDefinition = "varchar(100)")
  private String name;

  @Column(name="IATA_code", nullable = false, columnDefinition = "char(3)")
  private String IATA_code;

  public AirportDAO() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getIATA_code() {
    return IATA_code;
  }

  public void setIATA_code(String IATA_code) {
    this.IATA_code = IATA_code;
  }

  @Override
  public String toString() {
    return "AirportDAO{" +
      "id=" + id +
      ", name='" + name + '\'' +
      ", IATA_code='" + IATA_code + '\'' +
      '}';
  }
}
