package com.petstagram.socialmedia.controller.status;

import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.controller.base.BaseController;
import com.petstagram.socialmedia.service.comment.CommentStatusService;
import com.petstagram.socialmedia.service.post.PostStatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/status")
public class StatusController extends BaseController {

    private final PostStatusService postStatusService;
    private final CommentStatusService commentStatusService;

    public StatusController(PostStatusService postStatusService, CommentStatusService commentStatusService) {
        this.postStatusService = postStatusService;
        this.commentStatusService = commentStatusService;
    }

    @PostMapping("/post")
    public ResponseEntity<ServiceResponse<Void>> LikePost(UUID postId, UUID userId) {
        return controllerResponse(postStatusService.like(userId, postId));
    }

    @PostMapping("/comment")
    public ResponseEntity<ServiceResponse<Void>> LikeComment(UUID commentId, UUID userId) {
        return controllerResponse(commentStatusService.like(commentId, userId));
    }
}
