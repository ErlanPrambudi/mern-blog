import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import PostOrganisasi from "../components/PostOrganisasi";

export default function Home() {
  const [posts, setPosts] = useState([]);
  // const [recentOrganisasi, setRecentOrganisasi] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPosts`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        } else {
          console.error("Failed to fetch posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {/* <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Organisasi</h1>
        <div>{recentOrganisasi.length > 0 ? recentOrganisasi.map((lembaga) => <PostOrganisasi key={lembaga.idLembaga} post={lembaga} />) : <p>Tidak ada organisasi yang ditemukan.</p>}</div>
      </div> */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Kegiatan</h2>
            <div className="flex flex-wrap gap-5 mt-5 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to={"/search"} className="text-lg text-teal-500 hover:underline text-center">
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
