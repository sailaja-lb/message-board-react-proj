import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {BsFileEarmarkPlus, BsXCircleFill} from "react-icons/bs";

export default function ThreadInput({thread, onThreadChange, onCancel, onApply}) {
    const {title, date} = thread

    return <Card>
        <Card.Header>
            <Row className='align-items-center'>
                <Col xs='auto'>
                    <Button title='Apply' variant={"outline-success"} size='sm'
                            onClick={onApply}>
                        <BsFileEarmarkPlus/>
                    </Button>
                </Col>
                <Col xs='auto'>
                    <Button title='Cancel' variant={"outline-danger"} size='sm'
                            onClick={onCancel}>
                        <BsXCircleFill/>
                    </Button>
                </Col>
                <Col xs='auto'>
                    <Form.Control type='date' placeholder='Date'
                                  defaultValue={date.toISOString().substring(0, 10)}
                                  onChange={e => onThreadChange({...thread, date: new Date(e.target.value)})}/>
                </Col>
            </Row>
        </Card.Header>
        <Card.Body>
            <Form.Control as="textarea" rows={2} placeholder='Title'
                          defaultValue={title}
                          onChange={e => onThreadChange({...thread, title: e.target.value})}/>
        </Card.Body>
    </Card>
}