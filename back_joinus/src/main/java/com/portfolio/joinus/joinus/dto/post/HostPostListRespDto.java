package com.portfolio.joinus.joinus.dto.post;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class HostPostListRespDto {
	private int hostPostListId;
	private int userId;
	private int postId;
	private String title;
}
