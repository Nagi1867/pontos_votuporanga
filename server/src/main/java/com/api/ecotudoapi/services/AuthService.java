package com.api.ecotudoapi.services;

import com.api.ecotudoapi.dto.CadastroDTO;
import com.api.ecotudoapi.dto.LoginDTO;
import com.api.ecotudoapi.dto.LoginResponseDTO;
import com.api.ecotudoapi.entities.Usuario;
import com.api.ecotudoapi.entities.enums.Role;
import com.api.ecotudoapi.repositories.UsuarioRepository;
import com.api.ecotudoapi.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponseDTO login(LoginDTO dados) {

        UsernamePasswordAuthenticationToken usernamePassword =
                new UsernamePasswordAuthenticationToken(
                        dados.getEmail(),
                        dados.getSenha()
                );

        authenticationManager.authenticate(
                usernamePassword
        );

        Usuario usuario = usuarioRepository
                .findByEmail(dados.getEmail())
                .orElseThrow();

        String token = jwtService.gerarToken(usuario);

        return new LoginResponseDTO(token);
    }

    public void cadastrar(CadastroDTO dados) {

        if (usuarioRepository.findByEmail(dados.getEmail()).isPresent()) {
            throw new RuntimeException("E-mail já cadastrado.");
        }

        Usuario usuario = new Usuario();

        usuario.setNome(dados.getNome());
        usuario.setEmail(dados.getEmail());

        usuario.setSenha(
                passwordEncoder.encode(dados.getSenha())
        );

        // Todo cadastro público começa como USER
        usuario.setRole(Role.USER);

        usuarioRepository.save(usuario);
    }
}