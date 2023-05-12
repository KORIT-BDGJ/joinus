package com.portfolio.joinus.joinus.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Sports {
	private int SportsId;
	private String SportsName;
}
