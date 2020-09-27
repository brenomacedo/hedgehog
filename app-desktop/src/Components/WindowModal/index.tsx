import React, { useContext, useEffect, useRef, useState } from 'react'
import WindowContext from '../../Contexts/WindowContext'
import './styles.css'

const WindowModal = () => {

    const [mouseIn, setMouseIn] = useState(true)

    useEffect(() => {
        boxRef.current?.addEventListener('mouseenter', e => {
            setMouseIn(true)
        })

        boxRef.current?.addEventListener('mouseleave', e => {
            setMouseIn(false)
        })

        modalRef.current?.addEventListener('click', e => {
            if(!mouseIn) {
                Window.setModalOpened && Window.setModalOpened(false)
            }
        })
    }, [mouseIn])

    const modalRef = useRef<HTMLDivElement>(null)
    const boxRef = useRef<HTMLDivElement>(null)

    const Window = useContext(WindowContext)

    return (
        <div ref={modalRef} className="windowModal">
            <div ref={boxRef} className="windowBox" style={{
                top: Window.offset.y,
                left: Window.offset.x
            }}>

            </div>
        </div>
    )
}

export default WindowModal