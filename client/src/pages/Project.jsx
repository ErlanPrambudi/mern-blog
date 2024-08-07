import { useEffect, useState } from "react";
import PostOrganisasi from "../components/PostOrganisasi";

const Project = () => {
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/lembaga/list?limit=6`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className=" flex-col justify-center items-center mb-5">
      <h1 className=" text-3xl">Organisasi</h1>
      <div>{recentPosts && recentPosts.map((post) => <PostOrganisasi key={post._id} post={post} />)}</div>
    </div>
  );
};

export default Project;
