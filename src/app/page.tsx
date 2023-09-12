"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface PostProps {
  title: string;
  body: string;
  id: number;
}

const Home = () => {
  const [data, setData] = useState<PostProps[]>([]);
  const [postsNumber, setPostsNumber] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      console.log(data);
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handlePostsNumber = () => {
    setPostsNumber(postsNumber + 10);
  };

  return (
    <main className="flex bg-[#131313] flex-col w-screen min-h-screen items-center justify-center">
      <h1 className="text-3xl my-10">Posts</h1>
      <div className="h-1 w-1/2 bg-[#f0f0f0] rounded-full mb-10"></div>
      <div className="grid container h-2/3 grid-cols-3 gap-4">
        {loading ? (
          <>
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bg-[#1D1D1D] h-full w-full rounded-md p-4 text-white"
              ></div>
            ))}
          </>
        ) : (
          <>
            {data.slice(0, postsNumber).map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <div className="bg-[#1D1D1D] h-full w-full rounded-md p-4 text-white">
                  <h3 className="text-xl">{post.title}</h3>
                  <p className="text-sm">{post.body}</p>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
      <div className="h-12 w-max rounded-md p-4 fixed bottom-0 text-white flex flex-col justify-center bg-[#3D3D3D]">
        <h3 onClick={handlePostsNumber} className="text-xl">
          Load more
        </h3>
      </div>
    </main>
  );
};

export default Home;
