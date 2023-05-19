package com.portfolio.joinus.joinus.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class PwChangeReqDto {
    private String newPassword;
}
