import React, { useEffect, useMemo, useState } from 'react';
import { customerRequest, friendlyErrorMessage, ticketRequest } from '../api/axios';
import { CircleDashed } from 'lucide-react';

// Specialized Components
import Sidebar from './dashboard/Sidebar';
import Header from './dashboard/Header';
import StatsGrid from './dashboard/StatsGrid';
import AnalyticsDashboard from './dashboard/AnalyticsDashboard';
import CustomerPortfolio from './dashboard/CustomerPortfolio';
import TicketOperations from './dashboard/TicketOperations';
import TaskManager from './dashboard/TaskManager';
import ActivityLog from './dashboard/ActivityLog';
import Profile from './dashboard/Profile';
import DashboardLayout from './dashboard/DashboardLayout';

const STATUS_OPTIONS = ['ALL', 'OPEN', 'IN_PROGRESS', 'WAITING', 'CLOSED'];
const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

function normalizeTicketStatus(rawStatus) {
  if (!rawStatus) return 'OPEN';
  const status = String(rawStatus).toUpperCase();
  if (status.includes('CLOSE')) return 'CLOSED';
  if (status.includes('PROGRESS')) return 'IN_PROGRESS';
  if (status.includes('WAIT')) return 'WAITING';
  return 'OPEN';
}

function priorityWeight(priority) {
  const rank = String(priority || '').toUpperCase();
  if (rank === 'CRITICAL') return 4;
  if (rank === 'HIGH') return 3;
  if (rank === 'MEDIUM') return 2;
  return 1;
}

export default function Dashboard({ setToken }) {
  const [customers, setCustomers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [lastSync, setLastSync] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activityFeed, setActivityFeed] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  // RBAC State
  const [user, setUser] = useState({ email: '', role: 'CUSTOMER' });
  const isAgent = useMemo(() => ['ADMIN', 'MANAGER', 'SUPPORT_AGENT'].includes(user.role), [user.role]);

  // Modals for CRUD
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', company: '', segment: '' });
  const [newTicket, setNewTicket] = useState({
    customerId: '',
    title: '',
    description: '',
    status: 'OPEN',
    priority: 'MEDIUM',
  });

  const fetchUserProfile = async (email) => {
      try {
          const res = await customerRequest({ method: 'get', url: `/customers/email/${email}` });
          setUserProfile(res.data);
          return res.data;
      } catch (err) { setUserProfile(null); }
  };

  const fetchActivity = async (userId) => {
    try {
        const notifRes = await ticketRequest({ method: 'get', url: `/notifications/user/${userId}` });
        setActivityFeed(notifRes.data);
    } catch (err) {
        console.error('Activity sync failed');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userEmail = payload.sub || payload.email;
        const userRole = payload.role || 'CUSTOMER';
        
        setUser({ email: userEmail, role: userRole });
        fetchUserProfile(userEmail);
        
        if (userRole === 'CUSTOMER') {
            setActiveTab('tickets');
            customerRequest({ method: 'get', url: `/customers/email/${userEmail}` })
                .then(res => {
                    setNewTicket(prev => ({ ...prev, customerId: res.data.id }));
                    if (res.data.id) fetchActivity(res.data.id);
                })
                .catch(err => console.error('Profile fetch failed', err));
        } else {
            fetchActivity(0); 
        }
      } catch (e) {
        console.error('JWT decode failed', e);
      }
    }
  }, []);

  // Real-time Polling for Activity (every 20 seconds)
  useEffect(() => {
      const interval = setInterval(() => {
          if (user.email) {
              fetchActivity(isAgent ? 0 : newTicket.customerId || 0);
          }
      }, 20000);
      return () => clearInterval(interval);
  }, [user, newTicket.customerId, isAgent]);

  const fetchDashboardData = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    setErrorMessage('');
    try {
      const [custRes, tickRes] = await Promise.all([
        isAgent ? customerRequest({ method: 'get', url: '/customers' }) : Promise.resolve({ data: [] }),
        ticketRequest({ method: 'get', url: '/tickets' }),
      ]);
      setCustomers(Array.isArray(custRes.data) ? custRes.data : []);
      setTickets(Array.isArray(tickRes.data) ? tickRes.data : []);
      setLastSync(new Date());
    } catch (error) {
      setErrorMessage(friendlyErrorMessage(error, 'Could not load data.'));
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const normalizedTickets = useMemo(
    () => tickets.map(t => ({ ...t, status: normalizeTicketStatus(t.status) })),
    [tickets]
  );

  const filteredTickets = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return normalizedTickets.filter((ticket) => {
      const matchesStatus = statusFilter === 'ALL' || ticket.status === statusFilter;
      const searchable = `${ticket.title || ''} ${ticket.id || ''} ${ticket.priority || ''}`.toLowerCase();
      const matchesSearch = query.length === 0 || searchable.includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [normalizedTickets, searchText, statusFilter]);

  const openTickets = normalizedTickets.filter(t => t.status !== 'CLOSED');
  const resolutionRate = normalizedTickets.length ? (normalizedTickets.filter(t => t.status === 'CLOSED').length / normalizedTickets.length) * 100 : 0;
  const weightedBacklog = openTickets.reduce((acc, t) => acc + priorityWeight(t.priority), 0);

  const ticketTrendData = useMemo(() => {
    return Array.from({ length: 7 }, (_, idx) => ({
      day: `D${idx + 1}`,
      created: 4 + (idx % 3),
      resolved: 3 + (idx % 2)
    }));
  }, []);

  const priorityData = useMemo(() => {
    const counts = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
    normalizedTickets.forEach(t => { counts[t.priority] = (counts[t.priority] || 0) + 1; });
    return [
      { name: 'Critical', value: counts.CRITICAL || 0, color: '#e11d48' },
      { name: 'High', value: counts.HIGH || 0, color: '#f97316' },
      { name: 'Medium', value: counts.MEDIUM || 0, color: '#6366f1' },
      { name: 'Low', value: counts.LOW || 0, color: '#06b6d4' },
    ];
  }, [normalizedTickets]);

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      await customerRequest({ method: 'post', url: '/customers', data: newCustomer });
      setNewCustomer({ name: '', email: '', phone: '', company: '', segment: '' });
      setIsAddingCustomer(false);
      setSuccessMessage('Client onboarded successfully.');
      fetchDashboardData();
    } catch (err) { setErrorMessage('Onboarding failed.'); }
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      await customerRequest({ method: 'put', url: `/customers/${editingCustomer.id}`, data: editingCustomer });
      setEditingCustomer(null);
      setSuccessMessage('Client vector synchronized.');
      fetchDashboardData();
    } catch (err) { setErrorMessage('Sync failed.'); }
  };

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm('Purge this client entity from the ecosystem?')) return;
    try {
      await customerRequest({ method: 'delete', url: `/customers/${id}` });
      setSuccessMessage('Entity purged.');
      fetchDashboardData();
    } catch (err) { setErrorMessage('Purge failed.'); }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      await ticketRequest({ method: 'post', url: '/tickets', data: newTicket });
      setNewTicket(prev => ({ ...prev, title: '', description: '', status: 'OPEN', priority: 'MEDIUM' }));
      setSuccessMessage('Signal dispatched to operational queue.');
      fetchDashboardData();
    } catch (err) { setErrorMessage('Signal dispatch failed.'); }
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    try {
      await ticketRequest({ method: 'put', url: `/tickets/${editingTicket.id}`, data: editingTicket });
      setEditingTicket(null);
      setSuccessMessage('Operational signal synchronized.');
      fetchDashboardData();
    } catch (err) { setErrorMessage('Sync failed.'); }
  };

  const handleDeleteTicket = async (id) => {
    if (!window.confirm('Delete this operational signal permanently?')) return;
    try {
      await ticketRequest({ method: 'delete', url: `/tickets/${id}` });
      setSuccessMessage('Signal terminated.');
      fetchDashboardData();
    } catch (err) { setErrorMessage('Termination failed.'); }
  };

  const handleUpdateProfile = async (id, data) => {
    try {
      await customerRequest({ method: 'put', url: `/customers/${id}`, data });
      setSuccessMessage('Identity Vector Synchronized.');
      fetchUserProfile(user.email);
    } catch (err) { setErrorMessage('Sync failed.'); }
  };

  const handleCreateProfile = async (data) => {
    try {
      await customerRequest({ method: 'post', url: '/customers', data });
      setSuccessMessage('Identity Initialized in Sector Database.');
      const newProfile = await fetchUserProfile(user.email);
      if (user.role === 'CUSTOMER') setNewTicket(prev => ({ ...prev, customerId: newProfile.id }));
    } catch (err) { setErrorMessage('Initialization failed.'); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="relative">
            <CircleDashed className="h-16 w-16 animate-spin text-indigo-500" strokeWidth={1} />
            <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-indigo-500/20"></div>
        </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <Sidebar 
        user={user} 
        isAgent={isAgent} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        handleLogout={handleLogout} 
      />

      <DashboardLayout 
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        successMessage={successMessage}
        setSuccessMessage={setSuccessMessage}
        isAddingCustomer={isAddingCustomer}
        setIsAddingCustomer={setIsAddingCustomer}
        editingCustomer={editingCustomer}
        setEditingCustomer={setEditingCustomer}
        editingTicket={editingTicket}
        setEditingTicket={setEditingTicket}
        handleCreateCustomer={handleCreateCustomer}
        handleUpdateCustomer={handleUpdateCustomer}
        handleUpdateTicket={handleUpdateTicket}
        newCustomer={newCustomer}
        setNewCustomer={setNewCustomer}
        PRIORITY_OPTIONS={PRIORITY_OPTIONS}
        STATUS_OPTIONS={STATUS_OPTIONS}
      >
        <div className="flex flex-col h-full bg-slate-100/30">
          <Header 
            activeTab={activeTab}
            isRefreshing={isRefreshing}
            fetchDashboardData={fetchDashboardData}
            setIsSidebarOpen={setIsSidebarOpen}
            searchText={searchText}
            setSearchText={setSearchText}
          />

          <main className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar">
            <div className="mx-auto max-w-7xl">
              {activeTab === 'dashboard' && isAgent && (
                <>
                  <StatsGrid 
                    customers={customers} 
                    openTickets={openTickets} 
                    resolutionRate={resolutionRate} 
                    weightedBacklog={weightedBacklog} 
                  />
                  <AnalyticsDashboard 
                    tickets={tickets} 
                    priorityData={priorityData} 
                    ticketTrendData={ticketTrendData} 
                  />
                </>
              )}

              {activeTab === 'analytics' && isAgent && (
                 <AnalyticsDashboard 
                    tickets={tickets} 
                    priorityData={priorityData} 
                    ticketTrendData={ticketTrendData} 
                 />
              )}

              {activeTab === 'customers' && isAgent && (
                <CustomerPortfolio 
                    customers={customers}
                    setIsAddingCustomer={setIsAddingCustomer}
                    setEditingCustomer={setEditingCustomer}
                    handleDeleteCustomer={handleDeleteCustomer}
                    searchText={searchText}
                    setSearchText={setSearchText}
                />
              )}

              {activeTab === 'tickets' && (
                <TicketOperations 
                    filteredTickets={filteredTickets}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    isAgent={isAgent}
                    setEditingTicket={setEditingTicket}
                    handleDeleteTicket={handleDeleteTicket}
                    handleCreateTicket={handleCreateTicket}
                    newTicket={newTicket}
                    setNewTicket={setNewTicket}
                    customers={customers}
                    user={user}
                />
              )}

              {activeTab === 'profile' && (
                <Profile 
                    user={user} 
                    profile={userProfile} 
                    handleUpdateProfile={handleUpdateProfile} 
                    handleCreateProfile={handleCreateProfile} 
                />
              )}

              {activeTab === 'tasks' && <TaskManager />}

              {activeTab === 'notifications' && <ActivityLog activityFeed={activityFeed} />}
            </div>
          </main>
        </div>
      </DashboardLayout>
    </div>
  );
}
