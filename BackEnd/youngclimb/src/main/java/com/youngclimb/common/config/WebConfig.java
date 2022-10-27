package com.youngclimb.common.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").exposedHeaders("X-AUTH-TOKEN")
                .allowedOrigins("*").allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
