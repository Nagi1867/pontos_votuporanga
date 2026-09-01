package com.api.ecotudoapi.services;

import com.api.ecotudoapi.dto.LoginDTO;
import com.api.ecotudoapi.dto.LoginResponseDTO;
import com.api.ecotudoapi.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    public LoginResponseDTO login(LoginDTO dados) {

        System.out.println("LOGIN RECEBIDO");
        System.out.println("EMAIL: " + dados.getEmail());

        UsernamePasswordAuthenticationToken usernamePassword =
                new UsernamePasswordAuthenticationToken(
                        dados.getEmail(),
                        dados.getSenha()
                );

        System.out.println("AUTENTICANDO...");

        authenticationManager.authenticate(usernamePassword);

        System.out.println("AUTENTICADO COM SUCESSO!");

        String token = jwtService.gerarToken(
                dados.getEmail()
        );

        System.out.println("TOKEN GERADO!");

        return new LoginResponseDTO(token);
    }
}