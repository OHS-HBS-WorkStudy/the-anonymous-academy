
export default function Activity() {
    return(
        <>
        <div className="activity">
          <div className="account-content">
            <div className="my-trending">
            <h2>My Trending Threads</h2>
            <div className="recent-threads">
              <ul>
              </ul>
              <div></div>
            </div>
            </div>
            <div className='my-trending-comments'> 
            <div className="latest-posts">
              <h2>My Trending Comments</h2>
              <ul>
              {/* {latestPosts.map((post, index) => (
                <li key={index}>
                <a href={post.link}>{post.content}</a>
                </li>
              ))} */}
              </ul>
              <div></div>
            </div>
            </div>
            <div>
            <div className="my-recent-tags">
              <h2>Recent Tags</h2>
              <div className="recent-tags">
              <ul>
              </ul>
              </div>
            </div>
            </div>
          </div>
          </div>
        </>
    );
}