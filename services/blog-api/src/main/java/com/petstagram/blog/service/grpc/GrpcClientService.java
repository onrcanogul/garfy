package com.petstagram.blog.service.grpc;

import com.google.protobuf.ByteString;
import io.grpc.stub.StreamObserver;
import media.Media;
import media.MediaProtoServiceGrpc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@Service
public class GrpcClientService {
    private final MediaProtoServiceGrpc.MediaProtoServiceBlockingStub blockingStub;
    private final MediaProtoServiceGrpc.MediaProtoServiceStub asyncStub;

    @Autowired
    public GrpcClientService(
            MediaProtoServiceGrpc.MediaProtoServiceBlockingStub blockingStub,
            MediaProtoServiceGrpc.MediaProtoServiceStub asyncStub) {
        this.blockingStub = blockingStub;
        this.asyncStub = asyncStub;
    }

    public Media.GetResponse getFiles(String id, Media.FileType fileType) {
        Media.GetRequest request = Media.GetRequest.newBuilder()
                .setId(id)
                .setFileType(fileType)
                .build();

        return blockingStub.getFiles(request);
    }

    public Media.UploadResponse uploadFiles(UUID id, String fileName, String contentType,
                                            Media.FileType fileType, String pathOrContainer,
                                            byte[] content) throws IOException, InterruptedException {
        final CountDownLatch finishLatch = new CountDownLatch(1);
        final Media.UploadResponse[] responseHolder = new Media.UploadResponse[1];

        StreamObserver<Media.UploadResponse> responseObserver = new StreamObserver<>() {
            @Override
            public void onNext(Media.UploadResponse value) {
                responseHolder[0] = value;
            }

            @Override
            public void onError(Throwable t) {
                finishLatch.countDown();
                throw new RuntimeException("Error during file upload", t);
            }

            @Override
            public void onCompleted() {
                finishLatch.countDown();
            }
        };

        StreamObserver<Media.FileChunk> requestObserver = asyncStub.uploadFiles(responseObserver);
        int chunkSize = 64 * 1024; // 64 KB chunk size
        int offset = 0;

        try {
            while (offset < content.length) {
                int end = Math.min(offset + chunkSize, content.length);
                byte[] chunk = new byte[end - offset];
                System.arraycopy(content, offset, chunk, 0, end - offset);
                offset += chunkSize;

                Media.FileChunk fileChunk = Media.FileChunk.newBuilder()
                        .setFileName(fileName)
                        .setContentType(contentType)
                        .setChunkData(ByteString.copyFrom(chunk))
                        .setId(id.toString())
                        .setPathOrContainer(pathOrContainer)
                        .setFileType(fileType)
                        .build();

                requestObserver.onNext(fileChunk);
            }

            requestObserver.onCompleted();
            finishLatch.await(1, TimeUnit.MINUTES);

        } catch (Exception e) {
            requestObserver.onError(e);
            throw new RuntimeException("File upload failed", e);
        }

        return responseHolder[0];
    }

    public Media.PresignedUrlResponse getPresignedUrl(String fileName, String contentType) {
        Media.PresignedUrlRequest request = Media.PresignedUrlRequest.newBuilder()
                .setFileName(fileName)
                .setContentType(contentType)
                .build();

        return blockingStub.getPresignedUrl(request);
    }
}
