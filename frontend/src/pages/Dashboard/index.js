import React, { useEffect, useState, useMemo } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";

import "./styles.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem("user");
  const socket = useMemo(
    () =>
      socketio("http://192.168.0.20:3333", {
        query: { user_id }
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on("booking_request", data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const { data: response } = await api.get("/dashboard", {
        headers: { user_id }
      });

      setSpots(response);
    }
    loadSpots();
  }, []);

  const handleAccept = async id => {
    await api.post(`/bookings/${id}/approvals`);

    setRequests(requests.filter(request => request._id !== id));
  };

  const handleReject = async id => {
    await api.post(`/bookings/${id}/rejections`);

    setRequests(requests.filter(request => request._id !== id));
  };

  return (
    <>
      <ul className="notificacoes">
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> esta solicitando uma reserva
              em <strong>{request.spot.company}</strong> para a data:{" "}
              <strong>{request.date}</strong>
            </p>
            <button
              className="accept"
              onClick={() => handleAccept(request._id)}
            >
              ACEITAR
            </button>
            <button
              className="reject"
              onClick={() => handleReject(request._id)}
            >
              REJEITAR
            </button>
          </li>
        ))}
      </ul>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : "Free"}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Add new Spot</button>
      </Link>
    </>
  );
}
