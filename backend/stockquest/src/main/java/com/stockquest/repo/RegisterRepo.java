package com.stockquest.repo;

import com.stockquest.entity.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisterRepo extends JpaRepository<Register, Long> {

    Register findByEmail(String email);
}