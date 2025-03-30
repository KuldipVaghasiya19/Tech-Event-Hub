package com.example.Tech.Events.service;

import com.example.Tech.Events.entity.Organization;
import com.example.Tech.Events.entity.Participant;
import com.example.Tech.Events.repository.OrganizationRepository;
import com.example.Tech.Events.repository.ParticipantRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final ParticipantRepository participantRepository;
    private final OrganizationRepository organizationRepository;

    public CustomUserDetailsService(ParticipantRepository participantRepository,
                                    OrganizationRepository organizationRepository) {
        this.participantRepository = participantRepository;
        this.organizationRepository = organizationRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Participant participant = participantRepository.findByEmail(email)
                .orElse(null);

        if (participant != null) {
            return User.withUsername(participant.getEmail())
                    .password(participant.getPassword())
                    .roles("PARTICIPANT")
                    .build();
        }

        // Check Organizations
        Organization organization = organizationRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return User.withUsername(organization.getEmail())  // And here
                .password(organization.getPassword())
                .roles("ORGANIZER")
                .build();
    }
}