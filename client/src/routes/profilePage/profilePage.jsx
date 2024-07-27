import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  console.log(data)
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await apiRequest.post("/auth/logout");
      if (response.status === 200) {
        updateUser(null);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to={"/profile/update"}>
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to={"/add"}>
              <button>Create New Post</button>
            </Link>
          </div>

          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>failed to load posts</p>}
            >
              {(postResponse) => {
                if (postResponse.data.userPosts.length > 0) {
                  return <List posts={postResponse.data.userPosts} />;
                }
                return <>You dont have any listing</>;
              }}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>failed to load posts</p>}
            >
              {(postResponse) => {
                console.log(postResponse.data.savedPosts)
                if (postResponse.data.savedPosts.length > 0) {
                  return <List posts={postResponse.data.savedPosts} />;
                }
                return <>You dont have any saved listing</>;
              }}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
