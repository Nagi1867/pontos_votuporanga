package com.api.ecotudoapi.repositories;

import com.api.ecotudoapi.entities.Pontos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PontosRepository extends JpaRepository<Pontos, Long> {
    List<Pontos> findByNome(String nome);
}
