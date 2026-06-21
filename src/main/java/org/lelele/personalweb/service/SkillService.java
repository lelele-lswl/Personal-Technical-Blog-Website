package org.lelele.personalweb.service;

import lombok.RequiredArgsConstructor;
import org.lelele.personalweb.entity.Skill;
import org.lelele.personalweb.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAllByOrderByCategoryAscLevelDesc();
    }

    public Map<String, List<Skill>> getSkillsGroupedByCategory() {
        return getAllSkills().stream()
                .collect(Collectors.groupingBy(Skill::getCategory));
    }

    @Transactional
    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    @Transactional
    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}