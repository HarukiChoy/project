package com.example.be.service;

import com.example.be.dto.PrepareListDAO;
import com.example.be.dto.PrepareListDTO;
import com.example.be.repository.PrepareListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrepareListService {

  public final PrepareListRepository prepareListRepository;

  @Autowired
  public PrepareListService(PrepareListRepository prepareListRepository) {
    this.prepareListRepository = prepareListRepository;
  }

  public List<PrepareListDAO> getList(Integer userId) {
    return prepareListRepository.findAllByUserId(userId);
  }

  public void addItem(PrepareListDTO newContent, Integer userId) throws Exception {
    if (newContent.getTripId() == null){
      throw new Exception("Missing Trip Id.");
    }
    if (newContent.getContent() == null){
      throw new Exception("Missing Content.");
    }
    PrepareListDAO newItem = new PrepareListDAO();
    newItem.setTripId(newContent.getTripId());
    newItem.setUserId(userId);
    newItem.setContent(newContent.getContent());
    newItem.setDone(false);
  }
}
