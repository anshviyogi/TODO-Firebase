import { ListItem } from '@chakra-ui/react'
import React from 'react'
import { useDrag } from 'react-dnd'

function TodoItems({item,type,index,onDropPlayer}) {
    console.log(index)
    const [{isDraggable},dragRef] = useDrag({
        type:type,
        item: ()=> ({...item,index}),
        end: (item,monitor)=> {
            const dropResult = monitor.getDropResult();

            if(dropResult && item){
                onDropPlayer(item)
            }
        },
        collect: (monitor)=> ({
            isDragging: monitor.isDragging()
        })
    })

  return (
    <ListItem p='2' borderRadius='md' boxShadow='md' mb='2' ref={dragRef}>
        <div className='line-one' style={{display:"flex",justifyContent:"space-between"}}>
            <p style={{backgroundColor:"lightgray",padding:"2px",borderRadius:"5px"}}>#{index + 1}</p>
        <h1 style={{fontWeight:"800"}}>{item.title}</h1>
        <span style={{marginLeft:"10px",backgroundColor:"lightblue",padding:"2px",borderRadius:"5px",fontSize:"14px"}}>Due Date : {item.date}</span>
        </div>
        <p>{item.description}</p>
        </ListItem>
  )
}

export default TodoItems