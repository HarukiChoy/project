package com.example.be.controller;

import com.example.be.dto.ScheduleDAO;
import com.example.be.dto.ScheduleDTO;
import com.example.be.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping(path="schedule")
@CrossOrigin(origins="*")
public class ScheduleController {

  private final ScheduleService scheduleService;

  @Autowired
  public ScheduleController(ScheduleService scheduleService) {
    this.scheduleService = scheduleService;
  }

  @PostMapping("/item")
  public ScheduleDAO addSchedule(
    @RequestBody ScheduleDTO schedule,
    HttpServletRequest req) throws Exception {
    HashMap<String, Integer> map = Auth.checkJwtValid(req);
    Integer userId = map.get("userId");
    return scheduleService.addSchedule(schedule, userId);
  }
}
