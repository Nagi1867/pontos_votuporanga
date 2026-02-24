package com.api.ecotudoapi.services;

import com.api.ecotudoapi.entities.Pontos;
import com.api.ecotudoapi.repositories.PontosRepository;
import com.api.ecotudoapi.services.exceptions.DatabaseException;
import com.api.ecotudoapi.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

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
    }
}
