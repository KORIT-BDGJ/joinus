package com.portfolio.joinus.joinus.dto.post;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SearchRespDto {

	private int searchId;
	private String searchName;
}
