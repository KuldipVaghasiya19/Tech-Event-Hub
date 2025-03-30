package com.example.Tech.Events.controller;

import com.example.Tech.Events.entity.Organization;
import com.example.Tech.Events.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @PostMapping
    public Organization createOrganization(@RequestBody Organization organization) {
        return organizationService.createOrganization(organization);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Organization> getOrganizationById(@PathVariable String id) {
        Optional<Organization> organization = organizationService.getOrganizationById(id);
        return organization.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Organization> getAllOrganizations() {
        return organizationService.getAllOrganizations();
    }

    @GetMapping("/search")
    public List<Organization> searchOrganizations(@RequestParam String name) {
        return organizationService.searchOrganizationsByName(name);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Organization> updateOrganization(
//            @PathVariable String id,
//            @RequestBody Organization organizationDetails) {
//        try {
//            Organization updatedOrg = organizationService.updateOrganization(id, organizationDetails);
//            return ResponseEntity.ok(updatedOrg);
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrganization(@PathVariable String id) {
        organizationService.deleteOrganization(id);
        return ResponseEntity.ok().build();
    }
}