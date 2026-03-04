package com.api.ecotudoapi.resources;

import com.api.ecotudoapi.entities.Pontos;
import com.api.ecotudoapi.services.PontosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/pontos")
public class PontosResource {
    @Autowired
    private PontosService service;

    @GetMapping
    public ResponseEntity<List<Pontos>> findAll() {
        List<Pontos> obj = service.findAll();
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Pontos> findById(@PathVariable Long id) {
        Pontos obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<Pontos> insert(@RequestBody Pontos obj) {
        obj = service.insert(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).body(obj);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Pontos> update(@PathVariable Long id, @RequestBody Pontos obj) {
        obj = service.update(id, obj);
        return ResponseEntity.ok().body(obj);
    }
}
