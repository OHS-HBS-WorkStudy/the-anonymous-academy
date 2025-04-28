import DataList from "./DataList";

export default function Activity() {
    return(
        <>
        <div className="activity">
          <div className="user-info-column">
            <div className="account-content">

                <div className="my-recent-tags">
                  <h2>Recent Tags</h2>
                  <div className="recent-tags">
                    <ul>
                    </ul>
                    </div>
                </div>

                <div className="my-trending">
                  <h2>Trending Threads</h2>
                  <div className="recent-threads">
                    <ul>
                    </ul>
                    <div></div>
                  </div>
                </div>

                <div className='my-trending-comments'> 
                  <h2>Trending Comments</h2>

                  <div className="latest-posts">
                    <ul>
                    </ul>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="other-content">

            <div className="my-data-list">
                  <h2>Activity List</h2>
                  <DataList />
                </div>
            </div>
          </div>
        </>
    );
}