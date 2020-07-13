// import React, { Component } from 'react';
// import {Card,CardImg,CardTitle,CardBody,CardText} from 'reactstrap';
// class DishDetailComponent extends Component {
//   renderComment(comments) {

//   }
// 	render() {
//     const dish = this.props.dish
// 		const commentlist = dish.comments.map((comments) => {
//             return (
//               <div>
//               	<p> {comments.comment} </p>
//               	<p>--{comments.author}, {new Intl.DateTimeFormat('en-US',
//               						 { year: 'numeric', month: 'short', day: '2-digit'})
//               					.format(new Date(Date.parse(comments.date)))}</p>
//               </div>
//             );
//         });

// 		return ( 
// 		<div className="row">
// 			   <div  className="col-12 col-md-5 m-1" >
// 				         <Card>
//                     <CardImg top src={dish.image} alt={dish.name} />
//                     <CardBody>
//                       <CardTitle>{dish.name}</CardTitle>
//                       <CardText>{dish.description}</CardText>
//                     </CardBody>
//              	</Card>
//          </div>
//              <div  className="col-12 col-md-5 m-1" >
//              	<h4> Comments </h4>
//              	<ul className="list-unstyled">{commentlist}</ul>
//              </div>
//     </div>
// 		 );
// 	}
// }
// export default DishDetailComponent;
 import React, { Component } from 'react';
 import {Card,CardImg,CardTitle,CardBody,CardText} from 'reactstrap';
class DishDetailComponent extends Component {

    renderComments(comments) {
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-sm-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>

            </div>
        )
    }
    renderDish(dish) {
        if (dish != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>

            )
        }
        else {
            return (<div></div>)
        }
    }
    render() {
        const dish = this.props.dish
        if (dish == null) {
            return (<div></div>)
        }
        const dishItem = this.renderDish(dish)
        const commentItem = this.renderComments(dish.comments)
        return (
          <div className="container">
            <div className='row'>
                {dishItem}
                {commentItem}
            </div>
          </div>
        )
    }
}

export default DishDetailComponent