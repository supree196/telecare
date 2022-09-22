package com.stackroute.repository;

import com.stackroute.exceptions.UserNotRegisteredException;
import com.stackroute.model.User;
import com.stackroute.model.UserType;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

//@RunWith(SpringRunner.class)
@DataJpaTest
@TestPropertySource("classpath:application.properties")
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    public void setUp()
    {
        user=new User("akm@doctor.com","password", UserType.DOCTOR);

    }

    @AfterEach
    public void tearUp()
    {
        userRepository.delete(user);
    }

    /*@Test
    public void TestFindById_GivenUserEmailId_WhenUserExists_ThenReturnUser()
    {
        userRepository.save(user);
        Optional<User> userExpected=userRepository.findById("akm@doctor.com");
        assertThat(user).usingRecursiveComparison().isEqualTo(userExpected.get());
    }

    @Test
    public void TestFindById_GivenUserEmailId_WhenUserNotFound_ShouldThrowUserNotRegisteredException()
    {
        userRepository.save(user);
        Assertions.assertThrows(UserNotRegisteredException.class,()->{
            User userExpected=userRepository.findById("akmishra@doctor.com").orElseThrow(()->{
                throw new UserNotRegisteredException();
            });
        });
    }

    @Test
    public void TestSave_GivenUser_WhenUserSaved_ThenReturnSavedUser()
    {
        assertThat(user).usingRecursiveComparison().isEqualTo(userRepository.save(user));
    }*/
}
