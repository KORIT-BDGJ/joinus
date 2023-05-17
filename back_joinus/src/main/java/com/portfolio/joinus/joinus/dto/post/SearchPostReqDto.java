package com.portfolio.joinus.joinus.dto.post;

import lombok.Data;

@Data
public class SearchPostReqDto {

	private int page;
    private int regionId;
    private int searchType;
    private String searchValue;
}
