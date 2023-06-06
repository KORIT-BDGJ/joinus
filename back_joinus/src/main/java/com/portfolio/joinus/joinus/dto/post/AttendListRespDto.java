package com.portfolio.joinus.joinus.dto.post;



import java.util.Date;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AttendListRespDto {
    private int postId;
    private int writerId;
    private int userId;
    private String image;
    private String nickName;
    private String stateName;
    private String levelName;
    private String title;
    // 06-06 이강용 추
    private Date deadline;
}

