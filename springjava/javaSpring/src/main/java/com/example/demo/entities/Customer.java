package com.example.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//Esto me generara getters y setters para todas las variables si quisiera elegirlo pondria arriba de la variable directamente
@ToString // Me genera el metodo toString en todas las variables
@EqualsAndHashCode
@Getter
@Setter
public class Customer {

    private String firstname;

    private String lastname;

    private String email;

    private String address;

    private String phone;
}
