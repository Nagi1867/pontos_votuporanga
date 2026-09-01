package com.api.ecotudoapi.config;

import com.api.ecotudoapi.security.JwtAuthenticationFilter;
import com.api.ecotudoapi.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(userDetailsService);

        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager() {

        return new ProviderManager(
                authenticationProvider()
        );
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authenticationProvider(authenticationProvider())

                .authorizeHttpRequests(auth -> auth

                        // Login público
                        .requestMatchers("/auth/**")
                        .permitAll()

                        // Consultas públicas
                        .requestMatchers(
                                HttpMethod.GET,
                                "/pontos/**"
                        )
                        .permitAll()

                        // Criar ecoponto → ADMIN
                        .requestMatchers(
                                HttpMethod.POST,
                                "/pontos/**"
                        )
                        .hasRole("ADMIN")

                        // Alterar ecoponto → ADMIN
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/pontos/**"
                        )
                        .hasRole("ADMIN")

                        // Excluir ecoponto → ADMIN
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/pontos/**"
                        )
                        .hasRole("ADMIN")

                        .anyRequest()
                        .authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}