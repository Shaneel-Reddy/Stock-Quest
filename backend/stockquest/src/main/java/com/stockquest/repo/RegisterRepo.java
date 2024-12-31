package com.stockquest.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockquest.entity.Register;

@Repository
public interface RegisterRepo extends JpaRepository<Register, Long> {

	Register findByEmail(String email);
}