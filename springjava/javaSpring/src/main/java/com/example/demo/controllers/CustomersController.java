package com.example.demo.controllers;

import com.example.demo.entities.Customer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
public class CustomersController {
    @GetMapping("/api/customers")
    public List<Customer> getAll(){
     List<Customer> customers = new ArrayList<>();
     customers.add(new Customer());
     return customers;
 }
}
