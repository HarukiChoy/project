package com.example.be.controller;


import com.example.be.dto.PrepareListDAO;
import com.example.be.dto.PrepareListDTO;
import com.example.be.service.PrepareListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(path = "prepare")
public class PrepareListController {
  private final PrepareListService prepareListService;

  @Autowired
  public PrepareListController(PrepareListService prepareListService) {
    this.prepareListService = prepareListService;
  }

  @CrossOrigin(origins = "*")
  @GetMapping("/list/{tripId}")
  public List<PrepareListDAO> getList(
    HttpServletRequest req, @PathVariable(name = "tripId") Integer tripId) throws Exception {
    HashMap<String, Integer> map = Auth.checkJwtValid(req);
    Integer userId = map.get("userId");
    return prepareListService.getList(userId, tripId);
  }

  @CrossOrigin(origins = "*")
  @PostMapping("/item")
  public List<PrepareListDAO> addItem(HttpServletRequest req,
                                      @RequestBody PrepareListDTO newContent
  ) throws Exception {
    HashMap<String, Integer> map = Auth.checkJwtValid(req);
    Integer userId = map.get("userId");
    return prepareListService.addItem(newContent, userId);
  }

  @CrossOrigin(origins = "*")
  @PutMapping("/update")
  public List<PrepareListDAO> updatePrepareProfile(HttpServletRequest req,
                                                   @RequestBody PrepareListDAO prepare
  ) throws Exception {
    Auth.checkJwtValid(req);
    return prepareListService.updatePrepareProfile(prepare);
  }
}
