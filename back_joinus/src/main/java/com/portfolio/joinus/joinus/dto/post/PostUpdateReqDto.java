package com.portfolio.joinus.joinus.dto.post;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PostUpdateReqDto {
	private String updateTitle;
	private int updateSports;
	private int updateRegion;
	private LocalDateTime updateDate;
	private int updateRecruitsCount;
	private int updateGender;
	private int updateState;
	private int updateLevel;
	private String updateText;
}
