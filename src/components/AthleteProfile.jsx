import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
function AthleteProfile({
  handleSave,
  handleChange,
  profile,
  isEditing,
  editedProfile,
  setIsEditing,
  setEditedProfile,
  username,
  formErrors,
  setFormErrors,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedProfile({
        ...editedProfile,
        profile_picture: file,
      });
    }
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();

    // If the birthday hasn't occurred yet this year, subtract 1 from age
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleClose = () => {
    if (isEditing === true) {
      setIsEditing(false);
      setEditedProfile({ ...profile }); // Reset editedProfile to original profile data
      setFormErrors({}); //clear errors
    } else {
      setIsEditing(true);
    }
  };

  return (
    <>
      <div className="profile-header">
        <img
          src={`http://127.0.0.1:8000${profile.profile_picture}`}
          alt="Athlete Avatar"
          className="profile-img"
        />
        <div className="profile-info">
          <h1 className="profile-info_name">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="profile-info_username">@{username}</p>
          <p className="profile-info_gender">
            {profile.gender} - {calculateAge(profile.birth_date)}
          </p>
          <div className="profile-moreinfo_wrapper">
            <p className="profile-moreinfo_item">
              <b>Sport(s):</b> {profile.sport}
            </p>
            <p className="profile-moreinfo_item">
              <b>Height:</b> {String(profile.height).replace(".", "'") + '"'}
            </p>
            <p className="profile-moreinfo_item">
              <b>Weight:</b> {profile.weight} lbs
            </p>
            <p className="profile-moreinfo_item">
              <b>Location:</b> {profile.location}
            </p>
          </div>
        </div>
      </div>
      <div className="profile-bio-wrapper">
        <h2 className="profile-bio_title">About Me</h2>
        <p className="profile-bio">{profile.bio}</p>
        <div className="profile-contact-wrapper">
          {(profile.email || profile.phone_number) && (
            <>
              <h3 className="profile-contact-title">Contact Me</h3>
              <div className="contact-info">
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="contact-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </a>
                )}
                {profile.phone_number && (
                  <a
                    href={`tel:${profile.phone_number}`}
                    className="contact-icon"
                  >
                    <FontAwesomeIcon icon={faPhone} />
                  </a>
                )}
              </div>
            </>
          )}
          {(profile.instagram ||
            profile.linkedin ||
            profile.youtube ||
            profile.facebook) && (
            <h3 className="profile-contact-title">Follow Me</h3>
          )}
          <div className="social-links">
            {profile.instagram && (
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            )}
            {profile.youtube && (
              <a
                href={profile.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            )}
            {profile.facebook && (
              <a
                href={profile.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            )}
          </div>
        </div>
      </div>
      {isEditing ? (
        <div>
          <section className="edit-profile-section">
            <h2>Edit Profile</h2>
            <div className="edit-profile-item">
              <b className="edit-profile-title">First Name: </b>
              <input
                type="text"
                name="first_name"
                value={editedProfile.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="edit-profile-input"
              />
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Last Name: </b>
              <input
                type="text"
                name="last_name"
                value={editedProfile.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="edit-profile-input"
              />
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Bio: </b>
              <textarea
                name="bio"
                value={editedProfile.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="edit-profile-input"
              />
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Sport(s): </b>
              <input
                type="text"
                name="sport"
                value={editedProfile.sport}
                onChange={handleChange}
                placeholder="Sport"
                className="edit-profile-input"
              />
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Height: </b>
              <input
                type="text"
                name="height"
                value={editedProfile.height}
                onChange={handleChange}
                placeholder="Height"
                className="edit-profile-input"
              />
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Weight: </b>
              <input
                type="text"
                name="weight"
                value={editedProfile.weight}
                onChange={handleChange}
                placeholder="Weight"
                className="edit-profile-input"
              />
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Date of Birth: </b>
              <input
                type="date"
                name="birth_date"
                value={editedProfile.birth_date || ""}
                onChange={handleChange}
                className="edit-profile-input"
              />
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Location: </b>
              <input
                type="text"
                name="location"
                value={editedProfile.location}
                onChange={handleChange}
                placeholder="Location"
                className="edit-profile-input"
              />
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Gender: </b>
              <select
                name="gender"
                value={editedProfile.gender}
                onChange={handleChange}
                className="edit-profile-input"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Email: </b>
              <input
                type="email"
                name="email"
                value={editedProfile.email || ""}
                onChange={handleChange}
                placeholder="Email"
                className="edit-profile-input"
              />
              {formErrors.email && (
                <p className="error-message">{formErrors.email}</p>
              )}
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Phone Number: </b>
              <input
                type="text"
                name="phone_number"
                value={editedProfile.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                className="edit-profile-input"
              />
              {formErrors.phone_number && (
                <p className="error-message">{formErrors.phone_number}</p>
              )}
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Instagram: </b>
              <input
                type="text"
                name="instagram"
                value={editedProfile.instagram}
                onChange={handleChange}
                placeholder="Instagram"
                className="edit-profile-input"
              />
              {formErrors.instagram && (
                <p className="error-message">{formErrors.instagram}</p>
              )}
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Linkedin: </b>
              <input
                type="text"
                name="linkedin"
                value={editedProfile.linkedin}
                onChange={handleChange}
                placeholder="Linkedin"
                className="edit-profile-input"
              />
              {formErrors.linkedin && (
                <p className="error-message">{formErrors.linkedin}</p>
              )}
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Youtube: </b>
              <input
                type="text"
                name="youtube"
                value={editedProfile.youtube}
                onChange={handleChange}
                placeholder="Youtube"
                className="edit-profile-input"
              />
              {formErrors.youtube && (
                <p className="error-message">{formErrors.youtube}</p>
              )}
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Facebook: </b>
              <input
                type="text"
                name="facebook"
                value={editedProfile.facebook}
                onChange={handleChange}
                placeholder="Facebook"
                className="edit-profile-input"
              />
              {formErrors.facebook && (
                <p className="error-message">{formErrors.facebook}</p>
              )}
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Profile Picture: </b>
              <input
                type="file"
                name="profile_picture"
                onChange={handleFileChange}
                className="edit-profile-input"
              />
            </div>
            <button className="profile-save_button" onClick={handleSave}>
              Save
            </button>
            <button className="profile-close_button" onClick={handleClose}>
              Close
            </button>
          </section>
        </div>
      ) : (
        <div className="profile-edit">
          <button className="profile-edit_button" onClick={handleClose}>
            Edit Profile
          </button>
        </div>
      )}
    </>
  );
}

export default AthleteProfile;
