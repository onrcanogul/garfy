package com.petstagram.socialmedia.service.file;


import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
public class FileService {

    private final WebClient webClient;
    private final String dotNetApiUrl = "http://media-api:8080/api/media"; // .NET API URL

    public FileService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(dotNetApiUrl).build();
    }

    @Async
    public CompletableFuture<ServiceResponse> uploadFiles(UUID id, List<MultipartFile> files, String container, int fileType) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("id", id.toString());
        body.add("container", container);
        body.add("fileType", fileType);

        for (MultipartFile file : files) {
            try {
                body.add("files", new ByteArrayResource(file.getBytes()) {
                    @Override
                    public String getFilename() {
                        return file.getOriginalFilename();
                    }
                });
            } catch (Exception e) {
                throw new RuntimeException(file.getOriginalFilename(), e);
            }
        }

        return webClient.post()
                .uri("/upload")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(ServiceResponse.class)
                .doOnSuccess(response -> System.out.println(response))
                .doOnError(error -> System.err.println(error.getMessage()))
                .toFuture();
    }


    @Async
    public ServiceResponse<List<String>> getFiles(UUID id, int fileType) {
        return webClient.get()
                .uri("/{id}/{fileType}", id, fileType)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<ServiceResponse<List<String>>>() {})
                .doOnSuccess(response -> System.out.println("✅ API Yanıtı: " + response))
                .doOnError(error -> System.err.println("❌ Hata: " + error.getMessage()))
                .block();
    }


}
