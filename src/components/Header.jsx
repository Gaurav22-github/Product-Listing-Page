import React, { useContext } from 'react';
import Container from './Container';
import { Link } from 'react-router-dom';
import { Context } from '../context/Main';

export default function Header() {
    const  {cart}  = useContext(Context);
    console.log(cart)
    return (
        <header className='shadow py-2 bg-white sticky top-0'>
            <Container className="flex justify-between">
                <h1 className='text-3xl font-bold'>Myproducts</h1>
                <ul className='flex gap-2'>
                    <li>
                        <Link>Store</Link>
                    </li>
                    <li>
                        <Link>Cart ({cart.length})</Link>
                    </li>
                </ul>
            </Container>
        </header>
    )
}
