package com.vibe.tracker.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity // Creates the "income" table in the database
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Income {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String source; // e.g., "Upwork Contract" or "Fiverr Gig"
    private Double amount; // e.g., 150.50
    private LocalDate date; // e.g., "2026-03-22"
}