import React from "react";

function RecruiterProfile({
  handleSave,
  handleChange,
  profile,
  isEditing,
  editedProfile,
  setIsEditing,
}) {
  return (
    <>
      <div className="profile-header">
        <img src={`http://127.0.0.1:8000${profile.profile_picture}`} alt="Athlete Avatar" className="profile-img" />
        <div className="profile-info">
          <h1 className="profile-info_name">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="profile-info_username">@{profile.username}</p>
          <p className="profile-info_gender">{profile.gender}</p>
          <div className="profile-moreinfo_wrapper">
            <p className="profile-moreinfo_item">
              <b>Organization: </b> {profile.organization}
            </p>
            <p className="profile-moreinfo_item">
              <b>Title: </b> {profile.title}
            </p>
            <p className="profile-moreinfo_item">
              <b>Sport(s):</b> {profile.sport}
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
              <b className="edit-profile-title">Organization: </b>
              <textarea
                name="organization"
                value={editedProfile.organization}
                onChange={handleChange}
                placeholder="Organization"
                className="edit-profile-input"
              />
            </div>
            <div className="edit-profile-item">
              <b className="edit-profile-title">Title: </b>
              <textarea
                name="title"
                value={editedProfile.title}
                onChange={handleChange}
                placeholder="Title"
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
            <button className="profile-save_button" onClick={handleSave}>
              Save
            </button>
            <button
              className="profile-close_button"
              onClick={() => setIsEditing(false)}
            >
              Close
            </button>
          </section>
        </div>
      ) : (
        <div>
          <button
            className="profile-edit_button"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </>
  );
}

export default RecruiterProfile;
