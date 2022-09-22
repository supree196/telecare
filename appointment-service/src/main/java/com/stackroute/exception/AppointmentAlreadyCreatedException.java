package com.stackroute.exception;

public class AppointmentAlreadyCreatedException extends RuntimeException{

    public AppointmentAlreadyCreatedException() {
    }

    public AppointmentAlreadyCreatedException(String message) {
        super(message);
    }

    @Override
    public String toString() {
        return "Appointment Already Created Exception...";
    }
}
