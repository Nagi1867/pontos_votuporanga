package com.api.ecotudoapi.config;

import com.api.ecotudoapi.entities.Usuario;
import com.api.ecotudoapi.entities.enums.Role;
import com.api.ecotudoapi.repositories.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatabaseInitializer {

    @Bean
    CommandLineRunner initDatabase(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder
    ) {

        return args -> {

            if (usuarioRepository.findByEmail("admin@email.com").isEmpty()) {

                Usuario admin = new Usuario();

                admin.setNome("Administrador");
                admin.setEmail("admin@email.com");
                admin.setSenha(passwordEncoder.encode("123456"));
                admin.setRole(Role.ADMIN);

                usuarioRepository.save(admin);

                System.out.println("Usuário administrador criado.");
            }
        };
    }
}