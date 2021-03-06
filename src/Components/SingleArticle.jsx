import React, { Component } from 'react'
import { getArticle } from '../api'
import CommentsList from './CommentsList'
import CommentToggle from './CommentToggle'
import Votes from './Votes'
import moment from 'moment' 
import ErrorDisplay from './ErrorDisplay'

export default class ArticleSingle extends Component {
    state = {
        article :[],
        isLoading : true,
        err: null
    }

    render() {
        const {article, isLoading, err} = this.state
        if (isLoading) return <p>Loading...</p>
        if (err) return <ErrorDisplay {...err} />
        return (
            <div className="singleArticleFullBox">
                <div className="singleArticleBodyBox">
                <main className="singleArticleBody">
                    <h2>{article.title}</h2>
                    <p className="singleArticleSmallText">{moment(article.created_at).format("MMM Do YYYY")}</p>
                    <p className="singleArticleSmallText">Created by : {article.author}</p>
                    <h3>{article.body}</h3>
                </main>
                <Votes article_id={article.article_id}votes={article.votes}/>
                </div>
                <CommentToggle hideMessage="Hide Comments" showMessage="View comments">
                    <CommentsList article_id={this.props.article_id}/>
                </CommentToggle>
            </div>
        )
    }

    componentDidMount() {
        return getArticle(this.props.article_id)
        .then((article) => {
            this.setState({
                article : article,
                isLoading: false
            })
        })
        .catch((err) => {
            this.setState({
                err : {status : err.response.status, msg : err.response.data.msg},
                isLoading: false
            })
        })
    }
}
