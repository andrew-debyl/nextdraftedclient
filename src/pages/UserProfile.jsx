import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserProfile.css"

const UserProfile = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    sport: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch the profile data on component mount
    axios
      .get("/api/profile/")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      profile_picture: file,
    }));
  };

  const handleSave = () => {
    // Save the profile changes
    const formData = new FormData();
    for (const key in profile) {
      formData.append(key, profile[key]);
    }

    axios
      .patch("/api/profile/update_profile/", formData)
      .then((response) => {
        setIsEditing(false);
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <div className="athlete-info">
          <h1>
            {profile.first_name} {profile.last_name}
          </h1>
          <p>{profile.sport}</p>
          <p>{profile.bio}</p>
        </div>
      </div>

      {isEditing ? (
        <div>
          <section>
            <h2>Edit Profile</h2>
            <input
              type="text"
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="last_name"
              value={profile.last_name}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Bio"
            />
            <input
              type="text"
              name="sport"
              value={profile.sport}
              onChange={handleChange}
              placeholder="Sport"
            />
            <input
              type="file"
              name="profile_picture"
              onChange={handleImageChange}
            />
            <button onClick={handleSave}>Save</button>
          </section>
        </div>
      ) : (
        <div>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
