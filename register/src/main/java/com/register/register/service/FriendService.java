package com.register.register.service;

import com.register.register.models.Friend;
import com.register.register.dao.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FriendService {

    @Autowired
    private FriendRepository friendRepository;

    // Method to add a friend
    public void addFriend(String username, String friendUsername) {
        Friend userFriendEntry = friendRepository.findByUsername(username).orElse(null);

        if (userFriendEntry == null) {
            // Create new Friend record
            Friend newFriend = new Friend();
            newFriend.setUsername(username);
            newFriend.setFriends(friendUsername);
             // Initial count
            friendRepository.save(newFriend);
        } else {
            // Existing user - update friends list and total count
            String existingFriends = userFriendEntry.getFriends();
            if (existingFriends == null || existingFriends.isEmpty()) {
                userFriendEntry.setFriends(friendUsername);
                 // reset if list was empty
            } else if (!existingFriends.contains(friendUsername)) {
                userFriendEntry.setFriends(existingFriends + "," + friendUsername);
                
            }
            // If friend already exists, do not add again
            friendRepository.save(userFriendEntry);
        }
    }

    // Get all friend links
    public List<Friend> getAllFriendLinks() {
        return friendRepository.findAll();
    }

    // Get a friend by username
    public Optional<Friend> getFriendByUsername(String username) {
        return friendRepository.findByUsername(username);
    }
}
