package com.example.be.service;

import com.example.be.dto.PrepareListDAO;
import com.example.be.dto.PrepareListDTO;
import com.example.be.repository.PrepareListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class PrepareListService {

  public final PrepareListRepository prepareListRepository;

  @Autowired
  public PrepareListService(PrepareListRepository prepareListRepository) {
    this.prepareListRepository = prepareListRepository;
  }

  public List<PrepareListDAO> getList(Integer userId, Integer tripId) {
    return prepareListRepository.findAllByUserId(userId, tripId);
  }

  public List<PrepareListDAO> addItem(PrepareListDTO newContent, Integer userId) throws Exception {
    if (newContent.getTripId() == null){
      throw new Exception("Missing Trip Id.");
    }
    if (newContent.getContent() == null){
      throw new Exception("Missing Content.");
    }
    PrepareListDAO newItem = new PrepareListDAO();
    newItem.setUserId(userId);
    newItem.setTripId(newContent.getTripId());
    newItem.setContent(newContent.getContent());
    newItem.setDone(false);
    prepareListRepository.save(newItem);
    return prepareListRepository.findAllByUserId(userId, newContent.getTripId());
  }

  @Transactional
  public List<PrepareListDAO> updatePrepareProfile(PrepareListDAO prepare) {
    Long id = Long.valueOf(prepare.getId());
    PrepareListDAO record = prepareListRepository.findByPrepareId(id);
    if (prepare.getContent() != null){
      record.setContent(prepare.getContent());
    }
    record.setDone(true);
    return prepareListRepository.findAllByUserId(prepare.getUserId(), prepare.getTripId());
  }
}
