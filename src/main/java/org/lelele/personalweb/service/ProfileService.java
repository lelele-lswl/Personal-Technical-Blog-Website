package org.lelele.personalweb.service;

import lombok.RequiredArgsConstructor;
import org.lelele.personalweb.entity.Profile;
import org.lelele.personalweb.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    public Optional<Profile> getProfile() {
        return profileRepository.findAll().stream().findFirst();
    }

    @Transactional
    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    @Transactional
    public Profile updateProfile(Long id, Profile updated) {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        profile.setName(updated.getName());
        profile.setTitle(updated.getTitle());
        profile.setBio(updated.getBio());
        profile.setAvatarUrl(updated.getAvatarUrl());
        profile.setResumeUrl(updated.getResumeUrl());
        profile.setGithub(updated.getGithub());
        profile.setEmail(updated.getEmail());
        profile.setLinkedin(updated.getLinkedin());
        profile.setLocation(updated.getLocation());
        profile.setMotto(updated.getMotto());
        return profileRepository.save(profile);
    }
}