package com.petstagram.socialmedia.configuration.grpc;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GrpcClientConfig {
    @Bean
    public ManagedChannel grpcManagedChannel() {
        return ManagedChannelBuilder.forAddress("localhost", 9050)
                .usePlaintext()
                .build();
    }
}
