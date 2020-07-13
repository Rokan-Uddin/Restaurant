import React, { Component } from 'react';
import {Card,CardImg,CardTitle,CardBody,CardText} from 'reactstrap';
class DishDetailComponent extends Component {
	render() {
		const commentlist = this.props.dish.comments.map((comments) => {
            return (
              <div>
              	<p> {comments.comment} </p>
              	<p>--{comments.author}, {new Intl.DateTimeFormat('en-US',
              						 { year: 'numeric', month: 'short', day: '2-digit'})
              					.format(new Date(Date.parse(comments.date)))}</p>
       
              </div>
            );
        });

		return ( 
		<div className="row">
			<div  className="col-12 col-md-5 m-1" >
				<Card>
                    <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                      <CardTitle>{this.props.dish.name}</CardTitle>
                      <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
             	</Card>
             </div>
             <div  className="col-12 col-md-5 m-1" >
             	<h4> Comments </h4>
             	
             	<ul className="list-unstyled">{commentlist}</ul>
             </div>
         </div>
		 );
	}
}
export default DishDetailComponent;