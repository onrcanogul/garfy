package com.petstagram.socialmedia.controller.post;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.controller.base.BaseController;
import com.petstagram.socialmedia.dto.post.PostDto;
import com.petstagram.socialmedia.service.post.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/post")
public class PostController extends BaseController {

    private final PostService service;
    @Autowired
    private ObjectMapper mapper;
    public PostController(PostService service) {
        this.service = service;
    }

    @GetMapping("/{page}/{size}")
    public ResponseEntity<ServiceResponse<List<PostDto>>> get(@PathVariable int page, @PathVariable int size) {
        return controllerResponse(service.get(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponse<PostDto>> getById(@PathVariable UUID id) {
        return controllerResponse(service.getSingle(p -> p.getId().equals(id)));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ServiceResponse<PostDto>> create(
            @RequestPart("model") String modelJson,
            @RequestPart("files") List<MultipartFile> files) throws JsonProcessingException {
        return controllerResponse(service.create(mapper.readValue(modelJson, PostDto.class), files));
    }

    @PostMapping("like/{postId}/{userName}")
    public ResponseEntity<ServiceResponse<String>> like(@PathVariable UUID postId, @PathVariable String userName) {
        return controllerResponse(service.like(postId, userName));
    }

    @PutMapping
    public ResponseEntity<ServiceResponse<PostDto>> update(@RequestBody PostDto model) {
        return controllerResponse(service.update(model, model.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResponse<Void>> delete(@PathVariable UUID id) {
        return controllerResponse(service.delete(id));
    }

}
