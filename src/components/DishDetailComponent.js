 import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label  } from 'reactstrap';
import { Link } from 'react-router-dom';
    
    class CommentForm extends Component {
        constructor(props) {
            super(props);
            this.toggleModal= this.toggleModal.bind(this);
            this.handleLogin = this.handleLogin.bind(this);
            this.state= { isModelOpen:false };
        }
        toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen });
        }
        handleLogin(event) {
        this.toggleModal();
        alert("Your Name: " + this.username.value + "Rating : " + this.rating.value +
             "Comments: " + this.comment.value);
        event.preventDefault();
        }
        render(){
            return(  <div>
                <Button outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Submit Comments</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleLogin} >
                            <FormGroup>
                                <Label for="rating">Rating</Label>
                                <Input type="select" name="rating" id="rating"
                                innerRef={(input) => this.rating= input}
                                 >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="username">Your Name</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input}
                                    placeholder="Your Name" />
                            </FormGroup>
                            <FormGroup >
                                    <Label htmlFor="comment">Comment </Label>
                                    <Input rows="6" type="textarea" id="comment" name="comment"
                                    innerRef={(input)=> this.comment=input}
                                    placeholder="comment" />
                            </FormGroup>
            
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                </div>
             );
        }
    }

    function RenderComments({comments}) {
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
                < CommentForm />
            </div>
        )
    }
    function RenderDish({dish}) {
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
    const DishDetail=(props) => {
        
        if (props.dish == null) {
            return (<div></div>)
        }
        return (
          <div className="container">
           <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
            <div className='row'>
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} />
            </div>
          </div>
        )
    }


export default DishDetail