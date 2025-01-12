package com.petstagram.blog.service.base.impl;

import com.petstagram.blog.configuration.mapper.Mapper;
import com.petstagram.blog.configuration.response.ServiceResponse;
import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.entity.base.BaseEntity;
import com.petstagram.blog.repository.base.BaseRepository;
import com.petstagram.blog.service.base.BaseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public abstract class BaseServiceImpl<T extends BaseEntity, D extends BaseDto> implements BaseService<T, D> {
    private final BaseRepository<T> repository;
    private final Mapper<T, D> mapper;
    public BaseServiceImpl(BaseRepository<T> repository, Mapper<T, D> mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public ServiceResponse<List<D>> get(int page , int size, Predicate<T> predicate) {
        Stream<T> entityStream = repository.findAll().stream();
        if(predicate != null) {
            entityStream = entityStream.filter(predicate);
        }
        if(page != 0 && size != 0) {
            entityStream = entityStream.skip((long) page * size).limit(size);
        }
        return ServiceResponse.success(entityStream.map(mapper::toDto).collect(Collectors.toList()), 200);
    }

    public ServiceResponse<D> getSingle(Predicate<T> predicate) {
        T entity = repository.findAll().stream().filter(predicate)
                .findFirst().orElseThrow(() -> new NullPointerException());
        return ServiceResponse.success(mapper.toDto(entity), 200);
    }

    public ServiceResponse<D> create(D dto) {
        T entity = mapper.toEntity(dto);
        T newEntity = repository.save(entity);
        return ServiceResponse.success(mapper.toDto(newEntity), 201);
    }

    public ServiceResponse<D> update(D dto, UUID id) {
        T entity = repository.findById(id).orElseThrow(() -> new NullPointerException("Not found"));
        updateEntity(dto, entity);
        repository.save(entity);
        return ServiceResponse.success(dto, 200);
    }

    public ServiceResponse<Void> delete(UUID id) {
        T entity = repository.findById(id).orElseThrow(() -> new NullPointerException("Not found"));
        repository.delete(entity);
        return ServiceResponse.success(204);
    }

    protected abstract void updateEntity(D dto, T entity);


}
