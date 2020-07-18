 import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal, ModalHeader, ModalBody, Label,Col,Row  } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len); 
const minLength = (len) => (val) => val && (val.length >= len);
    
    class CommentForm extends Component {
        constructor(props) {
            super(props);
            this.toggleModal= this.toggleModal.bind(this);
            this.handleLogin = this.handleLogin.bind(this);
            this.state= { isModelOpen:false};
        }
        toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen });
        }
        handleLogin(event) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, event.rating, event.author, event.comment);        }
        render(){
            return(  <div>
                <Button outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Submit Comments</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                   <LocalForm onSubmit={(values) => this.handleLogin(values)}>
              <Row className="form-group">
                  <Label htmlFor="rating" md={12}>Rating</Label>
                  <Col md={12}>
                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                            <option> 1 </option>
                            <option> 2 </option>
                            <option > 3 </option>
                            <option>4 </option>
                            <option> 5</option>
                    </Control.select>
                  </Col>
              </Row>
              <Row className="form-group">
                  <Label htmlFor="author" md={12}>Your Name</Label>
                  <Col md={12}>
                      <Control.text model=".author" id="author" className="form-control"
                              name="author" placeholder="Your Name"
                              validators={{
                                  required, 
                                  minLength: minLength(3),
                                  maxLength: maxLength(15)
                              }} />
                      <Errors className="text-danger" model=".author"
                              show="touched"
                              messages={{
                                  required: 'Required ',
                                  minLength: 'Must be greater than 2 characters ',
                                  maxLength: 'Must be 15 characters or less'
                              }}
                          />
                  </Col>
                 </Row>
              <Row className="form-group">
                  <Label htmlFor="comment" md={12}>Comment</Label>
                  <Col md={12}>
                      <Control.textarea model=".comment" id="comment" 
                              className="form-control"
                              name="comment" rows="6"
                                />
                  </Col>
              </Row>
              <Row className="form-group">
                  <Col md={{size: 10}}>
                      <Button type="submit" color="primary">Submit</Button>
                  </Col>
              </Row>
            </LocalForm>
                    </ModalBody>
                </Modal>
                </div>
             );
        }
    }

    function RenderComments({comments, addComment, dishId}) {
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
                <CommentForm dishId={dishId} addComment={addComment} />
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
              if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        
        else if (props.dish != null) {
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
                <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
            </div>
          </div>
        )
        }

    }


export default DishDetail