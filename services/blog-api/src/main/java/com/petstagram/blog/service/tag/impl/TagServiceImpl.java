package com.petstagram.blog.service.tag.impl;

import com.petstagram.blog.configuration.mapper.Mapper;
import com.petstagram.blog.dto.tag.TagDto;
import com.petstagram.blog.entity.tag.Tag;
import com.petstagram.blog.repository.base.BaseRepository;
import com.petstagram.blog.service.base.impl.BaseServiceImpl;
import com.petstagram.blog.service.tag.TagService;
import org.springframework.stereotype.Service;

@Service
public class TagServiceImpl extends BaseServiceImpl<Tag, TagDto> implements TagService {
    public TagServiceImpl(BaseRepository<Tag> repository, Mapper<Tag, TagDto> mapper) {
        super(repository, mapper);
    }

    @Override
    protected void updateEntity(TagDto dto, Tag entity) {
        entity.setName(dto.getName());
    }
}
