package com.api.ecotudoapi.resources;

import com.api.ecotudoapi.dto.CadastroDTO;
import com.api.ecotudoapi.dto.LoginDTO;
import com.api.ecotudoapi.dto.LoginResponseDTO;
import com.api.ecotudoapi.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthResource {

    @Autowired
    private AuthService service;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginDTO dados
    ) {

        LoginResponseDTO response = service.login(dados);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/cadastro")
    public ResponseEntity<Void> cadastrar(
            @RequestBody CadastroDTO dados
    ) {
        service.cadastrar(dados);

        return ResponseEntity.ok().build();
    }
}