import { Container, Flex, Heading, List, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import TodoItems from './TodoItems'
import { useStateValue} from './StateProvider'
import {db} from './firebase'
import AddTODO from './AddTODO'

function TODOS() {
  
  const[{user}] = useStateValue()
  const[id,setId] = useState('')

  // User ID from Firebase
  console.log(user.multiFactor.user.uid)

  // User ID From Product

  const[players,setPlayers] = useState([])
  const[team,setTeam] = useState([])

  // Fetching data from Firebase

useEffect(()=>{
  players.map(playerData =>{
    setId(playerData.userId)
  })
})

  useEffect(()=>{

    // Getting data for the first todo list

    db.collection('todos').get()
    .then(snapshot =>{
      if(snapshot.docs.length > 0){
        snapshot.docs.forEach(doc =>{
          setPlayers(prev =>{
            return [...prev,doc.data()]
          })
        })
      }
    })


    // Getting data for the second todo list

    db.collection('todo2').get()
    .then(snapshot =>{
      if(snapshot.docs.length > 0){
        snapshot.docs.forEach(doc =>{
          setTeam(prev =>{
            return [...prev,doc.data()]
          })
        })
      }
    })

    
  },[])


  
  const [{isOver},addToTeamRef] = useDrop({
    accept:"player",
    collect: (monitor)=>({isOver: !!monitor.isOver() })
  })

  const [{isOver: isPlayerOver},removeFromTeamRef] = useDrop({
    accept:"team",
    collect: (monitor)=>({isOver: !!monitor.isOver() })
  })

  const movePlayerFromTeam = (item)=>{
    console.log(item)
    setPlayers(prev => prev.filter((_,i)=> i !== item.index))
    setTeam(prev => [...prev,item])
  }

  const removePlayerFromTeam = item =>{
    console.log(item)
    setTeam(prev => prev.filter((_,i)=> i !== item.index))
    setPlayers(prev => [...prev,item])
  }

  return (
    <Container maxW="800px">
      <div style={{display:'flex',justifyContent:'center'}}>
      <AddTODO/>
      </div>
      <Flex justifyContent='space-between' height='90vh' align='center'>
      <Stack width="300px">
        <Heading fontSize='3xl' color='yellow.800' textAlign='center' style={{marginTop:"300px"}}>
          Task List 1
        </Heading>
        <List p='4' minH='70vh' boxShadow='xl' borderRadius='md' ref={removeFromTeamRef}>
        {
          players.map((e,i)=> <TodoItems key={e.title} item={e} type='player' index={i} onDropPlayer={movePlayerFromTeam}/>)
        }
        </List>
      </Stack>
      <Stack width="300px">
      <Heading fontSize='3xl' color='teal.800' textAlign='center' style={{marginTop:"300px"}}>
          Task List 2
        </Heading>
        <List p='4' minH='70vh' boxShadow='xl' borderRadius='md' ref={addToTeamRef}>
        {
          team.map((e,i)=> <TodoItems key={e.name} item={e} type='team' index={i} onDropPlayer={removePlayerFromTeam}/>)
        }
        </List>
      </Stack>
      </Flex>
    </Container>
  )
}

export default TODOS