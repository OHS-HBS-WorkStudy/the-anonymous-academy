import useNavigation from '../modules/useNavigation.js';

export default function Threads({thread}) {
    const { goToThread } = useNavigation();

    return(
        <div className="grid-item" onClick={() => goToThread(thread.threadId)}>

            <div className="left-info">
                <div className="date-display"><p>Mar. 20 2025</p></div>

                <div className="vote-container">
                    <div className="vote-counter"><p>0</p></div>
                    <p className="vote-text">votes</p>
                </div>

                <div className="replies-container">
                    <div className="replies-counter"><p>0</p></div>
                    <p className="replies-text">replies</p>
                </div>
            </div>

            <div className="grid-item-content"> 
                <div className="grid-item-title">
                    {thread.threadTitle}
                </div>
                <div className="grid-item-desc">
                    {thread.threadDescr}
                </div>
                <div className="grid-item-tags-container">

                        {/* {threadGetTag()} */}
                </div>
            </div>
        </div>
    );
}
