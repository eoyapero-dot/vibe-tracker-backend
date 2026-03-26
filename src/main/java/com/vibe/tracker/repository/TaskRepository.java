package com.vibe.tracker.repository;

import com.vibe.tracker.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // That's it! JpaRepository gives us save(), findById(), and delete() for free.
}
