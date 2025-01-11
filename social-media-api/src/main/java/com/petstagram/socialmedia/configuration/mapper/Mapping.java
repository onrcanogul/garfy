package com.petstagram.socialmedia.configuration.mapper;

import com.petstagram.socialmedia.dto.base.BaseDto;
import com.petstagram.socialmedia.entity.base.BaseEntity;
import org.springframework.stereotype.Component;

@Component
public class Mapping<T extends BaseEntity, D extends BaseDto> extends Mapper<T,D> {
    public Mapping(Class<T> entityClass, Class<D> dtoClass) {
        super(entityClass, dtoClass);
    }
}
