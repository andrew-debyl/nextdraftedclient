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
  const [formErrors, setFormErrors] = useState({});

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
    const loggedInUser = sessionStorage.getItem("username");
    if (!loggedInUser) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    if (loggedInUser !== username) {
      alert("You can only edit your own profile.");
      navigate(`/profile/${loggedInUser}`); // Redirect to their profile
      window.location.reload();
      return;
    }

    get_profile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errors = { ...formErrors };

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        // Check if value is not empty first
        errors[name] = "Invalid email format";
      } else {
        delete errors[name];
      }
    } else if (name === "phone_number") {
      const phoneRegex =
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
      if (value && !phoneRegex.test(value)) {
        errors[name] = "Invalid phone number";
      } else {
        delete errors[name];
      }
    } else if (
      ["instagram", "linkedin", "youtube", "facebook"].includes(name)
    ) {
      if (value) {
        if (value.startsWith("http://") || value.startsWith("https://")) {
          try {
            new URL(value);
            delete errors[name];
          } catch (e) {
            errors[name] = "Invalid URL";
          }
        } else {
          const domainRegex = /^(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (domainRegex.test(value)) {
            delete errors[name];
          } else {
            errors[name] = "Invalid URL";
          }
        }
      } else {
        delete errors[name];
      }
    }

    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });

    setFormErrors(errors);
  };

  const handleSave = async () => {
    if (Object.keys(formErrors).length > 0) {
      alert("Please correct the form errors before saving.");
      return;
    }

    const formData = new FormData();
    const editedProfileCopy = { ...editedProfile };

    Object.keys(editedProfileCopy).forEach((key) => {
      if (
        ["instagram", "linkedin", "youtube", "facebook"].includes(key) &&
        editedProfileCopy[key]
      ) {
        if (
          !editedProfileCopy[key].startsWith("http://") &&
          !editedProfileCopy[key].startsWith("https://")
        ) {
          editedProfileCopy[key] = `https://${editedProfileCopy[key]}`;
        }
      }
      if (key === "profile_picture") {
        if (editedProfileCopy[key] instanceof File) {
          formData.append(key, editedProfileCopy[key]);
        } else {
          formData.append(key, null);
        }
      } else if (
        editedProfileCopy[key] !== undefined &&
        editedProfileCopy[key] !== null
      ) {
        formData.append(key, editedProfileCopy[key]);
      }
    });

    try {
      const response = await fetch(profile_url + "/update", {
        method: "PUT",
        body: formData,
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
        <AthleteProfile
          handleSave={handleSave}
          handleChange={handleChange}
          profile={profile}
          isEditing={isEditing}
          editedProfile={editedProfile}
          setIsEditing={setIsEditing}
          setEditedProfile={setEditedProfile}
          username={username}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      ) : userType === "Recruiter" ? (
        <RecruiterProfile
          handleSave={handleSave}
          handleChange={handleChange}
          profile={profile}
          isEditing={isEditing}
          editedProfile={editedProfile}
          setIsEditing={setIsEditing}
          setEditedProfile={setEditedProfile}
          username={username}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      ) : (
        <>Please Login To See</>
      )}
    </div>
  );
};

export default UserProfile;
