package com.api.ecotudoapi.config;

import com.api.ecotudoapi.entities.Pontos;
import com.api.ecotudoapi.repositories.PontosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {
    @Autowired
    private PontosRepository repository;


    @Override
    public void run(String... args) throws Exception {
        Pontos pontos = new Pontos(null, "Ecotudo votuporanga", "Ecotudo", "Votuporanga", "jfjifdj");
        repository.save(pontos);
    }
}
