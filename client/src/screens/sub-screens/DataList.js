import React, { useState, useEffect } from 'react';

export default function DataList({ loggedInUser, postType }) {
    return (
        <div className="my-posts">
            <h2>Your {postType.charAt(0).toUpperCase() + postType.slice(1)}</h2>
            <ul className="post-list">
                <p>No post</p>
            </ul>
        </div>
    );
}