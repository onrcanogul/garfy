package com.petstagram.blog.service.base;

import com.petstagram.blog.configuration.response.ServiceResponse;
import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.entity.base.BaseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.function.Predicate;

@Service
public interface BaseService<T extends BaseEntity, D extends BaseDto> {
    public ServiceResponse<List<D>> get(int page, int size, Predicate<T> predicate);
    public ServiceResponse<D> getSingle(Predicate<T> predicate);
    public ServiceResponse<D> create(D dto);
    public ServiceResponse<D> update(D dto, UUID id);
    public ServiceResponse<Void> delete(UUID id);
}