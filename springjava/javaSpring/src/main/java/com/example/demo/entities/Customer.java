package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//Esto me generara getters y setters para todas las variables si quisiera elegirlo pondria arriba de la variable directamente
@Entity //le digo que customers es una entidad
@Table(name = "customers")//indico el nombre de la tabla
@ToString // Me genera el metodo toString en todas las variables
@EqualsAndHashCode
@Getter @Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;

    private String lastname;

    private String email;

    private String address;

    private String phone;
}
