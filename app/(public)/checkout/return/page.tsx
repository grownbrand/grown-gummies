"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Page() {
  const [status, setStatus] = useState(null);
  const [customer, setCustomer] = useState<any>();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(`/api/stripe/checkout-sessions?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomer(data.customer);
      });
  }, []);

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customer ? customer.email : "your email"}. If you have any questions,
          please email{" "}
          <a href="mailto:orders@example.com">info@growngummies.com</a>.
        </p>
      </section>
    );
  }

  return null;
}
