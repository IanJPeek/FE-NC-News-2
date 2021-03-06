import React from 'react'
import { Link } from '@reach/router'

export default function TopicsCards({topic}) {
    return (
        <div className="topicsCardsBoxes">
            <h2>{topic.slug}</h2>
            <h3>{topic.description}</h3>
            <Link to={`/topics/${topic.slug}/articles`}>
            <button className="topicCardButtons">Take me to {topic.slug} articles</button>
            </Link>
        </div>
    )
}
