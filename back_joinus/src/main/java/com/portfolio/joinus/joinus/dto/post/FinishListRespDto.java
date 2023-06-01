
package com.portfolio.joinus.joinus.dto.post;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class FinishListRespDto {
    private int postId;
    private String title;
    private int userId;
    private List<String> userIdList; 
}
