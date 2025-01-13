package com.petstagram.blog.controller.base;

import com.petstagram.blog.configuration.response.ServiceResponse;
import org.springframework.http.ResponseEntity;

public class BaseController {
    protected <T> ResponseEntity<ServiceResponse<T>> controllerResponse(ServiceResponse<T> response) {
        return ResponseEntity
                .status(response.getStatusCode())
                .body(response);
    }
}
