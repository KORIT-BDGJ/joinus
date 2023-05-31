package com.portfolio.joinus.joinus.dto.post;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class FinishListRespDto {
	private int postId;
    private String title;
    private int userId;
}
