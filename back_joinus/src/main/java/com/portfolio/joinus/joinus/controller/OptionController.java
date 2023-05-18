package com.portfolio.joinus.joinus.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.joinus.joinus.service.OptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/option")
@RequiredArgsConstructor
public class OptionController {
	
	private final OptionService optionService;
	
	
//	@GetMapping("/sports")
//	public ResponseEntity<?> getSportss() {
//		return ResponseEntity.ok(optionService.getSports());
//		
//	}
	
	@GetMapping("/levels")
	public ResponseEntity<?> getLevels() {
		return ResponseEntity.ok(optionService.getLevels());
		
	}
	
	@GetMapping("/states")
	public ResponseEntity<?> getStates() {
		return ResponseEntity.ok(optionService.getStates());
		
	}
	
	@GetMapping("/regions")
	public ResponseEntity<?> getRegions() {
		return ResponseEntity.ok(optionService.getRegions());
		
	}
	
	@GetMapping("/genders")
	public ResponseEntity<?> getGenders() {
		return ResponseEntity.ok(optionService.getGenders());
		
	}
	
	@GetMapping("/searchs")
	public ResponseEntity<?> getSearchs() {
		return ResponseEntity.ok(optionService.getSearchs());
		
	}
		
}
