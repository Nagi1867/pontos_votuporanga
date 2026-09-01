package com.api.ecotudoapi.security;

import com.api.ecotudoapi.entities.Usuario;
import com.api.ecotudoapi.repositories.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Login e outras rotas de autenticação não precisam de JWT
        if (request.getServletPath().startsWith("/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authorization = request.getHeader("Authorization");

        // Requisição sem JWT
        if (authorization == null ||
                !authorization.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token = authorization.substring(7);

        try {

            if (!jwtService.validarToken(token)) {
                filterChain.doFilter(request, response);
                return;
            }

            String email = jwtService.extrairEmail(token);

            Usuario usuario = usuarioRepository
                    .findByEmail(email)
                    .orElse(null);

            if (usuario != null) {

                SimpleGrantedAuthority authority =
                        new SimpleGrantedAuthority(
                                "ROLE_" + usuario.getRole().name()
                        );

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                usuario.getEmail(),
                                null,
                                List.of(authority)
                        );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);
            }

        } catch (Exception e) {

            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}