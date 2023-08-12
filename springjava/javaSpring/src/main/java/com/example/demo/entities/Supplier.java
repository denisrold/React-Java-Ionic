package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "supliers")
@ToString
@EqualsAndHashCode
@Getter @Setter
public class Supplier{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String web;
    private String contact;
    private String email;

    private String address;

    private String phone;
    private Double salary;
}