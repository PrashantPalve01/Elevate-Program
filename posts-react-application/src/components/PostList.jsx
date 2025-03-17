import React, { useEffect, useState } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );

      const data = await response.json();

      setPosts(data);
    } catch (error) {
      setError(error.message);
      console.log("Something went wrong to fetching data..", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchTitle.toLowerCase());
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h2>SOmething went wrong to fetch data. Please try again</h2>;
  }

  //   if (filteredData.length == 0) {
  //     return <h1>No Post Avialable</h1>;
  //   }
  return (
    <>
      <div className="container">
        <h1>Posts Application</h1>

        <div className="soritngFilteringBox">
          <div>
            <label htmlFor="">Serach Post By Title</label>
            <input
              type="text"
              placeholder="title..."
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Sort by</label>
            <select name="" id="">
              <option value="">Title By Ascending Order</option>
              <option value="">Title By Descending Order</option>
              <option value="">userId By Ascending Order</option>
              <option value="">userId By Descending Order</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Select User Id</label>
            <select name="" id="">
              {posts &&
                posts.map((post) => (
                  <option key={post.id} value={post.userId}>
                    {post.userId}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="posts">
          {filteredPosts.map((post) => (
            <div className="card" key={post.id}>
              <div className="card-header">
                <h2>UserId : {post.userId}</h2>
                <h3>{post.title}</h3>
              </div>
              <div className="card-body">
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostList;
