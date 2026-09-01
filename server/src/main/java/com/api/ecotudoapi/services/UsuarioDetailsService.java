package com.api.ecotudoapi.services;

import com.api.ecotudoapi.entities.Usuario;
import com.api.ecotudoapi.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        Usuario usuario = repository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Usuário não encontrado"
                        )
                );

        return new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),
                usuario.getSenha(),
                List.of(
                        new SimpleGrantedAuthority(
                                "ROLE_" +
                                        usuario.getRole().name()
                        )
                )
        );
    }
}
