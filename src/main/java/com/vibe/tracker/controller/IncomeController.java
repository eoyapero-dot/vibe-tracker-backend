package com.vibe.tracker.controller;

import com.vibe.tracker.model.Income;
import com.vibe.tracker.repository.IncomeRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/income") // The URL for income data
@CrossOrigin("http://localhost:5173")
public class IncomeController {

    private final IncomeRepository incomeRepository;

    public IncomeController(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    @PostMapping
    public Income addIncome(@RequestBody Income income) {
        return incomeRepository.save(income);
    }

    @GetMapping
    public List<Income> getAllIncome() {
        return incomeRepository.findAll();
    }
}