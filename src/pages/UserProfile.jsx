import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";
import AthleteProfile from "../components/AthleteProfile";
import RecruiterProfile from "../components/RecruiterProfile";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const { username } = useParams();
  const navigate = useNavigate();
  const userType = sessionStorage.getItem("userType");

  let profile_url = `http://127.0.0.1:8000/profile/${username}`;

  const get_profile = async () => {
    const res = await fetch(profile_url, {
      method: "GET",
    });

    const retobj = await res.json();
    setProfile(retobj);
    setEditedProfile(retobj);
  };

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("username"); // Adjust this to your auth method
    if (!loggedInUser) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    if (loggedInUser !== username) {
      // If the logged-in user is not accessing their own profile
      alert("You can only edit your own profile.");
      navigate(`/profile/${loggedInUser}`); // Redirect to their profile
      window.location.reload();
      return;
    }

    get_profile();
  }, []);

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const profileData = JSON.stringify(editedProfile);

    try {
      const response = await fetch(profile_url+'/update', {
        method: "PUT",
        body: profileData,
      });

      if (response.ok) {
        get_profile();
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      {userType === "Athlete" ? (
        <AthleteProfile handleSave={handleSave} handleChange={handleChange} profile={profile} isEditing={isEditing} editedProfile={editedProfile} setIsEditing={setIsEditing}/>
      ) : userType === "Recruiter" ? (
        <RecruiterProfile handleSave={handleSave} handleChange={handleChange} profile={profile} isEditing={isEditing} editedProfile={editedProfile}setIsEditing={setIsEditing}/>
      ) : (
        <>Please Login To See</>
      )}
    </div>
  );
};

export default UserProfile;