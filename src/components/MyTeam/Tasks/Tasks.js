import { Chip, Tooltip, Typography } from '@material-ui/core';
import { ClearRounded, SaveRounded, DeleteForeverRounded as DeleteOutlined } from '@material-ui/icons';
import React, {useState,useEffect} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import GetTasks from '../../../utils/GetTasks';
import GetTeamsList from '../../../utils/GetTeamsList';
import SaveTasks from '../../../utils/SaveTasks';
import FormDialog from '../../Dialog/Dialog';
import Loading from '../../Loading/Loading';
import { TasksContainer,Column,Header, Button, Delete} from './style';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;
let Role;
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: '10px 5px',
    margin: `0 0 ${grid}px 0`,
    borderRadius: '8px',
    fontWeight: 500,
    cursor: Role === 'admin' ? 'pointer':  '',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'whitesmoke',
    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: '100%',
    borderRadius: '8px',
    overflow: 'auto',
    maxHeight: '75vh'
});

const Tasks = ({teamId, role})=> {
  Role = role;
  const [open, setOpen] = React.useState(false);
  const [OpenDelete, setOpenDelete] = React.useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [UsersOptions, setUsersOptions] = React.useState([]);
    const [state , setState] = useState({
        Ideas: [],
        Todo: [],
        Done: [],
        Archived: [],
    })
    const [Changed , setChanged] = useState(false);
    const [ID , setID] = useState('');
    const [Data, setData] = React.useState({})

    useEffect(() => {     
        return () => {    
                setChanged(true);     
        }
    }, [state])

    useEffect(() => {
        const requist = async ()=>{
            setChanged(false);
            setIsLoading(true);
            const res = await GetTasks(teamId);
            const TheTeam = await GetTeamsList(teamId);
            const state = {};
            setID(res[0].id)
            setUsersOptions(TheTeam.members);
            res.forEach((r)=> {
                r.tasksArray.forEach((t)=> {

                    state[t.field] = t.tasks.map((ts, i)=> ({...ts, id: i+1}))
                })
            })
            setState((prev)=> ({
                ...prev,
                ...state
            }));
            setTimeout(() => {
                
                setChanged(false);
            }, 10);
        }
        requist();
        setIsLoading(false);
    }, [teamId])
    const handleSave = ()=>{
        if(Data.taskId){
            let targetField = state[Data.field];
            targetField = targetField.filter((c)=> c.id !== Data.taskId);
            targetField.push({...Data, id: Data.taskId});
            setState((prev)=> ({
                ...prev,
                [Data.field]: targetField
            }))

        } else {
            let Ideas = state.Ideas;
            Ideas.push({...Data, id: Ideas.length+1, field: 'Ideas'})
        }
        setOpen(false);
        setData({});
        setChanged(true);   
    } 
    const saveChanges = async ()=> {
        await SaveTasks(ID, teamId,state);
        setChanged(false)
    }
    const handleSaveDelete = async ()=> {
        let targetField = state[Data.field];
        targetField = targetField.filter((t)=> t.task !== Data.task)
        setState((prev)=> ({
            ...prev,
            [Data.field]: targetField
        }))
        setOpenDelete(false);
    }
    const updateTask = (user,task, taskId, field)=> {
        setData({user,task, taskId, field});
            setOpen(true);
    }
    const getList = id => state[id];

    const onDragEnd = result => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            let state;

            state = { [source.droppableId]: items }; 
            setState((prev)=> ({
                ...prev,
                ...state
            }));
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );
           setState((prev)=> ({
               ...prev,
               ...result
           }))
        }
    };

    const columns = [
        {id: 3,name: 'Ideas', header: 'Ideas'},
        {id: 1,name: 'Todo', header: 'Todo'},
        {id: 2,name: 'Done', header: 'Done'},
        {id: 4,name: 'Archived', header: 'Archived'},
    ]
    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
        return (<>
        {IsLoading ?  <Loading />  :  <DragDropContext onDragEnd={onDragEnd}>
                <div>
                <Header>
                   {role === 'admin' && <Button onClick={()=> setOpen(true)} >
                         <ClearRounded style={{transform: 'rotate(45deg)', transformOrigin: 'top'}} /> Create Task
                    </Button>}
                  {Changed &&  <Button onClick={saveChanges} >
                         <SaveRounded  /> Save
                    </Button>}
                </Header>
                <TasksContainer>
              {  columns.map((column, i)=> <Column key={i} >
                <Typography style={{fontWeight: 'bold'}} align='center' variant='h6' >{column.header}</Typography>
                <Droppable droppableId={column.name}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {state[column.name] &&  state[column.name].map((item, index) => (
                                <Draggable
                                    key={index}
                                    className='list-item'
                                    draggableId={item.task}
                                    index={index}
                                    >
                                    {(provided, snapshot) => (
                                        <div
                                            onClick={()=> {updateTask(item.user,item.task, item.id, column.name)}}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                                <div>

                                            {item.task}
                                            <br/>
                                            {item.user && <Tooltip title={item.user} >
                                                <Chip style={{margin: "9px 0 0"}} label={item.user[0]} />
                                            </Tooltip>}
                                            </div>
                                            <Delete onClick={(e)=> {
                                                setTimeout(() => {
                                                    setOpen(false);
                                                }, 2);                                        
                                                setOpenDelete(true)
                                            }} >
                                                <DeleteOutlined  color='error' />
                                            </Delete>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                </Column>
              )}
                </TasksContainer>
                </div>
                <FormDialog 
                    open={open}
                    setOpen={setOpen}
                    ID={ID}
                    usersOptions={UsersOptions}
                    Data={Data}
                    dialogHeader={'Create Task'}
                    saveLabel='Add'
                    setData={setData}
                    handleSave={handleSave}
                />
                <FormDialog 
                    open={OpenDelete}
                    setOpen={setOpenDelete}
                    ID={ID}
                    usersOptions={UsersOptions}
                    Data={Data}
                    saveLabel='Delete'
                    dialogHeader={'Create Task'}
                    confirm
                    confirmMsg="Are You Sure Want To Delete This Task ?"
                    setData={setData}
                    handleSave={handleSaveDelete}
                />
            </DragDropContext>}
       </> );
}

// Put the things into the DOM!
export default Tasks;