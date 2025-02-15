package com.petstagram.socialmedia.service.post.impl;

import com.petstagram.socialmedia.configuration.mapper.Mapper;
import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.dto.post.PostDto;
import com.petstagram.socialmedia.entity.post.Post;
import com.petstagram.socialmedia.entity.status.PostStatus;
import com.petstagram.socialmedia.repository.post.PostRepository;
import com.petstagram.socialmedia.repository.status.PostStatusRepository;
import com.petstagram.socialmedia.service.base.impl.BaseServiceImpl;
import com.petstagram.socialmedia.service.file.FileService;
import com.petstagram.socialmedia.service.post.PostService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PostServiceImpl extends BaseServiceImpl<Post, PostDto> implements PostService {
    private final PostStatusRepository statusRepository;
    private final PostRepository repository;
    private final Mapper<Post, PostDto> mapper;
    private final FileService fileService;

    public PostServiceImpl(PostRepository repository, Mapper<Post, PostDto> mapper, PostStatusRepository statusRepository, FileService fileService) {
        super(repository, mapper);
        this.statusRepository = statusRepository;
        this.mapper = mapper;
        this.repository = repository;
        this.fileService = fileService;
    }

    public ServiceResponse<List<PostDto>> get(int page, int size) {
        List<PostDto> posts = repository.findAll()
                .stream()
                .skip((long)page * size).limit(size)
                .map(this::getImages).toList();
        return ServiceResponse.success(posts, 200);
    }

    public ServiceResponse<List<PostDto>> getByUser(UUID userId) {
        List<PostDto> posts = repository.findAll()
                .stream()
                .filter(p -> p.getUserId() == userId)
                .map(this::getImages)
                .toList();
        return ServiceResponse.success(posts, 200);
    }

    public ServiceResponse<PostDto> getById(UUID id) {
        PostDto post = repository.findById(id)
                .map(this::getImages)
                .orElseThrow();
        return ServiceResponse.success(post, 200);
    }

    public ServiceResponse<PostDto> create(PostDto model, List<MultipartFile> files) {
        Post post = mapper.toEntity(model);
        Post createdPost = repository.save(post);
        PostStatus postStatus = new PostStatus();
        postStatus.setPostId(createdPost.getId());
        post.setStatus(postStatus);
        statusRepository.save(postStatus);
        fileService.uploadFiles(createdPost.getId(), files, "post-images", 1);
        return ServiceResponse.success(mapper.toDto(createdPost), 201);
    }

    @Override
    public ServiceResponse<String> like(UUID postId, UUID userId) {
        String status;
        Post post = repository.findById(postId).orElseThrow();
        boolean isExist = post.getStatus().getUsers().contains(userId);
        if (!isExist) {
            status = "Like";
            post.getStatus().getUsers().add(userId);
        } else {
            status = "Dislike";
            post.getStatus().getUsers().remove(userId);
        }
        repository.save(post);
        return ServiceResponse.success(status, 200);
    }

    @Override
    protected void updateEntity(PostDto dto, Post entity) {
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setUpdatedDate(LocalDateTime.now());
        entity.setCreatedDate(dto.getCreatedDate());
    }

    private PostDto getImages(Post post) {
        PostDto dto = mapper.toDto(post);
        dto.setImageUrls(fileService.getFiles(post.getId(), 1).getData());
        return dto;
    }
}
