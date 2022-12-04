package com.example.be.dto;
import javax.persistence.*;
import java.security.InvalidParameterException;
import java.time.LocalDate;
import java.util.Date;

@Entity(name="UserDAO")
@Table(name = "users", uniqueConstraints = {
  @UniqueConstraint(name="users_unique_email", columnNames = "email")
}
)
public class UserDAO {
  @Id
  @SequenceGenerator(
    name = "users_seq",
    sequenceName = "users_seq",
    allocationSize = 1
  )
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "users_seq"
  )
//  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name="id", nullable = false)
  private Long id;
  @Column(name="email", nullable = false, columnDefinition = "varchar(100)")
  private String email;
  @Column(name="username", nullable = false, columnDefinition = "varchar(100)")
  private String username;
  @Column(name="password", nullable = false, columnDefinition = "varchar(200)")
  private String password;
  @Column(name="mobile", nullable = false, columnDefinition = "varchar(100)")
  private String mobile;

  @Column(name="created_at", nullable = false, columnDefinition = "timestamp")
  private Date createTimestamp;

  public UserDAO() {}

  public UserDAO(String email, String username, String password, String mobile, Date createTimestamp) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.mobile = mobile;
    this.createTimestamp = createTimestamp;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
//    if(username == null) throw  new InvalidParameterException("");
//    if(username.length() < 3) throw new InvalidParameterException("");
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getMobile() {
    return mobile;
  }

  public void setMobile(String mobile) {
    this.mobile = mobile;
  }

  public Date getCreateTimestamp() {
    return createTimestamp;
  }

  public void setCreateTimestamp(Date createTimestamp) {
    this.createTimestamp = createTimestamp;
  }

  @Override
  public String toString() {
    return "UserDAO{" +
      "id=" + id +
      ", email='" + email + '\'' +
      ", username='" + username + '\'' +
      ", password='" + password + '\'' +
      ", mobile='" + mobile + '\'' +
      ", createTimestamp=" + createTimestamp +
      '}';
  }
}
