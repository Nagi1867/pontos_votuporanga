package com.api.ecotudoapi.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table
public class Pontos implements Serializable {
    private static final long SerialVersionUID = 1L;
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao;
    private String localizacao;
    private String capa;

    public Pontos() {
    }

    public Pontos(String capa, String descricao, Long id, String localizacao, String nome) {
        this.capa = capa;
        this.descricao = descricao;
        this.id = id;
        this.localizacao = localizacao;
        this.nome = nome;
    }

    public String getCapa() {
        return capa;
    }

    public void setCapa(String capa) {
        this.capa = capa;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Pontos pontos = (Pontos) o;
        return Objects.equals(id, pontos.id) && Objects.equals(nome, pontos.nome) && Objects.equals(descricao, pontos.descricao) && Objects.equals(localizacao, pontos.localizacao) && Objects.equals(capa, pontos.capa);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, descricao, localizacao, capa);
    }
}
