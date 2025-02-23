package com.petstagram.socialmedia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SocialMediaApplication {
	public static void main(String[] args) {
		SpringApplication.run(SocialMediaApplication.class, args);
	}
}


