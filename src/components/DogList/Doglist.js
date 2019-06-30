import React from 'react'
import Dog from '../Dog/Dog'

export default function Botlist(props){
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around'
            }}>
            {props.dogs.map(dog => {
                return <Dog 
                key={dog.id}
                dog={dog}
                delete={props.delete} />
            })}
        </div>
    )
}