package com.petstagram.socialmedia.configuration.response;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class ServiceResponse<T> {
    private T data;
    private List<String> errors;
    private int statusCode;
    private boolean isSuccessful;

    public static <T> ServiceResponse<T> success(T data, int statusCode) {
        ServiceResponse<T> response = new ServiceResponse<>();
        response.setData(data);
        response.setStatusCode(statusCode);
        response.setSuccessful(true);
        return response;
    }

    public static ServiceResponse<Void> success(int statusCode) {
        ServiceResponse<Void> response = new ServiceResponse<>();
        response.setStatusCode(statusCode);
        response.setSuccessful(true);
        return response;
    }

    public static <T> ServiceResponse<T> failure(List<String> errors, int statusCode) {
        ServiceResponse<T> response = new ServiceResponse<>();
        response.setErrors(errors);
        response.setStatusCode(statusCode);
        response.setSuccessful(false);
        return response;
    }

    public static <T> ServiceResponse<T> failure(String error, int statusCode) {
        ServiceResponse<T> response = new ServiceResponse<>();
        List<String> errorList = new ArrayList<>();
        errorList.add(error);
        response.setErrors(errorList);
        response.setStatusCode(statusCode);
        response.setSuccessful(false);
        return response;
    }

}
