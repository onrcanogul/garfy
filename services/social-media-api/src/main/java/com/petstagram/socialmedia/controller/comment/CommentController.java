package com.petstagram.socialmedia.controller.comment;

import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.controller.base.BaseController;
import com.petstagram.socialmedia.dto.comment.CommentDto;
import com.petstagram.socialmedia.service.comment.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/comment")
public class CommentController extends BaseController {

    private final CommentService service;
    public CommentController(CommentService service) {
        this.service = service;
    }

    @GetMapping("/{page}/{size}/{postId}")
    public ResponseEntity<ServiceResponse<List<CommentDto>>> get(@PathVariable UUID postId , @PathVariable int page, @PathVariable int size) {
        return controllerResponse(service.get(page, size, postId));
    }

    @PostMapping
    public ResponseEntity<ServiceResponse<CommentDto>> create(@RequestBody CommentDto model) {
        return controllerResponse(service.create(model));
    }

    @PostMapping("/like/{postId}/{userId}")
    public ResponseEntity<ServiceResponse<String>> create(@PathVariable UUID postId, @PathVariable UUID userId) {
        return controllerResponse(service.like(postId, userId));
    }

    @PutMapping
    public ResponseEntity<ServiceResponse<CommentDto>> update(@RequestBody CommentDto model) {
        return controllerResponse(service.update(model, model.getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ServiceResponse<Void>> delete(@PathVariable UUID id) {
        return controllerResponse(service.delete(id));
    }
}
