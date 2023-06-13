package com.portfolio.joinus.joinus.dto.post;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SearchPostRespDto {
	
	private int postId;
	private String writerNickName;
	private String writerImage;
	private String title;
	private int sportsId;
	private String sportsName;
	private String regionName;
	private String genderName;
	private LocalDateTime deadLine;
	private int recruitsCount;
	private LocalDateTime registeDate;

}
