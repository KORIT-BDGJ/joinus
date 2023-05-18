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
	private String title;
	private String sportsName;
	private String regionName;
	private String genderName;
	private Date deadLine;
	private int recruitsCount;
	private LocalDateTime registeDate;

}
