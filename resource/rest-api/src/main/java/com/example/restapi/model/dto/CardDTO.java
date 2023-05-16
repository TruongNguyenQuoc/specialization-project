package com.example.restapi.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CardDTO {

    private long id;
    private String title;
    private String cover;
    private boolean destroy;

    private BoardDTO board;
    private long boardId;

    private ColumnsDTO column;
    private long columnId;

}
