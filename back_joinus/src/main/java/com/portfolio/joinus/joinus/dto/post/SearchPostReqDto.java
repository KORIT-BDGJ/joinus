package com.portfolio.joinus.joinus.dto.post;

import java.util.List;

import lombok.Data;

@Data
public class SearchPostReqDto {

	private int page;
	private String searchValue;
	private List<Integer> searchIds;
}
