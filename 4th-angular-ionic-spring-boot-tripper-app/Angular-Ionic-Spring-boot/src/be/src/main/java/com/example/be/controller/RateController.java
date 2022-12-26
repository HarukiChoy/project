package com.example.be.controller;

import com.example.be.dto.AddRateDTO;
import com.example.be.dto.RateDAO;
import com.example.be.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "rate")
@CrossOrigin(origins = "*")
public class RateController {
  public final RateService rateService;

  @Autowired
  public RateController(RateService rateService) {
    this.rateService = rateService;
  }

  @PostMapping("/list")
  public void addRate(@RequestBody AddRateDTO rate){
    rateService.addRate(rate);
  }

  @GetMapping("/list")
  public Page<RateDAO> getRateList() {
    return rateService.getRateList();
  }

  @GetMapping("/data/{eng}")
  public List<RateDAO> getRateData(
    @PathVariable(name="eng") String eng
  ){
    return rateService.getRateData(eng);
  }
}
