import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

interface ProfileModel {
  name: string;
  email: string;
  avatarUrl: string;
  goals: string[];
  premium: {
    active: boolean;
    title: string;
    description: string;
  };
}

interface Option {
  icon: string;
  text: string;
}

const fixedOptions: Option[] = [
  { icon: "🤰", text: "Pregnancy settings" },
  { icon: "📤", text: "Export data" },
  { icon: "🔄", text: "Restore data" },
  { icon: "📊", text: "Graphs & reports" },
  { icon: "🔒", text: "App lock" },
  { icon: "⏰", text: "Reminder" },
  { icon: "❓", text: "Support" },
];

const ProfileScreen: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileModel | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string>("Get pregnant");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const mockData: ProfileModel = {
          name: "Emily Johnson",
          email: "emilyjohnson@gmail.com",
          avatarUrl: "https://via.placeholder.com/50",
          goals: ["Track cycle", "Get pregnant", "Track pregnancy"],
          premium: {
            active: true,
            title: "Nestcare Premium",
            description: "You enjoying full access of Nestcare",
          },
        };
        setProfileData(mockData);
      } catch (error) {
        console.log("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load profile data.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      </View>

      {/* User Info Section */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: profileData.avatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.userDetails}>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.email}>{profileData.email}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit profile</Text>
        </TouchableOpacity>
      </View>

      {/* My Goal Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>My goal</Text>
        <View style={styles.goalOptions}>
          {profileData.goals.map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[styles.goalButton, selectedGoal === goal && styles.selectedGoal]}
              onPress={() => setSelectedGoal(goal)}
            >
              <Text style={[styles.goalText, selectedGoal === goal && styles.selectedGoalText]}>{goal}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* MyFlow Premium Section */}
      <View style={styles.card}>
        <View style={styles.premiumSection}>
          <Text style={styles.premiumIcon}>✅</Text> {/* Placeholder for checkmark icon */}
          <View>
            <Text style={styles.premiumTitle}>{profileData.premium.title}</Text>
            <Text style={styles.premiumText}>{profileData.premium.description}</Text>
          </View>
        </View>
      </View>

      {/* Additional Options */}
      <View style={styles.card}>
        {fixedOptions.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionItem}>
            <Text style={styles.optionIcon}>{option.icon}</Text>
            <Text style={styles.optionText}>{option.text}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} >
        <Ionicons name="exit-outline" size={24} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity >
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCE4EC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: "#333",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    borderWidth: 1,
    borderColor: "#f287ff",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editButtonText: {
    fontSize: 14,
    color: "#666",
    borderRadius: 10
  },
  card: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: "#333",
    marginBottom: 10,
  },
  goalOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  goalButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  selectedGoal: {
    color: "#ffffff",
    backgroundColor: "#000",
  },
  goalText: {
    fontSize: 14,
    color: "#333",
  },
  selectedGoalText: {
    color: "#ffffff",
  },
  premiumSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  premiumIcon: {
    fontSize: 20,
    color: "#000",
    marginRight: 10,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: "#333",
  },
  premiumText: {
    fontSize: 14,
    color: "#666",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  optionIcon: {
    fontSize: 20,
    color: "#666",
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  arrow: {
    fontSize: 20,
    color: "#666",
  },
  loadingText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  logoutButton: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ff3b3b',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  }
});

export default ProfileScreen;