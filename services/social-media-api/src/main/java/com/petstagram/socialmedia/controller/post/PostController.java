package com.petstagram.socialmedia.controller.post;

import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.controller.base.BaseController;
import com.petstagram.socialmedia.dto.post.PostDto;
import com.petstagram.socialmedia.service.post.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/post")
public class PostController extends BaseController {

    private final PostService service;
    public PostController(PostService service) {
        this.service = service;
    }

    @GetMapping("/{page}/{size}")
    public ResponseEntity<ServiceResponse<List<PostDto>>> get(@PathVariable int page, @PathVariable int size) {
        return controllerResponse(service.get(page, size, null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponse<PostDto>> getById(@PathVariable UUID id) {
        return controllerResponse(service.getSingle(p -> p.getId().equals(id)));
    }

    @PostMapping
    public ResponseEntity<ServiceResponse<PostDto>> create(@RequestBody PostDto model) {
        return controllerResponse(service.create(model));
    }

    @PostMapping("/like/{postId}/{userId}")
    public ResponseEntity<ServiceResponse<String>> like(@PathVariable UUID postId, @PathVariable UUID userId) {
        return controllerResponse(service.like(postId, userId));
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
