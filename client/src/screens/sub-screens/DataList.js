import React, { useState, useEffect } from 'react';

export default function DataList({ loggedInUser, postType }) {
    return (
        <div className="my-posts">
           
            <ul className="post-list">
                <p>No post</p>
            </ul>
        </div>
    );
}