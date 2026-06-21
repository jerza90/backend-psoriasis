package com.psoriasis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.psoriasis", "com.acachiaa.store.config"})
@ConfigurationPropertiesScan
@EnableJpaRepositories(basePackages = "com.psoriasis.repository")
@EntityScan(basePackages = "com.psoriasis.model")
public class PsoriasisBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PsoriasisBackendApplication.class, args);
    }
}
