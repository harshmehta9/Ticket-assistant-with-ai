import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import type { ITicket } from "../types/ticket";

export default function TicketDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<ITicket | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const abortController = new AbortController();

    const fetchId = async() => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/ticket/getticket/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          signal: abortController.signal,
        });

        const data = await res.json();
        const ticket = data.ticket;
        setTicket(ticket);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
        console.log('Fetch aborted due to cleanup');
        return; 
      }
        console.log("Failed Fetching Ticket" , error);
      }
      
    }

    fetchId();

    return () => abortController.abort();
  },[id, token])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleBackToTickets = () => {
    navigate("/tickets");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <svg className="animate-spin mx-auto h-12 w-12 text-purple-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-xl text-white">Loading ticket details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="text-6xl text-slate-400 mb-4">🎫</div>
              <p className="text-xl text-white mb-2">Ticket not found</p>
              <p className="text-slate-400 mb-6">The ticket you're looking for doesn't exist</p>
              <button 
                onClick={handleBackToTickets}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Back to Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToTickets}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 font-medium border border-white/20"
            >
              ← Back to Tickets
            </button>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Ticket Details</h1>
              <p className="text-slate-300">View and manage your support request</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Logout
          </button>
        </div>

        {/* Ticket Details */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="space-y-6">
            {/* Title and Status */}
            <div className="flex justify-between items-start">
              <h2 className="text-3xl font-bold text-white">{ticket.title}</h2>
              {ticket.status && (
                <span className="px-4 py-2 bg-purple-600/30 text-purple-300 rounded-full text-sm font-medium">
                  {ticket.status}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <p className="text-slate-300 leading-relaxed">{ticket.description}</p>
            </div>

            {/* Metadata Section */}
            {ticket.status && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Priority */}
                {ticket.priority && (
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">Priority</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ticket.priority === 'High' ? 'bg-red-600/30 text-red-300' :
                      ticket.priority === 'Medium' ? 'bg-yellow-600/30 text-yellow-300' :
                      'bg-green-600/30 text-green-300'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                )}

                {/* Assigned To */}
                {ticket.assignedTo && (
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">Assigned To</h3>
                    <p className="text-slate-300">{ticket.assignedTo?.email}</p>
                  </div>
                )}
              </div>
            )}

            {/* Related Skills */}
            {ticket.relatedSkills?.length > 0 && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Related Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {ticket.relatedSkills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Helpful Notes */}
            {ticket.helpfulNotes && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Helpful Notes</h3>
                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                  <ReactMarkdown>
                    {ticket.helpfulNotes}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Created At */}
            {ticket.createdAt && (
              <div className="flex items-center text-sm text-slate-400 pt-4 border-t border-white/10">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Created on {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}