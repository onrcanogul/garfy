package com.petstagram.socialmedia.configuration.mapper.mapping;

import com.petstagram.socialmedia.configuration.mapper.Mapper;
import com.petstagram.socialmedia.dto.status.StatusDto;
import com.petstagram.socialmedia.entity.status.Status;

public class StatusMapper extends Mapper<Status, StatusDto> {
    public StatusMapper() {
        super(Status.class, StatusDto.class);
    }
}
