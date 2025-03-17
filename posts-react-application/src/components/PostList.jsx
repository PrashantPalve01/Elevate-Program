import React, { useEffect, useState } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [uniqueUserIds, setUniqueUserIds] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      const data = await response.json();
      setPosts(data);

      const userIds = [...new Set(data.map((post) => post.userId))];
      setUniqueUserIds(userIds);
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
    const matchesTitle = post.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());
    const matchesUser =
      selectedUserId == "" || post.userId == parseInt(selectedUserId);
    return matchesTitle && matchesUser;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption == "titleAsc") {
      return a.title.localeCompare(b.title);
    } else if (sortOption == "titleDesc") {
      return b.title.localeCompare(a.title);
    } else if (sortOption == "userIdAsc") {
      return a.userId - b.userId;
    } else if (sortOption == "userIdDesc") {
      return b.userId - a.userId;
    }
    return 0;
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h2>Something went wrong to fetch data. Please try again</h2>;
  }

  return (
    <>
      <div className="container">
        <h1>Posts Application</h1>

        <div className="soritngFilteringBox">
          <div>
            <label htmlFor="searchTitle">Search Post By Title</label>
            <input
              id="searchTitle"
              type="text"
              placeholder="title..."
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sortBy">Sort by</label>
            <select
              id="sortBy"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">No Sorting</option>
              <option value="titleAsc">Title By Ascending Order</option>
              <option value="titleDesc">Title By Descending Order</option>
              <option value="userIdAsc">userId By Ascending Order</option>
              <option value="userIdDesc">userId By Descending Order</option>
            </select>
          </div>
          <div>
            <label htmlFor="userIdFilter">Select User Id</label>
            <select
              id="userIdFilter"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">All Users</option>
              {uniqueUserIds.map((userId) => (
                <option key={userId} value={userId}>
                  {userId}
                </option>
              ))}
            </select>
          </div>
        </div>

        {sortedPosts.length === 0 ? (
          <h2>No Posts Available</h2>
        ) : (
          <div className="posts">
            {sortedPosts.map((post) => (
              <div className="card" key={post.id}>
                <div className="card-header">
                  <h2>UserId: {post.userId}</h2>
                  <h3>{post.title}</h3>
                </div>
                <div className="card-body">
                  <p>{post.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PostList;
