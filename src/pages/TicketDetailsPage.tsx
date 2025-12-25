//מציג פרטים מלאים על טיקט + תגובות + אפשריות עדכון

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTicketByID, updateTicket } from "../services/ticketService";
import { CommentList } from "../components/CommentList";
import type { ticket } from "../types/Ticket";
import type { comment } from "../types/Comment";
import type { status } from "../types/Status";
import { ClipLoader } from "react-spinners";
import Select from "react-select";
import {  useAuth } from "../context/AuthContext";
import { getComments, createComment } from "../services/commentService";
import type { user } from "../types/User";
import TicketDetailsCard from "../components/TicketDetailsCard";
import type { priority } from "../types/Priority";
import toast from 'react-hot-toast';

export function TicketDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [ticket, setTicket] = useState<ticket | null>(null);
    const [comments, setComments] = useState<comment[]>([]); // Initialize with empty array
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState<status | null>(null);
    const user = useAuth().user;
    const [statusOptions, setStatusOptions] = useState<status[]>([]); // רשימת הסטטוסים
    const [agentOptions, setAgentOptions] = useState<user[]>([]);
    const [priorityOptions, setPriorityOptions] = useState<priority[]>([]);
    const [agent, setAgent] = useState<user | null>(null);
    const [priority, setPriority] = useState<priority | null>(null);


   useEffect(() => {
        const loadAllData = async () => {
            if (!id) return;

            setLoading(true);
            try {
                // טוען סטטוסים תמיד
                const statusesPromise = fetch('http://localhost:4000/statuses', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }).then(res => {
                    if (!res.ok) throw new Error('Failed to load statuses');
                    return res.json();
                });

                const prioritiesPromise = fetch('http://localhost:4000/priorities', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }).then(res => {
                    if (!res.ok) throw new Error('Failed to load priorities');
                    return res.json();
                });

                // טוען users רק אם המשתמש הוא admin
                const usersPromise = user?.role === 'admin' 
                    ? fetch('http://localhost:4000/users', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                    }).then(res => {
                        if (!res.ok) throw new Error(`Failed to load users! status: ${res.status}`);
                        return res.json();
                    })
                    : Promise.resolve([]);

                const [statusesData, usersData, prioritiesData] = await Promise.all([
                    statusesPromise,
                    usersPromise,
                    prioritiesPromise
                ]);

                // מעדכן את הסטטוסים וה-agents
                setStatusOptions(statusesData);
                if (user?.role === 'admin') {
                    const agentsOnly = usersData.filter((u: user) => u.role === 'agent');
                    setAgentOptions(agentsOnly);
                }
                setPriorityOptions(prioritiesData);

                // טוען את הטיקט והתגובות במקביל
                const [ticketData, commentsData] = await Promise.all([
                    getTicketByID(Number(id)),
                    getComments(Number(id))
                ]);

                setTicket(ticketData);
                setComments(commentsData);

                // מגדיר את הסטטוס הנוכחי
                if (ticketData && statusesData.length > 0) {
                    const currentStatus = statusesData.find(
                        (s: status) => s.id === ticketData.status_id
                    );
                    setSelectedOption(currentStatus || null);
                }

                // מגדיר את ה-agent הנוכחי (רק עבור admin)
                if (user?.role === 'admin' && ticketData?.assigned_to && usersData.length > 0) {
                    const agentsOnly = usersData.filter((u: user) => u.role === 'agent');
                    const currentAgent = agentsOnly.find(
                        (a: user) => a.id === ticketData.assigned_to
                    );
                    setAgent(currentAgent || null);
                }

            } catch (error) {
                console.error('Failed to load data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAllData();
    }, [id, user?.role]); // תלות גם ב-role של המשתמש



    const handleAddComment = async (comment: comment) => {
        try{
            await createComment(Number(id), comment);
            const updateComments = await getComments(Number(id));
            setComments(updateComments);
            toast.success('Comment added successfully!', {
                style: {
                    background: 'linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)',
                    color: '#000',
                    border: '3px solid #00d9ff',
                    boxShadow: '0 0 30px rgba(0, 217, 255, 0.8), 0 0 60px rgba(0, 255, 136, 0.4)',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    animation: 'bounce 0.5s ease-in-out'
                },
                iconTheme: {
                    primary: '#000',
                    secondary: '#00ff88'
                }
            });
        }
        catch(error){
            console.error(error + ' Failed to add comment');
            toast.error('Error adding comment', {
                style: {
                    background: 'linear-gradient(135deg, #ff006e 0%, #ff1744 100%)',
                    color: '#fff',
                    border: '3px solid #ff006e',
                    boxShadow: '0 0 30px rgba(255, 0, 110, 0.8), 0 0 60px rgba(255, 23, 68, 0.4)',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    animation: 'shake 0.5s ease-in-out'
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#ff006e'
                }
            });
        }
    };

    const handleUpdateTicketStatus = async (newStatus: number) => {
        if(!ticket){
            console.error('Ticket is null');
            return;
        }
       try {
            // await updateTicket(ticket.id, { ...ticket, status_id: newStatus });
            await updateTicket(ticket.id, { status_id: newStatus });

            const updatedTicket = await getTicketByID(ticket.id);
            setTicket(updatedTicket);
            toast.success('Status updated successfully!', {
                style: {
                    background: 'linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)',
                    color: '#000',
                    border: '3px solid #00d9ff',
                    boxShadow: '0 0 30px rgba(0, 217, 255, 0.8), 0 0 60px rgba(0, 255, 136, 0.4)',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    animation: 'bounce 0.5s ease-in-out'
                },
                iconTheme: {
                    primary: '#000',
                    secondary: '#00ff88'
                }
            });
        } catch (error) {
            console.error('Failed to update ticket status:', error);
            toast.error('Error updating status', {
                style: {
                    background: 'linear-gradient(135deg, #ff006e 0%, #ff1744 100%)',
                    color: '#fff',
                    border: '3px solid #ff006e',
                    boxShadow: '0 0 30px rgba(255, 0, 110, 0.8), 0 0 60px rgba(255, 23, 68, 0.4)',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    animation: 'shake 0.5s ease-in-out'
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#ff006e'
                }
            });
        }
    };

    const handleUpdateTicketPriority = async (newPriority: priority) => {
        if(!ticket){
            console.error('Ticket is null');
            return;
        }
        try {
            // await updateTicket(ticket.id, { ...ticket, priority_id: newPriority.id });
            await updateTicket(ticket.id, { priority_id: newPriority.id });
            const updatedTicket = await getTicketByID(ticket.id);
            setTicket(updatedTicket);
            toast.success('Priority updated successfully!', {
                style: {
                    background: 'linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)',
                    color: '#000',
                    border: '3px solid #00d9ff',
                    boxShadow: '0 0 30px rgba(0, 217, 255, 0.8), 0 0 60px rgba(0, 255, 136, 0.4)',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    animation: 'bounce 0.5s ease-in-out'
                },
                iconTheme: {
                    primary: '#000',
                    secondary: '#00ff88'
                }
            });
        } catch (error) {
            console.error('Failed to update ticket priority:', error);
            toast.error('Error updating priority', {
                style: {
                    background: 'linear-gradient(135deg, #ff006e 0%, #ff1744 100%)',
                    color: '#fff',
                    border: '3px solid #ff006e',
                    boxShadow: '0 0 30px rgba(255, 0, 110, 0.8), 0 0 60px rgba(255, 23, 68, 0.4)',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    animation: 'shake 0.5s ease-in-out'
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#ff006e'
                }
            });
        }
    }

    const handleAssignAgent = async (agentId: number) => {
        if(!ticket){
            console.error('Ticket is null');
            return;
        } 
       try {
            const updatedTicket = { ...ticket, assigned_to: agentId };
            await updateTicket(ticket.id, updatedTicket);
            setTicket(updatedTicket);
            toast.success('Agent updated successfully!', {
                style: {
                    background: 'linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)',
                    color: '#000',
                    border: '3px solid #00d9ff',
                    boxShadow: '0 0 30px rgba(0, 217, 255, 0.8), 0 0 60px rgba(0, 255, 136, 0.4)',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    animation: 'bounce 0.5s ease-in-out'
                },
                iconTheme: {
                    primary: '#000',
                    secondary: '#00ff88'
                }
            });
        } catch (error) {
            console.error('Failed to assign agent:', error);
            toast.error('Error updating agent', {
                style: {
                    background: 'linear-gradient(135deg, #ff006e 0%, #ff1744 100%)',
                    color: '#fff',
                    border: '3px solid #ff006e',
                    boxShadow: '0 0 30px rgba(255, 0, 110, 0.8), 0 0 60px rgba(255, 23, 68, 0.4)',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    animation: 'shake 0.5s ease-in-out'
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#ff006e'
                }
            });
        }
    }

    const handleChange = async (status: status |null) => {
        if(!status || !ticket)
            return;
        setSelectedOption(status);
        console.log("Status changed to:", status.id);

        await handleUpdateTicketStatus(status.id);
    };

    const canEditTicket = () => {
    if (!user || !ticket) return false;
    
    if (user.role === 'admin') return true;
    
    if (user.role === 'agent' && ticket.assigned_to === user.id) return true;
    
    return false;
};

    return (
        <div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}><ClipLoader size={50} color="#00d9ff" /></div>
            ) : (
                <div>
                    <h1>Ticket Details</h1>
                    {ticket && <TicketDetailsCard ticket={ticket} />}

                    {(user && canEditTicket()) && (
                        <div className="form-container" style={{ marginTop: '2em' }}>
                            <h3 style={{ borderBottom: '3px dashed var(--accent-blue)', paddingBottom: '0.5em' }}>Ticket Status & Priority</h3>
                            
                            <div className="form-group">
                                <label htmlFor="status-select">Status</label>
                                <Select
                                    inputId="status-select"
                                    value={selectedOption}
                                    onChange={handleChange}
                                    options={statusOptions}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id.toString()}
                                    styles={{
                                        control: (base: any) => ({
                                            ...base,
                                            borderColor: 'var(--accent-blue)',
                                            backgroundColor: 'var(--wall-dark)',
                                            color: 'var(--primary-light)',
                                            borderWidth: '3px',
                                            borderRadius: '0px',
                                            cursor: 'pointer'
                                        }),
                                        option: (base: any, state: any) => ({
                                            ...base,
                                            backgroundColor: state.isFocused ? 'var(--accent-blue)' : 'var(--wall-dark)',
                                            color: state.isFocused ? 'var(--wall-dark)' : 'var(--primary-light)',
                                            borderBottomColor: 'var(--accent-pink)'
                                        }),
                                        singleValue: (base: any) => ({
                                            ...base,
                                            color: 'var(--primary-light)'
                                        })
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="priority-select">Priority</label>
                                <Select
                                    inputId="priority-select"
                                    value={priority}
                                    onChange={(priority) => {
                                        if (priority) {
                                            handleUpdateTicketPriority(priority);
                                            setPriority(priority);
                                        }
                                    }}
                                    options={priorityOptions}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id.toString()}
                                    placeholder="Select priority..."
                                    styles={{
                                        control: (base: any) => ({
                                            ...base,
                                            borderColor: 'var(--accent-pink)',
                                            backgroundColor: 'var(--wall-dark)',
                                            color: 'var(--primary-light)',
                                            borderWidth: '3px',
                                            borderRadius: '0px',
                                            cursor: 'pointer'
                                        }),
                                        option: (base: any, state: any) => ({
                                            ...base,
                                            backgroundColor: state.isFocused ? 'var(--accent-pink)' : 'var(--wall-dark)',
                                            color: state.isFocused ? 'var(--wall-dark)' : 'var(--primary-light)'
                                        }),
                                        singleValue: (base: any) => ({
                                            ...base,
                                            color: 'var(--primary-light)'
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {user && user.role === 'admin' && (
                        <div className="form-container" style={{ marginTop: '2em' }}>
                            <h3 style={{ borderBottom: '3px dashed var(--accent-purple)', paddingBottom: '0.5em' }}>Assign Agent</h3>
                            <p style={{ marginBottom: '1em' }}>
                                <strong>Current Agent:</strong> {ticket?.assigned_to 
                                ? agentOptions.find(a => a.id === ticket.assigned_to)?.name || `ID: ${ticket.assigned_to}` : 'Unassigned'}
                            </p>
                            <div className="form-group">
                                <label htmlFor="agent-select">Select Agent</label>
                                <Select
                                    inputId="agent-select"
                                    value={agent}
                                    onChange={(agent) => {
                                        if (agent) {
                                            handleAssignAgent(agent.id);
                                            setAgent(agent);
                                        }
                                    }}
                                    options={agentOptions}
                                    getOptionLabel={(option) => `${option.name}`}
                                    getOptionValue={(option) => option.id.toString()}
                                    placeholder="Select agent..."
                                    isClearable
                                    styles={{
                                        control: (base: any) => ({
                                            ...base,
                                            borderColor: 'var(--accent-purple)',
                                            backgroundColor: 'var(--wall-dark)',
                                            color: 'var(--primary-light)',
                                            borderWidth: '3px',
                                            borderRadius: '0px',
                                            cursor: 'pointer'
                                        }),
                                        option: (base: any, state: any) => ({
                                            ...base,
                                            backgroundColor: state.isFocused ? 'var(--accent-purple)' : 'var(--wall-dark)',
                                            color: state.isFocused ? 'var(--primary-light)' : 'var(--primary-light)'
                                        }),
                                        singleValue: (base: any) => ({
                                            ...base,
                                            color: 'var(--primary-light)'
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <CommentList ticketId={Number(id)} comments={comments} onAddComment={handleAddComment} />
                </div>
            )}
        </div>
    );
}

export default TicketDetailsPage