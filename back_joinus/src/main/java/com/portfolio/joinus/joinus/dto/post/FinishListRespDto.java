package com.portfolio.joinus.joinus.dto.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import com.portfolio.joinus.joinus.entity.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinishListRespDto {
	private Date deadline;
    private int postId;
    private String title;
    private int writerId;
}
