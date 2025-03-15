import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { TextInput, Button, Avatar, useTheme } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";

const EditProfileScreen = () => {
  const theme = useTheme();
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("Andrew Ainsley");
  const [username, setUsername] = useState("Andrew");
  const [dob, setDob] = useState("12/27/1995");
  const [email, setEmail] = useState("andrew_ainsley@yourdomain.com");
  const [gender, setGender] = useState("Male");

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: "photo", includeBase64: false },
      (response) => {
        if (response.didCancel || response.error) {
          console.log("User cancelled image picker");
        } else {
          setProfileImage(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      {/* Profile Image */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={handleImagePick}>
          <Avatar.Image
            size={100}
            source={
              profileImage
                ? { uri: profileImage }
                : "https://ykhoamia.com/wp-content/uploads/2015/12/B%C3%A1c-s%C4%A9-03.jpg"
            }
          />
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
      />
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        style={{ marginTop: 10 }}
      />
      <TextInput
        label="Date of Birth"
        value={dob}
        onChangeText={setDob}
        mode="outlined"
        style={{ marginTop: 10 }}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={{ marginTop: 10 }}
        keyboardType="email-address"
      />
      <TextInput
        label="Gender"
        value={gender}
        onChangeText={setGender}
        mode="outlined"
        style={{ marginTop: 10 }}
      />

      {/* Continue Button */}
      <Button
        mode="contained"
        onPress={() => console.log("Profile Updated")}
        style={{ marginTop: 20 }}
      >
        Continue
      </Button>
    </View>
  );
};

export default EditProfileScreen;
