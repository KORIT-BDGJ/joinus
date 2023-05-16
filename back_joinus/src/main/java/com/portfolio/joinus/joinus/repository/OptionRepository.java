package com.portfolio.joinus.joinus.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.entity.Gender;
import com.portfolio.joinus.joinus.entity.Level;
import com.portfolio.joinus.joinus.entity.Region;
import com.portfolio.joinus.joinus.entity.Search;
import com.portfolio.joinus.joinus.entity.State;

@Mapper
public interface OptionRepository {
	
	public List<Level> getLevels();
	public List<State> getStates();
	public List<Region> getRegions();
	public List<Gender> getGenders();
	public List<Search> getSearchs();
}
