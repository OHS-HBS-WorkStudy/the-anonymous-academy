import useNavigation from '../modules/useNavigation.js';

export default function Threads({thread}) {
    const { goToThread } = useNavigation();


    return (
        <div className="grid-item" onClick={() => goToThread(thread.thread_id)}>
            <div className="user-header">
                <div className="user-avatar"></div>
                <p className="username">Anonymous Student</p>
                <p className="date-display">Mar 20 2025 at 2:30 PM</p>
            </div>

            <div className="content-row">
                <div className="left-info">
                    <div className="vote-container">
                        <div className="vote-counter">
                            <p>0</p>
                        </div>
                        <p className="vote-text">votes</p>
                    </div>

                    <div className="replies-container">
                        <div className="replies-counter">
                            <p>0</p>
                        </div>
                        <p className="replies-text">replies</p>
                    </div>

                    <div className="views-container">
                        <div className="views-counter">
                            <p>0</p>
                        </div>
                        <p className="views-text">views</p>
                    </div>
                </div>

                <div className="text-content">
                    <div className="grid-item-title">
                        {thread.thread_name}
                    </div>
            
                    <div className="grid-item-desc">
                        {thread.thread_contents}
                    </div>
                    <div className="grid-item-tags-container">
                        <div className='grid-item-tags'>
                            <p>#NoTags</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}