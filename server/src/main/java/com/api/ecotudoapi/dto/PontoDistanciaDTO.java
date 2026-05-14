package com.api.ecotudoapi.dto;

import com.api.ecotudoapi.entities.Pontos;

public class PontoDistanciaDTO {
    private Pontos ponto;
    private Double distancia;

    public PontoDistanciaDTO(Pontos ponto, Double distancia) {
        this.ponto = ponto;
        this.distancia = distancia;
    }

    public Pontos getPonto() {
        return ponto;
    }

    public void setPonto(Pontos ponto) {
        this.ponto = ponto;
    }

    public Double getDistancia() {
        return distancia;
    }

    public void setDistancia(Double distancia) {
        this.distancia = distancia;
    }
}
