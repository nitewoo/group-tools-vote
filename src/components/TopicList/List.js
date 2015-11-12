import React from 'react'
import {
  FlatButton,
  RaisedButton
} from 'material-ui'
import {
  Card,
  CardActions,
  CardExpandable,
  CardHeader,
  CardMedia,
  CardText,
  CardTitle
} from 'material-ui/lib/card'


class TopicList extends React.Component {
  render() {
    const list = this.props.list
    const sc = this.style.locals

    return (
      <div>
        {list.map(topic => (
          <Card className={sc['topic-card']} key={topic.id}>
            <CardTitle title={topic.title} subtitle={topic.date}/>
            <CardActions>
              <RaisedButton label="check it out" primary={true} />
              <FlatButton label="maintain"/>
            </CardActions>
            <CardText>{topic.description}</CardText>
          </Card>
        ))}
      </div>
    )
  }

  componentWillMount() {
    // load module style
    this.style = require('./style.scss').ref()
  }

  componentWillUnmount() {
    // unload module style
    this.style.unref()
  }
}

export default TopicList