package com.petstagram.blog.service.file;

import com.petstagram.blog.configuration.response.ServiceResponse;
import com.petstagram.blog.dto.file.FileDto;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;

@Service
public class FileService {

    private final WebClient webClient;
    private final String dotNetApiUrl = "http://media-api:8081/api/media"; // .NET API URL

    public FileService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(dotNetApiUrl).build();
    }

    /**
     * .NET API'ye dosya yükleme isteği gönderir (WebClient ile)
     */
    public Mono<ServiceResponse> uploadFiles(UUID id, List<MultipartFile> files, String container, int fileType) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("id", id.toString());  // UUID parametresi
        body.add("container", container); // Container adı
        body.add("fileType", fileType); // Dosya tipi

        for (MultipartFile file : files) {
            try {
                body.add("files", new ByteArrayResource(file.getBytes()) {
                    @Override
                    public String getFilename() {
                        return file.getOriginalFilename();
                    }
                });
            } catch (Exception e) {
                throw new RuntimeException("Dosya işleme hatası: " + file.getOriginalFilename(), e);
            }
        }
        return webClient.post()
                .uri("/upload")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .bodyValue(BodyInserters.fromMultipartData(body))
                .retrieve()
                .bodyToMono(ServiceResponse.class)
                .doOnError(e -> System.err.println("WebClient Error: " + e.getMessage()))
                .doOnSuccess(response -> System.out.println("Response received from .NET API: " + response));
    }

    /**
     * .NET API'den dosyaları çekme (WebClient ile)
     */
    public Mono<FileDto> getFiles(UUID id, int fileType) {
        return webClient.get()
                .uri("/{id}/{fileType}", id, fileType) // Path parametreleri ile çağrı
                .retrieve()
                .bodyToMono(FileDto.class);
    }
}
