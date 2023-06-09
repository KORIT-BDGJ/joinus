package com.portfolio.joinus.joinus.dto.post;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostReqDto {
	
	private int postId;
	private int writerId;
	private String title;
	private int sportsId;
	private int levelId;
	private int stateId;
	private int regionId;
	private Date deadLine;
	private int recruitsCount;
	private int genderId;
	private String text;
	
	private LocalDateTime registeDate;
	
	
}
