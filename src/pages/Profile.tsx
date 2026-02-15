import Header from "../components/Header/Header"
import "../styles/components/main/_main.scss"
import UserBio from "../components/UserBio/UserBio"
import ProfileSection from "../components/ProfileSections/ProfileSection"
import ProfileContentDisplay from "../components/ProfileSections/ProfileContentDisplay"
import CarrerGoals from "../components/CarrerGoals/CarrerGoals"

function Profile() {
  return (
    <div className="profile-container">
        <header>
            <Header/>
        </header>
        <div className="bio-information-user">
            <UserBio/>
        </div>
        <div className="carrer-goals">
          <CarrerGoals/>
        </div>
        <div className="level-up-profile-container">
          <div className="level-up-layout">
            <div  className="level-up-section">
             <ProfileSection/>
            </div>
            <div  className="profile-content">
              <ProfileContentDisplay/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Profile