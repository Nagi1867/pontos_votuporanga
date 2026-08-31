package com.api.ecotudoapi.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
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
    private Double latitude;
    private Double longitude;
    @ElementCollection
    @CollectionTable(
            name = "ponto_materiais",
            joinColumns = @JoinColumn(name = "ponto_id")
    )
    @Column(name = "material")
    private List<String> materiaisAceitos = new ArrayList<>();

    public Pontos() {
    }

    public Pontos(Long id, String nome, String descricao, String localizacao, String capa, Double latitude, Double longitude) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.localizacao = localizacao;
        this.capa = capa;
        this.latitude = latitude;
        this.longitude = longitude;
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

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public List<String> getMateriaisAceitos() {
        return materiaisAceitos;
    }

    public void setMateriaisAceitos(List<String> materiaisAceitos) {
        this.materiaisAceitos = materiaisAceitos;
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
