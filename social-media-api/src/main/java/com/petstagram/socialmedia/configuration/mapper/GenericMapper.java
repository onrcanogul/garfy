package com.petstagram.socialmedia.configuration.mapper;

public interface GenericMapper<E, D> {
    D toDto(E entity);          // Entity to DTO
    E toEntity(D dto);          // DTO to Entity
}
