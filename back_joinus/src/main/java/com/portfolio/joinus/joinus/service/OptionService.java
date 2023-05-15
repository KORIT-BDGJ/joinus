package com.portfolio.joinus.joinus.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.portfolio.joinus.joinus.entity.Gender;
import com.portfolio.joinus.joinus.entity.Level;
import com.portfolio.joinus.joinus.entity.Region;
import com.portfolio.joinus.joinus.entity.State;
import com.portfolio.joinus.joinus.repository.OptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OptionService {
	
	private final OptionRepository optionRepository;
	
	public List<Level> getLevels() {
		return optionRepository.getLevels();
	}
	
	public List<State> getStates() {
		return optionRepository.getStates();
	}
	
	public List<Region> getRegions() {
		return optionRepository.getRegions();
	}
	
	public List<Gender> getGenders() {
		return optionRepository.getGenders();
	}
	
}
