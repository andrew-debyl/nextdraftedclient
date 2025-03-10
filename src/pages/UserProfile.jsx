import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [profile, setProfile] = useState({});

  const { username } = useParams();
  let profile_url = `http://127.0.0.1:8000/profile/${username}`;

  const get_profile = async () => {
    const res = await fetch(profile_url, {
      method: "GET",
    });

    const retobj = await res.json();
    setProfile(retobj);
  };

  useEffect(() => {
    get_profile();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  /*
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
  };*/

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <img
          alt="Athlete Avatar"
          className="avatar-img"
        />
        <div className="athlete-info">
          <h1>
            {profile.first_name} {profile.last_name}
          </h1>
          <p>@{profile.username}</p>
          <div className="additional-info">
            <p>
              <b>Sport(s):</b> {profile.sport}
            </p>
            <p>
              <b>Height:</b> {String(profile.height).replace('.', "'") + '"'}
            </p>
            <p>
              <b>Weight:</b> {profile.weight} lbs
            </p>
            <p>
              <b>Location:</b> {profile.location}
            </p>
          </div>
        </div>
      </div>
      <div className="bio-section">
        <h2>About Me</h2>
        <p>{profile.bio}</p>
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
