package org.lelele.personalweb.repository;

import org.lelele.personalweb.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByCategoryOrderByLevelDesc(String category);
    List<Skill> findAllByOrderByCategoryAscLevelDesc();
}