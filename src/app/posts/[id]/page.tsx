"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostProps {
  title: string;
  body: string;
  id: number;
  userId: number;
}

const Page = () => {
  const [post, setPost] = useState<PostProps>();
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    const getPost = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.id}`
      );
      const data = await res.json();
      setPost(data);
      setLoading(false);
    };
    getPost();
  }, [params.id]);

  return (
    <main className="flex bg-[#131313] flex-col w-screen min-h-screen items-center justify-center">
      {loading ? (
        <>
          <div className="w-1/4 h-12 bg-[#1D1D1D] my-10"></div>
          <div className="h-1 w-1/2 bg-[#f0f0f0] rounded-full mb-10"></div>
          <div className="h-36 w-1/2 bg-[#1D1D1D]"></div>
        </>
      ) : (
        <>
          {post?.userId === 10 ? (
            <>
              <h1 className="text-3xl my-10">Příspěvek není veřejný</h1>
              <p>{post?.userId}</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl my-10">{post?.title}</h1>
              <div className="h-1 w-1/2 bg-[#f0f0f0] rounded-full mb-10"></div>
              <div className="w-1/2">
                <p className="text-3xl">{post?.body}</p>
              </div>
            </>
          )}
        </>
      )}

      <button
        className="bg-[#f0f0f0] text-[#131313] px-5 py-2 rounded-md mt-10"
        onClick={() => router.back()}
      >
        Back
      </button>
    </main>
  );
};
export default Page;
