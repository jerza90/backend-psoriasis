package com.acachiaa.store.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf
                .ignoringRequestMatchers(
                    "/api/webhook/stripe",
                    "/api/auth/**",
                    "/api/debug/**",
                    "/api/affiliate/**",
                    "/api/testimonials/**",
                    "/api/admin/testimonials/**",
                    "/api/checkout",
                    "/api/checkout/**",
                    "/api/payment/**",
                    "/api/ebook/**",
                    "/api/download",
                    "/api/download/**",
                    "/api/upload/**"
                )
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/checkout/**").permitAll()
                .requestMatchers("/api/payment/**").permitAll()
                .requestMatchers("/api/debug/**").permitAll()
                .requestMatchers("/api/affiliate/**").permitAll()
                .requestMatchers("/api/testimonials/**").permitAll()
                .requestMatchers("/api/admin/testimonials/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/webhook/stripe").permitAll()
                .requestMatchers("/api/ebook/**").permitAll()
                .requestMatchers("/api/download").permitAll()
                .requestMatchers("/api/download/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/upload/**").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
