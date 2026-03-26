package com.vibe.tracker.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity // Tells the DB to create a table named "Task"
@Data // Lombok magic: automatically adds Getters, Setters, and toString
@NoArgsConstructor // Required by JPA
@AllArgsConstructor // Useful for creating tasks quickly
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increments the ID (1, 2, 3...)
    private Long id;

    private String title;
    private String description;
    private boolean completed;
}