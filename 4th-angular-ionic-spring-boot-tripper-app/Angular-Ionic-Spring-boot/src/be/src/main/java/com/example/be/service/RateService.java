package com.example.be.service;
import com.example.be.dto.AddRateDTO;
import com.example.be.dto.RateDAO;
import com.example.be.repository.RateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class RateService {

  private final RateRepository rateRepository;

  @Autowired
  public RateService(RateRepository rateRepository) {
    this.rateRepository = rateRepository;
  }

  public void addRate(AddRateDTO rate) {
    RateDAO newRate = new RateDAO();
    newRate.setChi(rate.chi);
    newRate.setEng(rate.eng);
    newRate.setBuy(rate.buy);
    newRate.setSell(rate.sell);

    Date scrappedTimestamp = new Date();
    newRate.setScrappedTimestamp(scrappedTimestamp);

    rateRepository.save(newRate);
  }

  public Page<RateDAO> getRateList() {
    Page<RateDAO> page = rateRepository.findAll(
      PageRequest.of(0, 13, Sort.by(Sort.Direction.DESC, "id"))
    );
    return page;
  }


    public List<RateDAO> getRateData(String eng) {
      System.out.println(eng);
      List<RateDAO> getData = rateRepository.findAllByEng(eng);
      System.out.println(getData);
      return getData;
    }
}
