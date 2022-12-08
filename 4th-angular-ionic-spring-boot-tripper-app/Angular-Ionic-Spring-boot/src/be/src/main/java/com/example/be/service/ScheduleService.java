package com.example.be.service;

import com.example.be.dto.ScheduleDAO;
import com.example.be.dto.ScheduleDTO;
import com.example.be.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService {

  public final ScheduleRepository scheduleRepository;

  @Autowired
  public ScheduleService(ScheduleRepository scheduleRepository) {
    this.scheduleRepository = scheduleRepository;
  }

  public ScheduleDAO addSchedule(ScheduleDTO schedule, Integer userId) throws Exception {
    if (schedule == null){
      throw new Exception("Missing value of schedule.");
    }
    ScheduleDAO newSchedule = new ScheduleDAO();
    newSchedule.setTripId(schedule.tripId);
    newSchedule.setUserId(userId);
    newSchedule.setDate(schedule.date);
    newSchedule.setStartingTime(schedule.time);
    newSchedule.setLocation(schedule.location);
    scheduleRepository.save(newSchedule);
    return newSchedule;
  }
}
