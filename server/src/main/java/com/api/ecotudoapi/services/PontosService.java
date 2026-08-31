package com.api.ecotudoapi.services;

import com.api.ecotudoapi.dto.PontoDistanciaDTO;
import com.api.ecotudoapi.entities.Pontos;
import com.api.ecotudoapi.repositories.PontosRepository;
import com.api.ecotudoapi.services.exceptions.DatabaseException;
import com.api.ecotudoapi.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class PontosService {

    @Autowired
    private PontosRepository repository;

    public List<Pontos> findAll() {
        return repository.findAll();
    }

    public Pontos findById(Long id) {
        Optional<Pontos> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public List<Pontos> findByNome(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    public Pontos insert(Pontos obj) {
        return repository.save(obj);
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        }
        catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }

    public Pontos update(Long id, Pontos obj) {
        try {
            Pontos entity = repository.getReferenceById(id);

            updateData(entity, obj);

            return repository.save(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    private void updateData(Pontos entity, Pontos obj) {
        entity.setNome(obj.getNome());
        entity.setDescricao(obj.getDescricao());
        entity.setLocalizacao(obj.getLocalizacao());
        entity.setCapa(obj.getCapa());
        entity.setLatitude(obj.getLatitude());
        entity.setLongitude(obj.getLongitude());
    }

    private double calcularDistancia(
            double lat1,
            double lon1,
            double lat2,
            double lon2
    ) {
        final int RAIO_TERRA = 6371;

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a =
                Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                        + Math.cos(Math.toRadians(lat1))
                        * Math.cos(Math.toRadians(lat2))
                        * Math.sin(lonDistance / 2)
                        * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
        );

        return RAIO_TERRA * c;
    }

    public List<PontoDistanciaDTO> buscarPontosProximos(
            Double latitude,
            Double longitude
    ) {
        List<Pontos> pontos = repository.findAll();

        List<PontoDistanciaDTO> resultado = new ArrayList<>();

        for (Pontos ponto : pontos) {
            if (ponto.getLatitude() != null && ponto.getLongitude() != null) {
                double distancia = calcularDistancia(
                        latitude,
                        longitude,
                        ponto.getLatitude(),
                        ponto.getLongitude()
                );

                resultado.add(
                        new PontoDistanciaDTO(ponto, distancia)
                );
            }
        }

        resultado.sort(
                Comparator.comparing(PontoDistanciaDTO::getDistancia)
        );

        return resultado;
    }
}