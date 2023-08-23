import React from 'react'
import { Container,Col,Row } from 'reactstrap'
import useGetData from '../../custom-hooks/useGetData'
import Img from '../LazyLoadImage/Img';
import { deleteDoc,doc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';


const Users = () => {
    const {data:usersData,loading} = useGetData('users');
    const deleteUser = async(id)=>{
        deleteDoc(doc(db,'users',id))
        toast.info('user removed successfully!')
    }
  return (
    <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <h4 className='mb-5 fw-bold'>Users</h4>
                </Col>
                <Col lg='12'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                usersData?.map((user)=><>
                            <tr key={user.uid}>
                                <td><Img src={user.photoURL} className='rounded-circle'/></td>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td><button className='btn btn-danger' onClick={()=>deleteUser(user.uid)}>Remove</button></td>
                            </tr>
                                
                                </>)
                            }
                 
                   
                        </tbody>

                    </table>
                
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Users