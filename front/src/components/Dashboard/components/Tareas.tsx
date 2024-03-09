import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    TextField,
    Box,
    Paper,
    Typography,
    Container,
    Grid,
    MenuItem,
    CircularProgress
} from '@mui/material';
import { URL_SERVER_API } from '../../../config/serverApi';
import { useNavigate } from 'react-router-dom';

const Tareas: React.FC = () => {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [newTaskData, setNewTaskData] = useState({ titulo: '', descripcion: '', id_estado: '' });
    const [availableStates, setAvailableStates] = useState<TaskState[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const initComponent = async () => {
        await getEstados();
        await getTasks();
    }

    const getTasks = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<any[]>(URL_SERVER_API + 'estados', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAvailableStates(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
            setLoading(false)
        }
    };

    const getEstados = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Task[]>(URL_SERVER_API + 'tareas', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    }

    const handleEditClick = (task: Task) => {
        setSelectedTask(task);
        setNewTaskData({
            titulo: task.titulo,
            descripcion: task.descripcion,
            id_estado: task.id_estado,
        });
        setShowModal(true);
    };

    const handleUpdateTask = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${URL_SERVER_API}tareas/${selectedTask?.id}`, newTaskData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowModal(false);
            setNewTaskData({ titulo: '', descripcion: '', id_estado: '' });
            const response = await axios.get<Task[]>(URL_SERVER_API + 'tareas', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data);
            setSelectedTask(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error al editar la tarea:', error);
        }
    };

    const handleDeleteClick = async (taskId: number) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${URL_SERVER_API}tareas/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
            setSelectedTask(null);
            setLoading(false);
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            setLoading(false);
        }
    };

    const handleCreateTask = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(URL_SERVER_API + 'tareas', newTaskData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowModal(false);
            setNewTaskData({ titulo: '', descripcion: '', id_estado: '' });
            const response = await axios.get<Task[]>(URL_SERVER_API + 'tareas', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data);
            setSelectedTask(null);
        } catch (error) {
            console.error('Error al crear la tarea:', error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewTaskData({ ...newTaskData, [name]: value });
    };

    const onCloseModal = () => {
        setSelectedTask(null);
        setShowModal(false)
        setNewTaskData({ titulo: "", descripcion: "", id_estado: "" });
    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login")
    }

    useEffect(() => {
        initComponent();
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom>Tareas</Typography>
            <Button variant="contained" onClick={() => setShowModal(true)}>Crear Tarea</Button> &nbsp;
            <Button variant="contained" onClick={() => logout()}>Cerrar Sesión</Button>

            <div style={{ position: 'relative', top: 20 }}>

                {loading ? (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant='h4'>
                            Cargando
                        </Typography>
                        <CircularProgress size={40} color="primary" />
                    </Box>
                ) : <TableContainer component={Paper}>
                    <Table>
                        <TableHead style={{ backgroundColor: '#05f096' }}>
                            <TableRow>
                                <TableCell>Titulo</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map(task => (
                                <TableRow key={task.id}>
                                    <TableCell>{task.titulo}</TableCell>
                                    <TableCell>{task.descripcion}</TableCell>
                                    <TableCell>
                                        {availableStates.find((stateData) => stateData.id === parseInt(task.id_estado))?.nombre_estado}
                                    </TableCell>
                                    <TableCell>
                                        <Button color='primary' onClick={() => handleEditClick(task)} variant="contained">Editar</Button> &nbsp;
                                        <Button color='error' onClick={() => handleDeleteClick(task.id)} variant="contained">Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}


            </div>


            <Modal open={showModal} onClose={() => onCloseModal()}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h4" gutterBottom>Crear/Editar Tarea</Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="Titulo" name="titulo" value={newTaskData.titulo} onChange={handleInputChange} fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                label="Estado"
                                name="id_estado"
                                value={newTaskData.id_estado}
                                onChange={handleInputChange}
                                fullWidth
                            >
                                {availableStates.map((state) => (
                                    <MenuItem key={state.id} value={state.id}>
                                        {state.nombre_estado}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descripción"
                                name="descripcion"
                                value={newTaskData.descripcion}
                                onChange={handleInputChange}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>

                    <Button onClick={() => {
                        selectedTask ? handleUpdateTask() : handleCreateTask()
                    }
                    } variant="contained" sx={{ mr: 2, mt: 2 }}>Guardar</Button>
                    <Button onClick={() => onCloseModal()} variant="contained" sx={{ mt: 2 }}>Cancelar</Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default Tareas;