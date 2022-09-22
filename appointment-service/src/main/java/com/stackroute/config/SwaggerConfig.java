package com.stackroute.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket swaggerConfiguration() {
        return new Docket(DocumentationType.SWAGGER_2).select()
                .paths(PathSelectors.ant("/api/v3/**"))
                .apis(RequestHandlerSelectors.basePackage("com.stackroute"))
                .build()
                .apiInfo(apiDetails());
    }

    //	this method will provide the object of type ApiInfo which can be used to build docket
    private ApiInfo apiDetails() {
        return new ApiInfo(
                "Appointment service",
                "Appointment service API",
                "1.0.0",
                "Free to use",
                new springfox.documentation.service.Contact("Abhinay", "www.google.co.in",
                        "abhinay.k.mishra@globallogic.com"),
                "API license",
                "http://www.google.co.in",
                Collections.emptyList()
        );
    }
}
