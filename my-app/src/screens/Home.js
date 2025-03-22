import useNavigation from '../modules/useNavigation.js';

export default function Home() {
    const { goToThread } = useNavigation();

   const mockUp = [
        { threadId: 1, threadTitle: "Why is math hard" },
        { threadId: 2, threadTitle: "English why" },
        { threadId: 3, threadTitle: "Why am I stupid theory" }
    ];


    return (
        <div className="offset">
            <h1>Home</h1>
            <ul>
                {mockUp.map(thread => (
                    <li key={thread.threadId}>
                        <div onClick={() => goToThread(thread.threadId)}>
                            <h3>{thread.threadTitle}</h3>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
