import { Container } from '@/components/Container'
import { Button } from './Button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import BabyModal from './BabyModal'
import { useState } from 'react'

export default function Babies () {
    const [babyModal, setBabyModal] = useState(false);



    return (
        <Container className='mx-auto'>
            <Button onClick={() => setBabyModal(true)} color="blue"><PlusCircleIcon className="h-10 w-10 flex-none " aria-hidden="true" /></Button>
            {babyModal && <BabyModal onClose= {() => setBabyModal(false)}/>}
        </Container>
    )
}