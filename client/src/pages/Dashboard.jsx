import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComment from "../components/DashComment";
import DashboardComp from "../components/DashboardComp";
import CreatePost from "./CreatePost";
import CreateManagement from "./CreateManagement";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex  flex-col md:flex-row">
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar />
      </div>
      {/* profile */}
      {tab === "profile" && <DashProfile />}
      {/* posts */}
      {tab === "posts" && <DashPosts />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* coment */}
      {tab === "comments" && <DashComment />}
      {/* dashboard component */}
      {tab === "dash" && <DashboardComp />}
      {/* create post */}
      {tab === "create-post" && (
        <div className="flex-1 p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
          <div className="scale-100">
            <CreatePost />
          </div>
        </div>
      )}
      {/* create management */}
      {tab === "create-management" && (
        <div className="flex-1 p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
          <div className="scale-100">
            <CreateManagement />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
