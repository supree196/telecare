package com.stackroute.exceptions;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException() {
    }

    public UserAlreadyExistsException(String message) {
        super(message);
    }

    @Override
    public String toString() {
        return "UserAlreadyExistsException";
    }
}
